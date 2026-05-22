import { Button } from "@headlessui/react";
import { motion } from "motion/react";
import logo from "../../../assets/images/logo.png";

export default function JoinAsWorker({ handleClick }) {
  return (
    <>
      <section
        className="w-full py-16"
        style={{ background: "var(--radiant-gradient)" }}
      >
        <div className="w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 mx-auto bg-white/5 backdrop-blur-md rounded-2xl py-6 md:py-10 px-4 md:px-6 shadow-xl text-white relative overflow-hidden">
          {/* Decorative edge */}
          <div
            className="hidden md:block absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.02))",
            }}
          />
          <div className="flex flex-col md:flex-row-reverse items-center gap-3 md:gap-6">
            {/* Text column */}
            <div className="flex-1 text-center md:text-right" dir="rtl">
              <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white/12 border border-white/25 text-sm font-medium">
                <div className="flex -space-x-2 items-center">
                  <img
                    className="w-6 h-6 rounded-full border-2 border-white"
                    src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=50"
                    alt="u1"
                  />
                  <img
                    className="w-6 h-6 rounded-full border-2 border-white"
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=50"
                    alt="u2"
                  />
                  <img
                    className="w-6 h-6 rounded-full border-2 border-white"
                    src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=50&q=80"
                    alt="u3"
                  />
                </div>
                <span className="mr-2">
                  أنضم إلى أكثر من{" "}
                  <span className="text-white font-semibold">100,000</span>{" "}
                  مستخدم
                </span>
              </div>

              <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white">
                افتح باب رزق جديد مع
              </h2>

              <h2 className="mt-2 w-full text-right text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white" dir="ltr">
                Osta Finder
              </h2>

              <p className="mt-4 text-sm sm:text-base text-white max-w-prose mx-auto md:mx-0">
                منصتك المثالية لعرض مهاراتك الحرفية والتواصل مع عملاء يبحثون عن
                خدماتك في منطقتك. قم بإنشاء ملفك الآن وابدأ باستقبال الطلبات
                بسهولة وأمان.
              </p>

              <div className="mt-6 flex items-center justify-center md:justify-start gap-4">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleClick}
                    className="rounded-full px-10 py-4 text-lg font-extrabold text-white shadow-lg transform transition duration-200 ease-out hover:scale-105 w-full sm:w-auto"
                    style={{
                      backgroundColor: "var(--primary-color)",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                    }}
                  >
                    سجل الآن
                  </Button>
                </motion.div>
                <a
                  href="/about-us"
                  className="hidden sm:inline-block text-base sm:text-lg text-white font-semibold hover:text-white ml-3"
                >
                  تعرف أكثر
                </a>
              </div>
            </div>

            {/* Visual column */}
            <div className="flex-none flex items-center justify-center md:justify-start">
              <div className="relative z-10 flex items-center justify-center">
                <div className="w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] flex items-center justify-center">
                  <img
                    src={logo}
                    alt="logo"
                    className="w-72 h-72 sm:w-80 sm:h-80 md:w-[24rem] md:h-[24rem] object-contain rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
