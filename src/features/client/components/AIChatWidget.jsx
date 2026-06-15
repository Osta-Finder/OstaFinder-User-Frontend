import { useState, useCallback, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageCircle, X, Send, Paperclip, Sparkles, User, Bot, Loader2,
} from "lucide-react";
import { openChat, closeChat, addMessage, setLoading, clearPendingMessage, clearMessages } from "../../../store/slices/chatSlice";
import { useSendAiMessageMutation, useLazyGetChatSessionQuery } from "../../../services/aiApi";

const suggestedActions = [
  { title: "المية بتنقط", label: "من الحنفية أو المواسير", action: "المية بتنقط من الحنفية" },
  { title: "اللمبة مش شغالة", label: "مشكلة في الكهرباء", action: "اللمبة مش بتشتغل في الغرفة" },
  { title: "التكييف مش بارد", label: "صوت عالي أو ضعف تبريد", action: "التكييف مش بارد وصوته عالي" },
  { title: "الصرف مسدود", label: "مشاكل المرحاض أو البانيو", action: "المياة ما بتنزلش/الصرف مسدود" },
];

export default function AIChatWidget() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isOpen, messages, isLoading, pendingMessage } = useSelector((state) => state.chat);
  const [sendAiMessage] = useSendAiMessageMutation();
  const [input, setInput] = useState("");
  const [imageBase64, setImageBase64] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const chatInputRef = useRef(null);

  const [fetchChatSession] = useLazyGetChatSessionQuery();
  const userIdRef = useRef(user?._id);

  const isClient = user?.role === "client";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => chatInputRef.current?.focus(), 300);
      const isNewUser = user?._id && user._id !== userIdRef.current;
      if (isNewUser) {
        userIdRef.current = user._id;
        dispatch(clearMessages());
      }
      if (userIdRef.current && messages.length === 0) {
        fetchChatSession().then((res) => {
          if (res.data?.success && res.data?.data?.length > 0) {
            for (const msg of res.data.data) {
              dispatch(addMessage(msg));
            }
          }
        });
      }
    }
  }, [isOpen]);

  const handleSend = useCallback(async (directText, directImage) => {
    const text = (directText || input).trim();
    const img = directImage || imageBase64;
    if (!text && !img) return;

    const userMessage = { role: "user", content: text };
    dispatch(addMessage({ role: "user", content: text }));
    dispatch(setLoading(true));
    setInput("");
    const imgToSend = img;
    setImageBase64(null);
    setImagePreview(null);

    try {
      const chatMessages = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const body = { messages: chatMessages };
      if (imgToSend) body.image = imgToSend;

      const result = await sendAiMessage(body).unwrap();

      if (result?.success && result?.data) {
        dispatch(addMessage({ role: "assistant", content: result.data }));
      }
    } catch {
      dispatch(addMessage({
        role: "assistant",
        content: { type: "question", content: "عذراً، حدث خطأ. حاول مرة أخرى." },
      }));
    } finally {
      dispatch(setLoading(false));
    }
  }, [input, imageBase64, messages, dispatch, sendAiMessage]);

  useEffect(() => {
    if (pendingMessage) {
      const { text, image } = pendingMessage;
      dispatch(clearPendingMessage());
      handleSend(text, image);
    }
  }, [pendingMessage]);

  const handleSuggestedAction = useCallback((action) => {
    handleSend(action);
  }, [handleSend]);

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      const base64 = dataUrl.split(",")[1];
      setImageBase64(base64);
      setImagePreview(dataUrl);
    };
    reader.readAsDataURL(file);
  }, []);

  const removeFile = useCallback(() => {
    setImageBase64(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const renderAiContent = (data) => {
    if (data.type === "question") {
      return <p>{data.content}</p>;
    }
    if (data.type === "diagnosis") {
      return (
        <div>
          <p className="font-bold mb-2">🔧 تشخيص: {data.content}</p>
          {data.workers?.length > 0 && (
            <div className="mt-3">
              <p className="font-semibold mb-2">👷 بنرشحلك {data.workers.length} فنيين:</p>
              <div className="space-y-2">
                {data.workers.map((w) => (
                  <div key={w._id} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                    <img
                      src={w.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                      alt={w.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="text-sm">
                      <p className="font-medium">{w.name}</p>
                      <p className="text-gray-500 text-xs">{w.city} • ⭐ {w.rating}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }
    return <p>{data.content || data}</p>;
  };

  if (!isClient) return null;

  return (
    <>
      <button
        onClick={() => dispatch(isOpen ? closeChat() : openChat())}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        aria-label="مساعد Osta الذكي"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] h-[520px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
            dir="rtl"
          >
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-3 flex items-center gap-2">
              <Sparkles size={18} />
              <span className="font-bold">مساعد Osta الذكي</span>
              <button onClick={() => dispatch(closeChat())} className="mr-auto p-1 hover:bg-white/20 rounded-full transition">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <Sparkles size={40} className="mx-auto mb-2 text-amber-500" />
                  <p className="font-medium">مش عارف المشكلة؟</p>
                  <p className="text-sm">اكتب مشكلتك أو اختر من المقترحات</p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-gray-100 text-gray-900 rounded-br-sm"
                        : "bg-amber-50 text-gray-900 rounded-bl-sm border border-amber-100"
                    }`}
                  >
                    <div className="flex items-center gap-1 mb-1">
                      {msg.role === "assistant" ? <Bot size={14} className="text-amber-600" /> : <User size={14} className="text-gray-600" />}
                      <span className="text-xs font-medium text-gray-500">{msg.role === "user" ? "أنت" : "Osta"}</span>
                    </div>
                    {msg.role === "assistant" && typeof msg.content === "object"
                      ? renderAiContent(msg.content)
                      : <p>{msg.content}</p>}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-end">
                  <div className="bg-amber-50 text-gray-500 px-4 py-3 rounded-2xl rounded-bl-sm border border-amber-100">
                    <Loader2 size={18} className="animate-spin" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {messages.length === 0 && !isLoading && (
              <div className="px-4 pb-2 grid grid-cols-2 gap-2">
                {suggestedActions.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestedAction(item.action)}
                    className="text-right border rounded-xl px-3 py-2 text-xs border-gray-200 hover:bg-gray-50 transition"
                  >
                    <span className="font-medium block">{item.title}</span>
                    <span className="text-gray-500 text-[10px]">{item.label}</span>
                  </button>
                ))}
              </div>
            )}

            {imagePreview && (
              <div className="px-4 pb-2">
                <div className="relative inline-block">
                  <img src={imagePreview} alt="Preview" className="h-16 rounded-lg border" />
                  <button onClick={removeFile} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    <X size={12} />
                  </button>
                </div>
              </div>
            )}

            <div className="border-t px-4 py-3 flex items-center gap-2">
              <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" className="hidden" />
              <button onClick={() => fileInputRef.current?.click()} className="p-2 hover:bg-gray-100 rounded-full transition text-gray-500">
                <Paperclip size={18} />
              </button>
              <input
                ref={chatInputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="اكتب مشكلتك..."
                className="flex-1 border-0 outline-none text-sm bg-gray-50 rounded-full px-4 py-2"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || (!input.trim() && !imageBase64)}
                className="p-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full hover:opacity-90 transition disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
