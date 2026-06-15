export default function ServiceDetails({
  service,
  onServiceChange,
  description,
  onDescriptionChange,
}) {
  return (
     <>
      <h3 className="text-sm font-bold text-gray-800 mt-5 mb-2 flex items-center gap-2">
        <span className="w-2 h-2 bg-[var(--primary-color)] rounded-full"></span>
        تفاصيل الخدمة
      </h3>

      {/* service input */}
      <label className="block text-xs text-gray-400 mb-2">
        وصف مختصر للخدمة
      </label>

      <input
        type="text"
        placeholder="مثال: تصليح حنفية مطبخ"
        value={service}
        onChange={(e) => onServiceChange(e.target.value)}
        className="w-full mb-3 p-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary-color)] text-sm transition"
        required
        minLength={5}
      />

      {/* description */}
      <label className="block text-xs text-gray-400 mb-2">
        وصف المشكلة بالتفصيل
      </label>

      <textarea
        rows="4"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder="مثلاً: صنبور المطبخ يسرب الماء..."
        className="w-full p-4 mb-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--primary-color)] text-sm placeholder:text-gray-300 transition"
        required
      />

    </>
  );
}