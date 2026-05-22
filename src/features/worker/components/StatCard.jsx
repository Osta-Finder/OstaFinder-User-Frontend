export default function StatCard({ title, value, suffix, change, icon, variant = "default" }) {
  const isGradient = variant === "gradient";

  return (
    <div
      className={`rounded-2xl p-5 border transition-shadow hover:shadow-md ${
        isGradient
          ? "bg-gradient-to-l from-amber-600 to-orange-700 border-orange-600 text-white"
          : "bg-white border-gray-100 text-gray-900"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
            isGradient ? "bg-white/20" : "bg-orange-50"
          }`}
        >
          <span className={isGradient ? "text-white" : "text-orange-600"}>{icon}</span>
        </div>
      </div>

      <p
        className={`text-sm font-medium mb-1 ${
          isGradient ? "text-orange-100" : "text-gray-500"
        }`}
      >
        {title}
      </p>

      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-bold">{value}</span>
        {suffix && (
          <span
            className={`text-sm font-medium ${
              isGradient ? "text-orange-100" : "text-gray-500"
            }`}
          >
            {suffix}
          </span>
        )}
      </div>

      {change && (
        <p
          className={`text-xs mt-2 font-medium ${
            isGradient ? "text-orange-100" : "text-green-600"
          }`}
        >
          {change}
        </p>
      )}
    </div>
  );
}
