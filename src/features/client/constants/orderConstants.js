export const STATUS_CONFIG = {
  pending: { label: "معلقة", color: "#f97316", bg: "#fff7ed" },
  accepted: { label: "مقبولة", color: "#3b82f6", bg: "#eff6ff" },
  in_progress: { label: "قيد التنفيذ", color: "#8b5cf6", bg: "#f5f3ff" },
  completed: { label: "مكتملة", color: "#22c55e", bg: "#f0fdf4" },
  rejected: { label: "مرفوضة", color: "#ef4444", bg: "#fef2f2" },
};

export const STATUS_TABS = [
  { key: "all", label: "الكل", color: "gray" },
  { key: "pending", label: "معلقة", color: "orange" },
  { key: "accepted", label: "قابوله", color: "blue" },
  { key: "in_progress", label: "قيد التنفيذ", color: "purple" },
  { key: "completed", label: "مكتملة", color: "green" },
  { key: "rejected", label: "مرفوضه", color: "red" },
];

export const STEPS = [
  { key: 1, label: "تم الطلب" },
  { key: 2, label: "تم القبول" },
  { key: 3, label: "قيد التنفيذ" },
  { key: 4, label: "مكتمل" },
];

export function getStatusCount(orders, statusKey) {
  if (statusKey === "all") return orders.length;
  return orders.filter((o) => o.status === statusKey).length;
}

const COUNT_COLORS = {
  gray: "#6b7280",
  orange: "#f97316",
  blue: "#3b82f6",
  purple: "#8b5cf6",
  green: "#22c55e",
  red: "#ef4444",
};

const COUNT_BGS = {
  gray: "#f3f4f6",
  orange: "#fff7ed",
  blue: "#eff6ff",
  purple: "#f5f3ff",
  green: "#f0fdf4",
  red: "#fef2f2",
};

export function getCountColor(key) {
  return COUNT_COLORS[key] || COUNT_COLORS.gray;
}

export function getCountBg(key) {
  return COUNT_BGS[key] || COUNT_BGS.gray;
}
