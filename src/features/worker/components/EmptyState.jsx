export default function EmptyState({ message, icon }) {
  return (
    <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center">
      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4 text-3xl">
        {icon || "📁"}
      </div>
      <p className="text-gray-500">{message}</p>
    </div>
  );
}
