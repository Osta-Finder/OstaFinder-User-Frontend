import { ReactFragment } from "react";

function Step({ num, icon, title, desc }) {
  return (
    <div className="relative flex flex-col items-center text-center px-4">
      <div className="flex items-center justify-center w-16 h-16 rounded-full" style={{ background: 'var(--primary-light)' }}>
        <div className="text-2xl font-extrabold" style={{ color: 'var(--primary-color)' }}>{num}</div>
      </div>

      <div className="mt-4" style={{ color: 'var(--primary-color)' }}>
        <div className="w-12 h-12 mx-auto flex items-center justify-center">{icon}</div>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
    </div>
  );
}

export default function HowItWorks() {
  const steps = [
    {
      num: 1,
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 4a7 7 0 100 14 7 7 0 000-14z" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 21l-4.35-4.35" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "ابحث أو صف مشكلتك",
      desc: "اكتب مشكلتك بالعربي أو اختار من الأقسام",
    },
    {
      num: 2,
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7h18" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M7 21V11" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M17 21V11" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      title: "قارن واختار",
      desc: "شوف تقييمات الصنايعية، أعمالهم السابقة، والأسعار",
    },
    {
      num: 3,
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 6L9 17l-5-5" stroke="var(--primary-color)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "اطلب بثقة",
      desc: "اطلب الخدمة وتتبع الطلب لحد ما يكتمل",
    },
  ];

  return (
    <section className="w-full" style={{ background: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">كيف يعمل الأسطى فين؟</h1>
        <p className="mt-3 text-center text-base" style={{ color: 'var(--text-secondary)' }}>3 خطوات بسيطة وتوصل للصنايعي المناسب</p>

        <div className="relative mt-12">
          {/* Timeline line */}
          <div className="hidden md:block absolute inset-x-0 top-1/2 transform -translate-y-1/2" aria-hidden>
            <div className="mx-auto max-w-4xl h-1" style={{ background: 'var(--primary-color)', opacity: 0.12 }} />
            <div className="mx-auto max-w-4xl h-1" style={{ background: 'var(--primary-color)', position: 'absolute', top: 0, left: 0, right: 0 }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((s) => (
              <div key={s.num} className="relative flex flex-col items-center md:items-center">
                {/* circle positioned above the timeline */}
                <div className="z-20">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full" style={{ background: 'var(--primary-light)' }}>
                    <div className="text-2xl font-extrabold" style={{ color: 'var(--primary-color)' }}>{s.num}</div>
                  </div>
                </div>

                <div className="mt-4">{s.icon}</div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{s.title}</h3>
                <p className="mt-2 text-sm text-center" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
