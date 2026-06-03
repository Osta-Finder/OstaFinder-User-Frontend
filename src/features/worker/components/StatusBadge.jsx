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
    badge: "bg-yellow-100",
    dot: "bg-yellow-500",
  },
  in_progress: {
    label: "قيد التنفيذ",
    badge: "bg-blue-100",
    dot: "bg-blue-500",
  },
  active: { label: "نشط", badge: "bg-green-100", dot: "bg-green-500" },
  paused: { label: "مؤجل", badge: "bg-orange-100", dot: "bg-orange-500" },
  inactive: { label: "غير نشط", badge: "bg-red-100", dot: "bg-red-500" },
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
