import { useEffect } from "react";

const faqs = [
  {
    q: "ما هو Osta Finder؟",
    a: "Osta Finder هو منصة تربط بينك وبين أمهر الصنايعية والحرفيين في مصر بسهولة وأمان.",
  },
  {
    q: "كيف يمكنني حجز صنايعي؟",
    a: "يمكنك تصفح الفئات المتاحة، اختيار الحرفي المناسب، ثم تقديم طلب خدمة مباشرة.",
  },
  {
    q: "هل المنصة مجانية؟",
    a: "التصفح والبحث مجاني بالكامل. يتم تطبيق رسوم فقط عند تأكيد الحجز.",
  },
  {
    q: "كيف يتم تقييم الصنايعية؟",
    a: "بعد اكتمال الخدمة، يمكنك تقييم الحرفي وإضافة تعليق لتساعد الآخرين في الاختيار.",
  },
  {
    q: "ماذا إذا لم يعجبني العمل؟",
    a: "نوفر نظام دعم ومتابعة لضمان حقوقك. يمكنك التواصل معنا عبر صفحة اتصل بنا.",
  },
];

export default function Faq() {
  useEffect(() => {
    document.title = "الأسئلة الشائعة | Osta Finder";
  }, []);

  return (
    <div className="min-h-screen bg-[#fbfbfc] py-16 px-4" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">الأسئلة الشائعة</h1>
        <p className="text-gray-500 text-center mb-12">إجابات لأكثر الأسئلة شيوعاً</p>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="bg-white rounded-xl border border-gray-100 shadow-sm group"
            >
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 list-none flex justify-between items-center">
                {faq.q}
                <span className="text-orange-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-4 text-gray-600 border-t border-gray-50 pt-3">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
