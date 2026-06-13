/**
 * ============================================
 * STATUS BADGE COMPONENT
 * ============================================
 * Supports both RequestStatus and ServiceStatus enums.
 * Uses a merged config lookup — no includes(), no Arabic in logic.
 * Arabic labels are for display only via config mapping.
 */

const STATUS_CONFIG = {
  pending: {
    label: "قيد الانتظار",
    badge: "bg-yellow-100 text-yellow-800",
    dot: "bg-yellow-500",
  },
  in_progress: {
    label: "قيد التنفيذ",
    badge: "bg-blue-100 text-blue-800",
    dot: "bg-blue-500",
  },
  active: { label: "نشط", badge: "bg-green-100 text-green-800", dot: "bg-green-500" },
  paused: { label: "مؤجل", badge: "bg-orange-100 text-orange-800", dot: "bg-orange-500" },
  inactive: { label: "غير نشط", badge: "bg-red-100 text-red-800", dot: "bg-red-500" },
  completed: { label: "مكتمل", badge: "bg-emerald-100 text-emerald-800", dot: "bg-emerald-500" },
  accepted: { label: "مقبول", badge: "bg-sky-100 text-sky-800", dot: "bg-sky-500" },
  on_the_way: { label: "في الطريق", badge: "bg-teal-100 text-teal-800", dot: "bg-teal-500" },
  rejected: { label: "مرفوض", badge: "bg-rose-100 text-rose-800", dot: "bg-rose-500" },
  cancelled: { label: "ملغي", badge: "bg-slate-100 text-slate-800", dot: "bg-slate-500" },
  awaiting_approval: { label: "بانتظار الموافقة", badge: "bg-violet-100 text-violet-800", dot: "bg-violet-500" },
};

/**
 * @param {string}  status    - A valid RequestStatus or ServiceStatus enum value
 * @param {boolean} showLabel - Whether to render the Arabic label (default: true)
 */
export default function StatusBadge({ status, showLabel = true }) {
  const config = STATUS_CONFIG[status];

  // Graceful fallback for unknown / undefined status values
  if (!config) {
    return (
      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200 flex items-center gap-1.5 w-fit">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
        {status ?? "—"}
      </span>
    );
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 w-fit ${config.badge}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {showLabel ? config.label : null}
    </span>
  );
}
