import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  useGetDashboardStatsQuery,
  useGetDashboardRequestsQuery,
  useGetWorkerProfileQuery,
  useUpdateRequestStatusMutation,
} from "../../../services/workerApi";
import { WorkerRoutes } from "../constants/routes.config";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";

const Icons = {
  electricity: (
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
  plumbing: (
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
  ac: (
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
  cleaning: (
    <svg
      className="w-5 h-5 text-emerald-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 21h12" />
      <path d="M9 21V8l3-5 3 5v13" />
      <path d="M7 14h10" />
    </svg>
  ),
  default: (
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
  bot: (
    <svg
      className="w-5 h-5 text-orange-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="7" width="16" height="12" rx="2" />
      <path d="M9 7V4h6v3" />
      <circle cx="9" cy="13" r="1" />
      <circle cx="15" cy="13" r="1" />
      <path d="M12 15v2" />
    </svg>
  ),
};

const categoryIconMap = {
  electricity: Icons.electricity,
  plumbing: Icons.plumbing,
  ac: Icons.ac,
  cleaning: Icons.cleaning,
  كهرباء: Icons.electricity,
  سباكة: Icons.plumbing,
  تكييف: Icons.ac,
  تنظيف: Icons.cleaning,
  "تكييف وتبريد": Icons.ac,
};

const statIconMap = {
  totalOrders: Icons.electricity,
  employmentRate: Icons.plumbing,
  totalEarnings: Icons.ac,
};

const formatNumber = (value) => {
  const number = Number(value);
  if (Number.isNaN(number)) return value ?? "0";
  return new Intl.NumberFormat("ar-EG").format(number);
};

const formatPrice = (value) => {
  const number = Number(value);
  if (Number.isNaN(number)) return "0 ج.م";
  return `${new Intl.NumberFormat("ar-EG").format(number)} ج.م`;
};

const formatDate = (dateString) => {
  if (!dateString) return "—";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (e) {
    return dateString;
  }
};

const getCategoryIcon = (category) =>
  categoryIconMap[category] || Icons.default;

const getSafeStats = (statsData) => {
  const stats = statsData?.data ?? statsData ?? {};

  return {
    totalOrders: stats.totalOrders ?? { value: 0, change: 0, period: "" },
    employmentRate: stats.employmentRate ?? { value: 0, change: 0, period: "" },
    totalEarnings: stats.totalEarnings ?? {
      value: 0,
      change: 0,
      period: "",
      currency: "ج.م",
    },
  };
};

export default function WorkerDashboard() {
  const {
    data: worker,
    isLoading: workerLoading,
    isError: workerError,
  } = useGetWorkerProfileQuery();
  const {
    data: statsData,
    isLoading: statsLoading,
    isError: statsError,
  } = useGetDashboardStatsQuery();
  const {
    data: requestsData,
    isLoading: requestsLoading,
    isError: requestsError,
  } = useGetDashboardRequestsQuery();

  const stats = useMemo(() => getSafeStats(statsData), [statsData]);
  const requests = requestsData?.data ?? requestsData ?? [];
  const [updateRequestStatus] = useUpdateRequestStatusMutation();

  const handleAcceptRequest = async (id) => {
    try {
      await updateRequestStatus({ id, status: "accepted" }).unwrap();
    } catch (err) {
      console.error("Failed to accept request:", err);
      alert("تعذر قبول الطلب.");
    }
  };

  const isLoading = workerLoading || statsLoading || requestsLoading;
  const hasError = workerError || statsError || requestsError;

  return (
    <div className="p-8 space-y-6 flex-1 max-w-7xl w-full mx-auto">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            مرحباً بك، {worker?.name || worker?.fullName || "الأسطى"} 👋
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            نظرة عامة على أداء أعمالك اليوم.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            التصنيف:{" "}
            {workerLoading ? "جاري التحميل..." : worker?.category || "غير محدد"}
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

      {hasError && !isLoading && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 text-sm">
          حدث خطأ أثناء تحميل بيانات لوحة التحكم. حاول تحديث الصفحة.
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          title="إجمالي الطلبات"
          value={isLoading ? "—" : formatNumber(stats.totalOrders.value)}
          change={
            isLoading
              ? "جاري التحميل..."
              : `${stats.totalOrders.change} ${stats.totalOrders.period}`
          }
          icon={statIconMap.totalOrders}
        />
        <StatCard
          title="معدل التوظيف"
          value={isLoading ? "—" : formatNumber(stats.employmentRate.value)}
          change={
            isLoading
              ? "جاري التحميل..."
              : `${stats.employmentRate.change} ${stats.employmentRate.period}`
          }
          icon={statIconMap.employmentRate}
        />
        <StatCard
          title="إجمالي الأرباح"
          value={isLoading ? "—" : formatNumber(stats.totalEarnings.value)}
          suffix={stats.totalEarnings.currency || "ج.م"}
          change={
            isLoading
              ? "جاري التحميل..."
              : `${stats.totalEarnings.change} ${stats.totalEarnings.period}`
          }
          icon={statIconMap.totalEarnings}
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
          {requestsLoading ? (
            <div className="p-6 text-sm text-gray-500">
              جاري تحميل الطلبات...
            </div>
          ) : requests.length === 0 ? (
            <div className="p-6 text-sm text-gray-500">
              لا توجد طلبات حتى الآن.
            </div>
          ) : (
            requests.map((request) => (
              <div
                key={request.id || request._id}
                className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors"
              >
                <Link
                  to={`/request-details/${request.id || request._id}`}
                  className="flex items-start gap-4 flex-1"
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
                          {request.serviceTitle || request.title}
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
                            className="h-4 w-4 text-gray-400 animate-pulse"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {request.location || "—"}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400"
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
                          {formatDate(request.createdAt || request.time)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0">
                  <StatusBadge status={request.status} />
                  <div className="min-w-[80px] text-left">
                    {request.status === "awaiting_approval" ||
                    request.status === "pending" ? (
                      <button
                        onClick={() =>
                          handleAcceptRequest(request._id || request.id)
                        }
                        className="bg-[#F26B1D] hover:bg-orange-600 text-white font-bold text-sm px-5 py-2 rounded-xl transition-colors shadow-sm cursor-pointer"
                      >
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
            ))
          )}
        </div>
      </div>

      {/* AI Insights Banner */}
      <div className="bg-gradient-to-r from-orange-50/60 to-amber-50/40 border border-dashed border-orange-200 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-2xl text-orange-600 border border-orange-100 shrink-0 shadow-sm">
            {Icons.bot}
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-orange-900 text-sm">
              رؤية الذكاء الاصطناعي
            </h4>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-3xl">
              بناءً على نشاطك الأخير، يمكنك متابعة المناطق الأكثر طلبًا وزيادة
              ظهورك في التصنيفات الأعلى ربحًا.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
