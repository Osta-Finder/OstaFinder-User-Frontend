export default function AboutValues() {
  const values = [
    {
      icon: "shield",
      title: "الثقة",
      description: "نقوم بفحص وتدقيق خلفية كل فني قبل انضمامه لشبكتنا لضمان أمنك وسلامتك."
    },
    {
      icon: "workspace_premium",
      title: "الجودة",
      description: "نلتزم بمعايير عالية في الأداء ونقدم ضماناً حقيقياً على كافة الخدمات المقدمة عبر المنصة."
    },
    {
      icon: "psychology",
      title: "الابتكار",
      description: "نستخدم الذكاء الاصطناعي لتشخيص الأعطال بدقة وتسهيل عملية حجز المواعيد والخدمات."
    }
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-[#fbfbfc]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            قيمنا الجوهرية
          </h2>
          <p className="text-lg text-gray-500 font-medium">
            الركائز التي نبني عليها كل تفاعل
          </p>
        </div>

        {/* Values Cards Grid (RTL) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((item, idx) => (
            <div 
              key={idx}
              className="flex flex-col items-center text-center p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 ease-in-out"
            >
              {/* Icon Container */}
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#fff1e6] mb-6">
                <span className="material-symbols-outlined text-3xl text-[#eb6a2d]">
                  {item.icon}
                </span>
              </div>

              {/* Card Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>

              {/* Card Description */}
              <p className="text-sm md:text-base text-gray-500 leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
