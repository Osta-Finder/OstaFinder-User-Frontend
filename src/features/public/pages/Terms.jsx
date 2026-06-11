import { useEffect } from "react";

export default function TermsConditions() {
  useEffect(() => {
    document.title = "الشروط والأحكام | Osta Finder";
  }, []);

  return (
    <div className="min-h-screen bg-[#fbfbfc] py-16 px-4" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">الشروط والأحكام</h1>
        <p className="text-gray-500 text-center mb-12">آخر تحديث: 2026</p>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">القبول بالشروط</h2>
            <p>باستخدامك لمنصة Osta Finder، فإنك توافق على هذه الشروط والأحكام. إذا كنت لا توافق، يرجى عدم استخدام المنصة.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">المسؤوليات</h2>
            <p>Osta Finder هي منصة وسيطة فقط. نحن غير مسؤولين عن جودة العمل المقدم من الحرفيين، ولكننا نعمل على ضمان أفضل تجربة ممكنة.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">الحسابات</h2>
            <p>أنت مسؤول عن الحفاظ على سرية معلومات حسابك. جميع الأنشطة التي تتم من خلال حسابك هي مسؤوليتك.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">إلغاء الخدمات</h2>
            <p>يحق لك إلغاء الخدمة وفقاً للسياسات المحددة. قد يتم تطبيق رسوم إلغاء في بعض الحالات.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">تعديل الشروط</h2>
            <p>نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إخطار المستخدمين بالتغييرات الهامة.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
