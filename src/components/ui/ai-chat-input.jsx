"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, Paperclip, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const PLACEHOLDERS = [
  "اكتب مشكلتك هنا...",
  "المية بتنقط من الحنفية",
  "اللمبات مش بتشتغل في الأوضة",
  "الدايات ملوّنة؟",
];

export default function AIChatInput({ value, onChange, onSend, onAttach }) {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  // if value/onChange provided, treat as controlled
  const isControlled = typeof value !== 'undefined' && typeof onChange === 'function';
  const [internalValue, setInternalValue] = useState("");
  const inputValue = isControlled ? value : internalValue;
  const setInputValue = (v) => {
    if (isControlled) onChange(v);
    else setInternalValue(v);
  };
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  // cycle placeholder every 3s when input empty
  useEffect(() => {
    // cycle placeholder every 3s when input empty with a brief hide/show to animate
    if (inputValue) {
      // if user typing, ensure placeholder visible state resets
      setShowPlaceholder(false);
      return;
    }

    const runCycle = () => {
      setShowPlaceholder(false);
      timeoutRef.current = setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
        setShowPlaceholder(true);
      }, 180);
    };

    // initial show
    setShowPlaceholder(true);
    intervalRef.current = setInterval(runCycle, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [inputValue]);

  // simple animation variants for placeholder
  const placeholderAnim = {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.28 } },
    exit: { opacity: 0, y: -6, transition: { duration: 0.18 } },
  };

  // helper to detect Arabic characters (avoid splitting ligatures)
  const isArabic = (s = "") => /[\u0600-\u06FF]/.test(s);

  return (
    <div className="w-full flex justify-center" dir="rtl">
      <div className="w-full max-w-3xl" style={{ overflow: "hidden", borderRadius: 24, background: "#fff", height: 68 }}>
        <div className="flex items-center gap-2 p-3 rounded-full bg-white max-w-3xl w-full">
          <button
            className="p-3 rounded-full hover:bg-gray-100 transition text-gray-700"
            title="Attach file"
            type="button"
            tabIndex={-1}
            onClick={() => {
              if (typeof onAttach === 'function') onAttach();
            }}
          >
            <Paperclip size={18} />
          </button>

            <div className="relative flex-1">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 border-0 outline-0 rounded-md py-2 text-base bg-transparent w-full font-normal text-right text-black"
                style={{ position: "relative", zIndex: 1, WebkitTextFillColor: 'black' }}
                placeholder=""
                dir="rtl"
              />

              <div className="absolute right-0 top-0 w-full h-full pointer-events-none flex items-center px-3 py-2">
                <AnimatePresence>
                  {showPlaceholder && !inputValue && (
                    <motion.span
                      key={placeholderIndex}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 select-none pointer-events-none"
                      variants={placeholderAnim}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      {PLACEHOLDERS[placeholderIndex]}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

          <button className="p-3 rounded-full hover:bg-gray-100 transition" title="Voice input" type="button" tabIndex={-1}>
            <Mic size={18} />
          </button>
          <button
            className="flex items-center gap-1 bg-black hover:bg-zinc-700 text-white px-3 py-2 rounded-full font-medium justify-center"
            title="Send"
            type="button"
            tabIndex={-1}
            onClick={() => {
              if (typeof onSend === 'function') onSend(inputValue);
            }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export { AIChatInput };
