import { Button } from "@headlessui/react";
import { Input } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useState, useCallback } from "react";
import { motion } from "motion/react";
import pic1 from "../../../assets/images/pic1.png";
import MiniTestimonialDemo from "./MiniTestimonialDemo";
import { useNavigate } from "react-router-dom";

export default function HeroSection({ handleClick }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = useCallback(() => {
    try {
      if (typeof handleClick === "function") handleClick();
    } catch (e) {
      // ignore errors from external handler
    }

    const params = new URLSearchParams();
    if (query.trim()) params.set("keyword", query.trim());
    const search = params.toString() ? `?${params.toString()}` : "";
    navigate(`/categories${search}`);
  }, [handleClick, navigate, query]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative overflow-hidden w-full min-h-screen flex items-center justify-center" dir="rtl">
      {/* Background Image & Overlays */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={pic1} 
          alt="Landing Page" 
          className="w-full h-full object-cover" 
        />
        {/* Overall very light overlay */}
        <div className="absolute inset-0 bg-black/10" />
        {/* Stronger Gradient Overlay on the right side ONLY for text readability */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[60%] bg-gradient-to-l from-black/95 via-black/70 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-start justify-center text-right h-full w-full">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl w-full flex flex-col items-start"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 mb-8 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold tracking-wide">خدمات محلية موثوقة وتقييمات حقيقية</span>
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-extrabold tracking-tight leading-tight mb-6"
          >
            <span className="block text-2xl sm:text-3xl lg:text-4xl text-white/90 mb-2 font-bold">
              متشيلش هم المشكلة..
            </span>
            <span className="text-4xl sm:text-5xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 inline-block mt-1 pb-3">
              الأسطا جاهز عندنا!
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xs sm:text-sm lg:text-base text-gray-300 leading-relaxed max-w-3xl mb-10"
          >
            وصل بينك وبين حرفيين موثوقين في منطقتك. احجز موعد، تواصل، واستلم
            الخدمة بثقة وضمان جودة.
          </motion.p>

          {/* Search Bar - Integrated & Premium */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-full max-w-2xl bg-white p-1.5 sm:p-2 rounded-2xl sm:rounded-full shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 sm:gap-2 border border-white/40 focus-within:ring-4 focus-within:ring-amber-500/30 transition-all duration-300"
          >
              <div className="flex-1 w-full relative flex items-center px-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 ml-2 sm:ml-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <Input
                type="text"
                name="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none py-2.5 sm:py-3 text-gray-900 placeholder-gray-400 focus:outline-none text-sm sm:text-base lg:text-lg outline-none"
                placeholder="اكتب ما تحتاجه مثل: صيانة سباكة، كهرباء..."
              />
              </div>

            <Button
              onClick={handleSearch}
              className="w-full sm:w-auto rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 px-5 sm:px-8 py-2.5 sm:py-3.5 text-sm sm:text-base font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              ابحث عن صنايعي
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 rtl:rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Button>
          </motion.div>

          {/* Testimonial component */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 w-full max-w-2xl flex justify-end"
          >
            <MiniTestimonialDemo />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
