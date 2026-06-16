import logo from "../../../assets/images/logo.png";

export default function Partner() {
  return (
    <div className="w-full bg-white" aria-hidden>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-4 md:h-20">
        <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm md:text-base text-gray-800" dir="rtl">
          <div className="font-semibold whitespace-nowrap">موثوقين من آلاف العملاء</div>
          <div className="flex items-center gap-2 sm:gap-3 text-gray-600 flex-wrap">
            <span className="flex items-center gap-1 whitespace-nowrap">⭐ <span className="font-medium">4.8</span> تقييم</span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="flex items-center gap-1 whitespace-nowrap">✅ <span className="font-medium">100%</span> صنايعية موثقة</span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <img
              key={i}
              src={logo}
              alt={`partner-${i}`}
              className="w-14 sm:w-20 h-7 sm:h-10 object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-200"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
