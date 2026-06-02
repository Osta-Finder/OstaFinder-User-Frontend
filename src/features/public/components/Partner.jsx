import logo from "../../../assets/images/logo.png";

export default function Partner() {
  return (
    <div className="w-full bg-white" aria-hidden>
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: trust text and badges (RTL) */}
        <div className="flex items-center gap-6 text-sm md:text-base text-gray-800" dir="rtl">
          <div className="font-semibold">موثوقين من آلاف العملاء والشركات</div>
          <div className="flex items-center gap-3 text-gray-600">
            <span className="flex items-center gap-1">⭐ <span className="font-medium">4.8</span> متوسط التقييم</span>
            <span className="hidden md:inline">|</span>
            <span className="flex items-center gap-1">✅ <span className="font-medium">100%</span> صنايعية موثقة</span>
          </div>
        </div>

        {/* Right: partner logos */}
        <div className="flex items-center gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <img
              key={i}
              src={logo}
              alt={`partner-${i}`}
              className="w-20 h-10 object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-200"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
