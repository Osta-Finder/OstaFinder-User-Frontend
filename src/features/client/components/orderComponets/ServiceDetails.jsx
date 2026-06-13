export default function ServiceDetails({ value, onChange }) {
  return (
    <>
      <h3 className="text-sm font-bold text-gray-800 mt-5 mb-2 flex items-center gap-2">
        <span className="w-2 h-2 bg-[var(--primary-color)] rounded-full"></span> تفاصيل الخدمة
      </h3>
      <label className="block text-xs text-gray-400 mb-2">وصف المشكلة بالتفصيل</label>
      <textarea
        rows="4"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="مثلاً: صنبور المطبخ يسرب الماء، أحتاج لتغيير القلب..."
        className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary-color)] text-sm placeholder:text-gray-300 transition"
        required
      ></textarea>
    </>
  );
}