export default function AboutStats() {
  const stats = [
    { value: "15k+", label: "عميل سعيد" },
    { value: "500+", label: "فني معتمد" },
    { value: "24/7", label: "دعم فني" },
  ];

  return (
    <div className="relative z-20 mx-auto w-11/12 px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-20">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 py-8 px-6 md:px-12">
        <div className="grid grid-cols-3 divide-x divide-x-reverse divide-gray-200 text-center">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center px-4"
            >
              <span className="text-3xl md:text-5xl font-extrabold text-[#eb6a2d] tracking-tight mb-2">
                {stat.value}
              </span>
              <span className="text-sm md:text-base text-gray-500 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
