import { Search, Layers, Zap } from "lucide-react";

function StepCard({ icon, title, description, benefits }) {
  return (
    <div
      className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 text-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:border-[#eb6a2d]/50 hover:bg-[#fff1e6]"
    >
      <div
        className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
        style={{ background: "var(--primary-light)" }}
      >
        <div style={{ color: "var(--primary-color)" }}>{icon}</div>
      </div>

      <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
      <p
        className="mb-6 text-sm"
        style={{ color: "var(--text-secondary)" }}
      >
        {description}
      </p>

      <ul className="space-y-3 text-right">
        {benefits.map((benefit, index) => (
          <li
            key={index}
            className="flex items-center gap-3 text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            <div
              className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
              style={{ background: "color-mix(in srgb, var(--primary-color) 20%, transparent)" }}
            >
              <div
                className="h-2 w-2 rounded-full"
                style={{ background: "var(--primary-color)" }}
              />
            </div>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HowItWorks() {
  const stepsData = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "ابحث أو صف مشكلتك",
      description: "اكتب مشكلتك بالعربي أو اختار من الأقسام",
      benefits: [
        "بحث ذكي يفهم حتى الاستفسارات غير الدقيقة",
        "اكتشاف تلقائي لموقعك",
        "حفظ البحث للرجوع إليه سريعًا",
      ],
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "قارن واختار",
      description: "شوف تقييمات الصنايعية، أعمالهم السابقة، والأسعار",
      benefits: [
        "ترتيب حسب السعر والمسافة والتقييم",
        "فلترة حسب التخصص والتوفر",
        "معلومات مفصلة عن كل صنايعي",
      ],
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "اطلب بثقة",
      description: "اطلب الخدمة وتتبع الطلب لحد ما يكتمل",
      benefits: [
        "تواصل مباشر بدون وسطاء",
        "إمكانية حجز الخدمة",
        "تتبع الطلب لحين الاكتمال",
      ],
    },
  ];

  return (
    <section className="w-full" style={{ background: "#F8FAFC" }}>
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            إزاي Osta Finder هيحللك مشكلتك؟
          </h2>
          <p
            className="mt-4 text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            3 خطوات بسيطة وتوصل للصنايعي المناسب
          </p>
        </div>

        <div className="relative mx-auto mb-8 w-full max-w-4xl">
          <div
            aria-hidden
            className="absolute left-[16.6667%] top-1/2 h-0.5 w-[66.6667%] -translate-y-1/2"
            style={{ background: "var(--primary-color)", opacity: 0.2 }}
          />
          <div className="relative grid grid-cols-3">
            {stepsData.map((_, index) => (
              <div
                key={index}
                className="flex h-8 w-8 items-center justify-center justify-self-center rounded-full text-sm font-semibold text-gray-900 ring-4 ring-[#F8FAFC]"
                style={{ background: "var(--primary-light)" }}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
          {stepsData.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              benefits={step.benefits}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
