import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetIncomingRequestsQuery, useUpdateRequestStatusMutation } from "../../../services/workerApi";
import PageContainer from "../components/PageContainer";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";
import { formatPrice } from "../data/mockData"; // Import formatPrice for price formatting

const formatTimeAgo = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "الآن";
  if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
  if (diffHours < 24) return `منذ ${diffHours} ساعة`;
  return `منذ ${diffDays} يوم`;
};

export default function IncomingRequests() {
  const { data: response, isLoading } = useGetIncomingRequestsQuery();
  const [updateStatus] = useUpdateRequestStatusMutation();

  const requests = response?.data || [];

  const sortedRequests = [...requests].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap();
      console.log(`Updated request status to ${status}:`, id);
    } catch (err) {
      console.error(`Failed to update status to ${status}:`, err);
      alert("تعذر تحديث حالة الطلب.");
    }
  };

  const handleAccept = (id) => handleUpdateStatus(id, "accepted");
  const handleReject = (id) => handleUpdateStatus(id, "rejected");

  if (isLoading) {
    return (
      <PageContainer title="إدارة الطلبات" description="جاري تحميل الطلبات...">
        <div className="flex justify-center items-center py-20">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="إدارة الطلبات"
      description={`لديك ${requests.length} طلبات إجمالاً.`}
    >

      {sortedRequests.length === 0 ? (
        <EmptyState message="لا توجد طلبات حالياً." icon="📩" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRequests.map((req) => (
            <div
              key={req._id || req.id}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow"
            >
              {/* Side Accent Line */}
              <div
                className={`absolute top-0 right-0 bottom-0 w-2 ${req.urgency === "urgent" ? "bg-orange-500" : "bg-green-600"}`}
              ></div>

              {/* Clickable Card Content (Header & Details) */}
              <Link
                to={`/request-details/${req._id || req.id}`}
                className="flex flex-col flex-grow cursor-pointer"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4 pr-3">
                  <div className="flex items-center gap-3">
                    {req.user?.profilePic ? (
                      <img
                        src={req.user.profilePic}
                        alt={req.user.name}
                        className="w-12 h-12 rounded-full object-cover shrink-0"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-700 shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-base line-clamp-1 text-slate-800">
                        {req.user?.name || "عميل المنصة"}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {req.service}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <StatusBadge status={req.status} />
                    {req.urgency === "urgent" && (
                      <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 w-fit">
                        ⚠️ عاجل
                      </span>
                    )}
                    <span className="text-gray-400 text-[10px] flex items-center gap-1">
                      {formatTimeAgo(req.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="bg-gray-50 rounded-xl p-3 mb-6 pr-3 flex-grow space-y-2">
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="flex items-center gap-1.5 truncate pr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400 shrink-0"
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
                      {req.address}
                    </span>
                  </div>
                  <div className="flex items-center text-sm font-bold text-gray-800 pr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-orange-500 ml-1.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    السعر المقترح: {formatPrice(req.amount)}
                  </div>
                </div>
              </Link>

              {/* Actions */}
              <div className="flex gap-3 pr-3 mt-auto">
                {(req.status === "pending" || req.status === "awaiting_approval") ? (
                  <>
                    <button
                      onClick={() => handleReject(req._id || req.id)}
                      className="flex-1 py-3 rounded-xl border border-red-200 text-red-600 font-medium hover:bg-red-50 transition-colors flex justify-center items-center gap-2 focus:ring-2 focus:ring-red-200 focus:outline-none text-xs cursor-pointer"
                    >
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      رفض
                    </button>
                    <button
                      onClick={() => handleAccept(req._id || req.id)}
                      className="flex-1 py-3 rounded-xl bg-[#b45309] text-white font-medium hover:bg-[#92400e] transition-colors flex justify-center items-center gap-2 shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none text-xs cursor-pointer"
                    >
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      قبول
                    </button>
                  </>
                ) : req.status === "accepted" ? (
                  <button
                    onClick={() => handleUpdateStatus(req._id || req.id, "in_progress")}
                    className="flex-1 py-3 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 transition-colors flex justify-center items-center gap-2 shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none text-xs cursor-pointer"
                  >
                    بدء العمل 🛠️
                  </button>
                ) : req.status === "in_progress" ? (
                  <button
                    onClick={() => handleUpdateStatus(req._id || req.id, "completed")}
                    className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors flex justify-center items-center gap-2 shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none text-xs cursor-pointer"
                  >
                    إكمال الخدمة ✓
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
