"use client";

import React, { useRef, useEffect, useState, useCallback, memo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 as LoaderIcon, X as XIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

const clsx = (...args) => args.filter(Boolean).join(" ");

const cn = (...inputs) => twMerge(clsx(inputs));

const VARIANT_CLASSES = {
  default: "bg-black text-white hover:bg-gray-800",
  destructive: "border border-black text-black hover:bg-gray-100",
  outline: "border border-gray-400 bg-white hover:bg-gray-100 hover:text-black",
  secondary: "bg-gray-200 text-black hover:bg-gray-300",
  ghost: "text-black hover:bg-gray-100 hover:text-black",
  link: "text-black underline-offset-4 hover:underline",
};

const SIZE_CLASSES = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
};

const buttonVariants = ({ variant = "default", size = "default", className = "" } = {}) => cn(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  VARIANT_CLASSES[variant] || VARIANT_CLASSES.default,
  SIZE_CLASSES[size] || SIZE_CLASSES.default,
  className,
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? "button" : "button";
  return <Comp className={buttonVariants({ variant, size, className })} ref={ref} {...props} />;
});
Button.displayName = "Button";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-base ring-offset-white placeholder:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-black',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

// icons
const StopIcon = ({ size = 16 }) => (
  <svg height={size} viewBox="0 0 16 16" width={size} style={{ color: 'currentcolor' }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M3 3H13V13H3V3Z" fill="currentColor" />
  </svg>
);

// Paperclip icon removed in favor of lucide-react Paperclip used in ai-chat-input

// ArrowUpIcon removed — using lucide-react icons or button glyphs instead

// SuggestedActions etc. (converted to JS)
function PureSuggestedActions({ onSelectAction }) {
  const suggestedActions = [
    { title: 'المية بتنقط', label: 'من الحنفية أو المواسير', action: 'المية بتنقط من الحنفية' },
    { title: 'اللمبة مش شغالة', label: 'مشكلة في الكهرباء', action: 'اللمبة مش بتشتغل في الغرفة' },
    { title: 'التكييف مش بارد', label: 'صوت عالي أو ضعف تبريد', action: 'التكييف مش بارد وصوته عالي' },
    { title: 'الصرف مسدود', label: 'مشاكل المرحاض أو البانيو', action: 'المياة ما بتنزلش/الصرف مسدود' },
  ];

  return (
    <div data-testid="suggested-actions" className="grid pb-2 sm:grid-cols-2 gap-2 w-full">
      <AnimatePresence>
        {suggestedActions.map((suggestedAction, index) => (
          <motion.div key={`suggested-action-${index}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ delay: 0.05 * index }} className={index > 1 ? 'hidden sm:block' : 'block'}>
            <Button variant="ghost" onClick={() => onSelectAction(suggestedAction.action)} className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start border-gray-300 bg-white hover:bg-gray-100 text-black hover:text-gray-900">
              <span className="font-medium">{suggestedAction.title}</span>
              <span className="text-gray-500">{suggestedAction.label}</span>
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

const SuggestedActions = memo(PureSuggestedActions, (prevProps, nextProps) => true);

const PreviewAttachment = ({ attachment, isUploading = false }) => {
  const { name, url, contentType } = attachment;
  return (
    <div data-testid="input-attachment-preview" className="flex flex-col gap-1">
      <div className="w-20 h-16 aspect-video bg-gray-200 rounded-md relative flex flex-col items-center justify-center overflow-hidden border border-gray-300">
          {contentType?.startsWith('image/') && url ? (
          <img key={url} src={url} alt={name ?? 'An image attachment'} className="rounded-md size-full object-cover grayscale" />
        ) : (
          <div className="flex items-center justify-center text-xs text-gray-600 text-center p-1">ملف: {name?.split('.').pop()?.toUpperCase() || 'Unknown'}</div>
        )}
        {isUploading && (<div data-testid="input-attachment-loader" className="animate-spin absolute text-gray-500"><LoaderIcon className="size-5" /></div>)}
      </div>
      <div className="text-xs text-gray-600 max-w-20 truncate">{name}</div>
    </div>
  );
};

// import the simple chat input
import AIChatInput from "./ai-chat-input";

// Attachments button removed; attachment handled by AIChatInput via onAttach prop

function PureStopButton({ onStop }) {
  return (
    <Button data-testid="stop-button" className="rounded-full p-1.5 h-fit border border-black text-white" onClick={(event) => { event.preventDefault(); onStop(); }} aria-label="أوقف التوليد">
      <StopIcon size={14} />
    </Button>
  );
}

const StopButton = memo(PureStopButton, (prev, next) => prev.onStop === next.onStop);

// Send button removed (handled by AIChatInput)

function PureMultimodalInput({ chatId, messages, attachments, setAttachments, onSendMessage, onStopGenerating, isGenerating, canSend, className, selectedVisibilityType }) {
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const [input, setInput] = useState('');
  const [uploadQueue, setUploadQueue] = useState([]);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight + 2}px`;
    }
  };

  const resetHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.rows = 1;
      adjustHeight();
    }
  }, []);

  useEffect(() => { if (textareaRef.current) adjustHeight(); }, [input]);

  const handleInput = (event) => setInput(event.target.value);

  const uploadFile = async (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const mockUrl = URL.createObjectURL(file);
          const mockAttachment = { url: mockUrl, name: file.name, contentType: file.type || 'application/octet-stream', size: file.size };
          resolve(mockAttachment);
        } catch (error) {
          resolve(undefined);
        } finally {
          setUploadQueue(currentQueue => currentQueue.filter(name => name !== file.name));
        }
      }, 700);
    });
  };

  const handleFileChange = useCallback(async (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;
    setUploadQueue(currentQueue => [...currentQueue, ...files.map((file) => file.name)]);
    if (fileInputRef.current) fileInputRef.current.value = '';
    const MAX_FILE_SIZE = 25 * 1024 * 1024;
    const validFiles = files.filter(file => file.size <= MAX_FILE_SIZE);
    const invalidFiles = files.filter(file => file.size > MAX_FILE_SIZE);
    if (invalidFiles.length > 0) setUploadQueue(currentQueue => currentQueue.filter(name => !invalidFiles.some(f => f.name === name)));
    const uploadPromises = validFiles.map((file) => uploadFile(file));
    const uploadedAttachments = await Promise.all(uploadPromises);
    const successfullyUploadedAttachments = uploadedAttachments.filter(a => a !== undefined);
    setAttachments((current) => [...current, ...successfullyUploadedAttachments]);
  }, [setAttachments]);

  const handleRemoveAttachment = useCallback((attachmentToRemove) => {
    if (attachmentToRemove.url.startsWith('blob:')) URL.revokeObjectURL(attachmentToRemove.url);
    setAttachments((current) => current.filter(attachment => attachment.url !== attachmentToRemove.url || attachment.name !== attachmentToRemove.name));
    textareaRef.current?.focus();
  }, [setAttachments]);

  const submitForm = useCallback(() => {
    if (input.trim().length === 0 && attachments.length === 0) return;
    onSendMessage({ input, attachments });
    setInput('');
    setAttachments([]);
    attachments.forEach(att => { if (att.url.startsWith('blob:')) URL.revokeObjectURL(att.url); });
    resetHeight();
    textareaRef.current?.focus();
  }, [input, attachments, onSendMessage, setAttachments, resetHeight]);

  const showSuggestedActions = messages.length === 0 && attachments.length === 0 && uploadQueue.length === 0;
  const isAttachmentDisabled = isGenerating || uploadQueue.length > 0;

  return (
    <div className={cn("relative w-full flex flex-col gap-4", className)}>
      <AnimatePresence>
        {showSuggestedActions && (
          <motion.div key="suggested-actions-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.2 }}>
            <SuggestedActions onSelectAction={(action) => { setInput(action); requestAnimationFrame(() => { adjustHeight(); textareaRef.current?.focus(); }); }} chatId={chatId} selectedVisibilityType={selectedVisibilityType} />
          </motion.div>
        )}
      </AnimatePresence>

      <input type="file" className="fixed -top-4 -left-4 size-0.5 opacity-0 pointer-events-none" ref={fileInputRef} multiple onChange={handleFileChange} tabIndex={-1} disabled={isAttachmentDisabled} accept="image/*,video/*,audio/*,.pdf" />

      {(attachments.length > 0 || uploadQueue.length > 0) && (
        <div data-testid="attachments-preview" className="flex pt-[10px] flex-row gap-3 overflow-x-auto items-end pb-2 pl-1">
          {attachments.map((attachment) => (
            <div key={attachment.url || attachment.name} className="relative group">
              <PreviewAttachment attachment={attachment} isUploading={false} />
              <Button variant="destructive" size="icon" className="absolute top-[-8px] right-[-8px] h-5 w-5 rounded-full p-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleRemoveAttachment(attachment)} aria-label={`Remove ${attachment.name}`}>
                <XIcon className="size-3" />
              </Button>
            </div>
          ))}
          {uploadQueue.map((filename, index) => (
            <PreviewAttachment key={`upload-${filename}-${index}`} attachment={{ url: '', name: filename, contentType: '', size: 0 }} isUploading={true} />
          ))}
        </div>
      )}

      {/* Replaced the textarea with the simplified AI chat input component */}
      <AIChatInput
        value={input}
        onChange={(v) => setInput(v)}
        onSend={() => {
          const canSubmit = canSend && !isGenerating && uploadQueue.length === 0 && (input.trim().length > 0 || attachments.length > 0);
          if (canSubmit) submitForm();
        }}
        onAttach={() => fileInputRef.current?.click()}
      />

      <div className="absolute bottom-0 right-0 p-2 w-fit flex flex-row justify-end z-10">
        {isGenerating ? <StopButton onStop={onStopGenerating} /> : null}
      </div>
    </div>
  );
}

export { PureMultimodalInput };
