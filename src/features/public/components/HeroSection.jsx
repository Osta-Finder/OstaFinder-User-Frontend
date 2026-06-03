import { Button } from "@headlessui/react";
import { Input } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";
import { motion } from "motion/react";
import pic1 from "../../../assets/images/pic1.png";
import MiniTestimonialDemo from "./MiniTestimonialDemo";

export default function HeroSection({ handleClick }) {
  return (
    <div>
      <div className="relative overflow-hidden">
        <img src={pic1} alt="Landing Page" className="w-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-start px-4 sm:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl w-full rounded-[2rem] bg-black/40 p-6 sm:p-10 shadow-2xl shadow-black/40 backdrop-blur-sm text-right text-white"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-gradient-to-r from-black/25 to-transparent px-4 py-2 text-sm text-white/90 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-amber-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2l3 7h7l-5.5 4 2 7L12 17l-6.5 3 2-7L2 9h7l3-7z" />
              </svg>
              <span className="font-medium">خدمات محلية موثوقة</span>
              <span className="text-xs text-white/70">
                (تقييمات حقيقية — ضمان جودة)
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05, duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight"
            >
              متشيلش هم المشكله
              <br />
              الاسطا جاهز عندنا!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.12, duration: 0.6 }}
              className="mt-4 text-sm sm:text-base text-[#F2E7E4] leading-relaxed max-w-2xl"
            >
              وصل بينك وبين حرفيين موثوقين في منطقتك — احجز موعد، تواصل، واستلم
              الخدمة بثقة.
            </motion.p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="w-full sm:flex-1">
                <Input
                  type="text"
                  name="search"
                  as={Fragment}
                  placeholder="اكتب ما تحتاجه مثل: صيانة حنفية"
                >
                  {({ focus, hover }) => (
                    <input
                      className={clsx(
                        "w-full rounded-full border border-white/70 bg-white/95 px-4 py-3 text-gray-900 placeholder:text-gray-500 transition duration-300 focus:outline-none",
                        focus && "ring-2 ring-[#F5D3C2]",
                        hover && "shadow-xl",
                      )}
                    />
                  )}
                </Input>
              </div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleClick}
                  className="rounded-full px-6 py-3 text-sm text-white btn-custom shadow-lg flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  ابحث عن صنايعي
                </Button>
              </motion.div>
            </div>

            <div className="mt-8">
              <MiniTestimonialDemo />
            </div>
          </motion.div>
        </div>
        {/* floating decorative shapes */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:block absolute -right-10 top-24 z-10"
        >
          <div className="h-20 w-20 rounded-full bg-amber-400/80 blur-lg opacity-70" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:block absolute left-10 bottom-20 z-10"
        >
          <div className="h-28 w-28 rounded-full bg-emerald-400/70 blur-2xl opacity-60" />
        </motion.div>
      </div>
    </div>
  );
}
