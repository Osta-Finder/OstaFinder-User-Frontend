/**
 * ============================================
 * SERVICE CARD COMPONENT
 * ============================================
 * Displays a worker-offered service with:
 * - Category icon (from CATEGORY_ICONS constant)
 * - Status badge (StatusBadge handles ServiceStatus enum)
 * - Formatted price (number | null → string via formatPrice)
 *
 * Props:
 *   service: {
 *     id: string
 *     title: string
 *     category: ServiceCategory enum
 *     status: ServiceStatus enum
 *     price: number | null
 *     location: string
 *     createdAt: string
 *   }
 */

import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { WorkerRoutes } from "../constants/routes.config";
import { CATEGORY_ICONS } from "../constants/worker.constants";
import { formatPrice } from "../data/mockData";

// SVG icons kept inline to avoid external icon library dependency
const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default function ServiceCard({ service }) {
  const icon = CATEGORY_ICONS[service.category] ?? "🔧";
  const categoryLabel = service.category;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      {/* Right Side: Icon + Details */}
      <div className="flex items-start gap-4 w-full md:w-auto">
        {/* Category Icon */}
        <div
          className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 shrink-0 text-xl"
          aria-label={categoryLabel}
          title={categoryLabel}
        >
          {icon}
        </div>

        {/* Title + Meta */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-gray-800">{service.title}</h3>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mt-1">
            <span className="flex items-center gap-1">
              <LocationIcon />
              {service.location}
            </span>
            <span className="hidden md:inline text-gray-300">•</span>
            <span className="flex items-center gap-1">
              <CalendarIcon />
              {service.createdAt}
            </span>
          </div>
        </div>
      </div>

      {/* Left Side: Status + Price + Actions */}
      <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3 mt-2 md:mt-0">
        <div className="flex items-center gap-3">
          <span className="font-bold text-gray-800 whitespace-nowrap" dir="ltr">
            {formatPrice(service.price)}
          </span>
          {/* StatusBadge now handles ServiceStatus enum values (active, paused, inactive) */}
          <StatusBadge status={service.status} />
        </div>

        <div className="flex items-center gap-2 mt-1">
          <Link
            to={WorkerRoutes.SERVICE_DETAIL(service.id)}
            className="text-sm text-orange-600 hover:text-orange-700 font-medium px-3 py-1.5 hover:bg-orange-50 rounded-lg transition-colors"
          >
            عرض التفاصيل
          </Link>
        </div>
      </div>
    </div>
  );
}
