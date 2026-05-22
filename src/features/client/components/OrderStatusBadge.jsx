import { STATUS_CONFIG } from "../constants/orderConstants";

export default function OrderStatusBadge({ status }) {
  const config = STATUS_CONFIG[status];
  if (!config) return null;
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{ color: config.color, background: config.bg }}
    >
      {config.label}
    </span>
  );
}
