const categories = [
  { name: "السباكة", icon: "🚰" },
  { name: "الكهرباء", icon: "⚡" },
  { name: "النجارة", icon: "🪚" },
  { name: "الصرف الصحي", icon: "🚿" },
  { name: "التكييف", icon: "❄️" },
  { name: "الدهانات", icon: "🎨" },
  { name: "الألوميتال", icon: "🪟" },
  { name: "صيانة الأجهزة", icon: "📺" },
];

function Card({ c }) {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-100 hover:shadow-md transition">
      <div className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl bg-[var(--primary-light)]" style={{ color: 'var(--primary-color)' }}>{c.icon}</div>
      <div className="mt-4 text-center font-medium text-gray-900">{c.name}</div>
    </div>
  );
}

export default function PopularCategories() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl md:text-3xl font-extrabold text-gray-900">إيه الخدمة اللي محتاجها؟</h2>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {categories.map((c) => (
            <Card key={c.name} c={c} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <a href="/categories" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-50">
            شوف كل الخدمات →
          </a>
        </div>
      </div>
    </section>
  );
}
