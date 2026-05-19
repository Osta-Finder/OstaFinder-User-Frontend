import { useState } from "react";

export default function AISearch() {
  const [query, setQuery] = useState("");

  return (
    <section className="w-full" style={{ background: 'var(--radiant-gradient)' }}>
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: interactive search box */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-2xl relative">
              <div className="relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-16 rounded-xl bg-white/10 placeholder-white/70 pl-6 pr-32 text-white text-lg focus:outline-none shadow-2xl"
                  placeholder="اكتب مشكلتك هنا... مثال: النور مقطوع في القعدة"
                />

                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-3">
                  <button className="bg-[var(--secondary-color)] text-white px-4 py-2 rounded-lg text-sm font-semibold">حللي المشكلة</button>
                  <div className="text-2xl">🤖</div>
                </div>
              </div>

              <p className="mt-4 text-sm text-white/90">اكتب مشكلتك بالعامية المصرية وهنحددلك العطل، نقدرلك التكلفة، ونوصلك بأفضل الصنايعية.</p>
            </div>
          </div>

          {/* Right: title + chat preview */}
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold">مش عارف المشكلة في إيه؟ الـ AI هيساعدك!</h2>
            <p className="mt-2 text-white/90">اكتب مشكلتك بالعامية المصرية وهنحددلك العطل، نقدرلك التكلفة، ونوصلك بأفضل الصنايعية.</p>

            <div className="mt-6 max-w-md">
              <div className="space-y-3">
                <div className="flex justify-end">
                  <div className="bg-white/10 text-white px-4 py-2 rounded-2xl max-w-[80%]">المستخدم: "المية بتنقط من الحنفية السخنة في الحمام"</div>
                </div>

                <div className="flex">
                  <div className="bg-white text-gray-900 px-4 py-3 rounded-2xl max-w-[80%] shadow-lg">
                    🔧 تشخيص: تسريب في جلدة الحنفية الداخلية
                    <br />💰 التكلفة المتوقعة: 50-100 جنيه
                    <br />👷 نرشحلك: 3 سباكين متاحين في منطقتك
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
