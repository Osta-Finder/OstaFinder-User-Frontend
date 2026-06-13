import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "سياسة الخصوصية | Osta Finder";
  }, []);

  return (
    <div className="min-h-screen bg-[#fbfbfc] py-16 px-4" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">سياسة الخصوصية</h1>
        <p className="text-gray-500 text-center mb-12">آخر تحديث: 2026</p>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">المعلومات التي نجمعها</h2>
            <p>نقوم بجمع المعلومات التي تقدمها عند التسجيل مثل الاسم، البريد الإلكتروني، رقم الهاتف، والعنوان لتسهيل عملية التواصل بينك وبين الحرفيين.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">كيف نستخدم معلوماتك</h2>
            <p>نستخدم معلوماتك لتقديم الخدمات، تحسين تجربتك، والتواصل معك بخصوص طلباتك وحجوزاتك.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">حماية البيانات</h2>
            <p>نحن نأخذ أمان بياناتك على محمل الجد. جميع البيانات مشفرة ومحمية باستخدام أحدث معايير الأمان.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">مشاركة المعلومات</h2>
            <p>نحن لا نشارك معلوماتك الشخصية مع أطراف ثالثة دون موافقتك، إلا عندما يقتضي القانون ذلك.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">اتصل بنا</h2>
            <p>إذا كان لديك أي استفسارات حول سياسة الخصوصية، لا تتردد في التواصل معنا.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
