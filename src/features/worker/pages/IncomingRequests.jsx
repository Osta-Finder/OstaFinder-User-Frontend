import PageContainer from "../components/PageContainer";
import EmptyState from "../components/EmptyState";
import { formatPrice } from "../data/mockData"; // Import formatPrice for price formatting
import { useGetIncomingRequestsQuery, useUpdateRequestStatusMutation } from "../../../services/workerApi";

export default function IncomingRequests() {
  const { data, isLoading } = useGetIncomingRequestsQuery();
  const [updateStatus] = useUpdateRequestStatusMutation();

  const requests = data?.data || [];

  const handleAccept = async (id) => {
    try {
      await updateStatus({ id, status: "in_progress" }).unwrap();
      console.log("Accepted request:", id);
    } catch (error) {
      console.error("Failed to accept:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await updateStatus({ id, status: "rejected" }).unwrap();
      console.log("Rejected request:", id);
    } catch (error) {
      console.error("Failed to reject:", error);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">جاري التحميل...</div>;
  }

  return (
    <PageContainer
      title="الطلبات الواردة"
      description={`لديك ${requests.length} طلبات جديدة بانتظار المراجعة.`}
    >
      <div className="flex gap-3 mb-6">
        <button className="px-5 py-2 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors bg-white">
          الأحدث
        </button>
        <button className="px-5 py-2 rounded-full bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition-colors">
          الأقرب
        </button>
      </div>

      {requests.length === 0 ? (
        <EmptyState message="لا توجد طلبات واردة حالياً." icon="📩" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow"
            >
              {/* Side Accent Line */}
              <div
                className={`absolute top-0 right-0 bottom-0 w-2 ${req.urgency === "urgent" ? "bg-orange-500" : "bg-green-600"}`}
              ></div>

              {/* Header */}
              <div className="flex justify-between items-start mb-4 pr-3">
                <div className="flex items-center gap-3">
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
                  <div>
                    <h3 className="font-bold text-base line-clamp-1">
                      {req.clientName}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {req.serviceTitle}
                    </p>
                  </div>
                </div>
                {req.urgency === "urgent" ? (
                  <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    عاجل
                  </span>
                ) : (
                  <span className="text-gray-400 text-xs flex items-center gap-1 shrink-0">
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
                    {req.timeAgo}
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="bg-gray-50 rounded-xl p-3 mb-6 pr-3 flex-grow space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-700">
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
                    {req.location}
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="font-medium whitespace-nowrap pl-2">
                    على بعد {req.distance}
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
                  السعر المقترح: {formatPrice(req.price)}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pr-3 mt-auto">
                <button
                  onClick={() => handleReject(req._id)}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors flex justify-center items-center gap-2 focus:ring-2 focus:ring-gray-200 focus:outline-none"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  رفض
                </button>
                <button
                  onClick={() => handleAccept(req._id)}
                  className="flex-1 py-3 rounded-xl bg-[#b45309] text-white font-medium hover:bg-[#92400e] transition-colors flex justify-center items-center gap-2 shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  قبول
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
