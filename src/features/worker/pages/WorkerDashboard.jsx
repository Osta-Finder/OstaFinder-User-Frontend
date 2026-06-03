/**
 * ============================================
 * WORKER DASHBOARD PAGE
 * ============================================
 * UI logic separated from data
 * Uses StatCard, StatusBadge, category icons properly
 * All routes imported from centralized config
 */

import { Link } from "react-router-dom";
import {
  formatPrice,
} from "../data/mockData";
import { WorkerRoutes } from "../constants/routes.config";
import { ServiceCategory } from "../constants/worker.constants";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import { useGetDashboardStatsQuery, useGetDashboardRequestsQuery } from "../../../services/workerApi";

// Category icon components
const Icons = {
  [ServiceCategory.ELECTRICITY]: (
    <svg
      className="w-5 h-5 text-amber-700"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  [ServiceCategory.PLUMBING]: (
    <svg
      className="w-5 h-5 text-orange-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  [ServiceCategory.AC]: (
    <svg
      className="w-5 h-5 text-blue-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="12" y1="2" x2="12" y2="22" />
      <path d="M20 16l-4-4 4-4M4 8l4 4-4 4M16 4l-4 4-4-4M8 20l4-4 4 4" />
    </svg>
  ),
  DEFAULT: (
    <svg
      className="w-5 h-5 text-gray-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
};

const getCategoryIcon = (category) => Icons[category] || Icons.DEFAULT;

export default function WorkerDashboard() {
  const { data: statsData, isLoading: isStatsLoading } = useGetDashboardStatsQuery();
  const { data: requestsData, isLoading: isRequestsLoading } = useGetDashboardRequestsQuery();

  const stats = statsData?.data || {
    totalOrders: { value: 0, change: "+0%", period: "" },
    employmentRate: { value: "0%", change: "+0%", period: "" },
    totalEarnings: { value: 0, currency: "ج.م", change: "+0%", period: "" },
  };

  const requests = requestsData?.data || [];

  if (isStatsLoading || isRequestsLoading) {
    return <div className="p-8 text-center">جاري التحميل...</div>;
  }

  return (
    <div className="p-8 space-y-6 flex-1 max-w-7xl w-full mx-auto">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            مرحباً بك، الأسطى محمد 👋
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            نظرة عامة على أداء أعمالك اليوم.
          </p>
        </div>
        <Link
          to={WorkerRoutes.SERVICE_ADD}
          className="flex items-center justify-center gap-2 bg-[#5A2D0C] hover:bg-[#432108] text-white px-5 py-3 rounded-xl font-medium transition-colors shadow-sm text-sm shrink-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
            />
          </svg>
          إضافة خدمة جديدة
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          title="إجمالي الطلبات"
          value={stats.totalOrders.value}
          change={`${stats.totalOrders.change} ${stats.totalOrders.period}`}
          icon={Icons[ServiceCategory.ELECTRICITY]}
        />
        <StatCard
          title="معدل التوظيف"
          value={stats.employmentRate.value}
          change={`${stats.employmentRate.change} ${stats.employmentRate.period}`}
          icon={Icons[ServiceCategory.PLUMBING]}
        />
        <StatCard
          title="إجمالي الأرباح"
          value={stats.totalEarnings.value.toLocaleString()}
          suffix={stats.totalEarnings.currency}
          change={`${stats.totalEarnings.change} ${stats.totalEarnings.period}`}
          icon={Icons[ServiceCategory.AC]}
          variant="gradient"
        />
      </div>

      {/* Recent Requests Table */}
      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">أحدث الطلبات</h3>
          <Link
            to={WorkerRoutes.REQUESTS}
            className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
          >
            عرض الكل
          </Link>
        </div>

        <div className="divide-y divide-gray-100">
          {requests.map((request) => (
            <div
              key={request.id}
              className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-50 rounded-2xl shrink-0 mt-0.5">
                  {getCategoryIcon(request.category)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4
                      className={`font-bold text-base ${request.status === "completed" ? "text-gray-400 line-through" : "text-slate-900"}`}
                    >
                      {request.title}
                    </h4>
                    {request.urgency === "urgent" && (
                      <span className="bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                        عاجل
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400 font-medium">
                    <span className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {request.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {request.time}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0">
                <StatusBadge status={request.status} />
                <div className="min-w-[80px] text-left">
                  {request.status === "awaiting_approval" ? (
                    <button className="bg-[#F26B1D] hover:bg-orange-600 text-white font-bold text-sm px-5 py-2 rounded-xl transition-colors shadow-sm">
                      قبول
                    </button>
                  ) : (
                    <span
                      className={`font-bold text-base ${request.status === "completed" ? "text-gray-400" : "text-slate-800"}`}
                    >
                      {formatPrice(request.price)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights Banner */}
      <div className="bg-gradient-to-r from-orange-50/60 to-amber-50/40 border border-dashed border-orange-200 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-2xl text-orange-600 border border-orange-100 shrink-0 shadow-sm">
            {Icons.Bot}
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-orange-900 text-sm">
              رؤية الذكاء الاصطناعي
            </h4>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-3xl">
              بناءً على نشاطك الأخير، هناك طلب متزايد بنسبة{" "}
              <span className="font-bold text-orange-600">15%</span> على خدمات{" "}
              <span className="font-semibold text-slate-900">
                "صيانة التكييف"
              </span>{" "}
              في منطقة{" "}
              <span className="font-semibold text-slate-900">"المعادي"</span>.
              ننصحك بتحديث تواجدك في هذه المنطقة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
