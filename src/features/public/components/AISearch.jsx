import { useState, useCallback } from "react";
import { PureMultimodalInput } from "../../../components/ui/multimodal-ai-chat-input";

export default function AISearch() {
  // Local demo state for the multimodal input; in production these would come from a store or API
  const [attachments, setAttachments] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages] = useState([]);

  const handleSendMessage = useCallback(({ input, attachments: atts }) => {
    // For the demo: log and show generating state briefly
    console.log("[AISearch] send", { input, attachments: atts });
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 1400);
  }, []);

  const handleStopGenerating = useCallback(() => {
    setIsGenerating(false);
  }, []);

  return (
    <section
      className="w-full"
      style={{ background: "var(--radiant-gradient)" }}
      dir="rtl"
      aria-labelledby="ai-search-title"
    >
      
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-white">
        <div className="flex flex-col md:flex-row-reverse items-start gap-8">
          {/* Left column: AI chat input box (multimodal) */}

          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md p-4 bg-white/5 rounded-xl shadow-lg">
              <PureMultimodalInput
                chatId="landing-demo"
                messages={messages}
                attachments={attachments}
                setAttachments={setAttachments}
                onSendMessage={handleSendMessage}
                onStopGenerating={handleStopGenerating}
                isGenerating={isGenerating}
                canSend={true}
                selectedVisibilityType={"private"}
              />
            </div>
          </div>
          {/* Right column: title and chat preview */}
          <div className="flex-1 text-right" dir="rtl">
            <h2
              id="ai-search-title"
              className="text-2xl md:text-3xl font-extrabold"
            >
              مش عارف المشكلة؟ اسأل "Osta Finder"
            </h2>
            <p className="mt-2 text-white/90">
              اكتب مشكلتك بالعامية (مثال: المية بتنقط من الحنفية) والـ AI هيشخّص
              العطل، يقدّر التكلفة، ويوصلك بأفضل الصنايعية في منطقتك.
            </p>

            <div className="mt-6 max-w-md">
              <div className="space-y-3" dir="rtl">
                <div className="flex justify-end">
                  <div className="bg-white/10 text-white px-4 py-2 rounded-2xl max-w-[80%] text-right">
                    "المية بتنقط من الحنفية السخنة في الحمام"
                  </div>
                </div>

                <div className="flex justify-start">
                  <div
                    className="bg-white text-gray-900 px-4 py-3 rounded-2xl max-w-[80%] shadow-lg text-right"
                    dir="rtl"
                  >
                    🔧 تشخيص: تسريب في جلدة الحنفية الداخلية
                    <br />
                    💰 التكلفة متوقعة: 50 - 100 جنيه
                    <br />
                    👷 بنرشحلك 3 سباكين متاحين في منطقتك
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
