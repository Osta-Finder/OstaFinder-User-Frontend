/**
 * ============================================
 * WORK DETAILS PAGE
 * ============================================
 * Displays detailed view of a completed work
 * Shows full information about the job
 */

import { useParams, Link, useNavigate } from "react-router-dom";
import { mockWorks } from "../data/mockData";
import { WorkerRoutes } from "../constants/routes.config";
import {
  JOB_SOURCE_LABELS,
  SERVICE_CATEGORY_LABELS,
  REQUEST_STATUS_CONFIG,
} from "../constants/worker.constants";
import { 
  useGetWorkerWorkByIdQuery, 
  useDeleteWorkerWorkMutation 
} from "../../../services/workerApi";

export default function WorkDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetWorkerWorkByIdQuery(id);
  const [deleteWork, { isLoading: isDeleting }] = useDeleteWorkerWorkMutation();
  const work = data?.data;

  const handleDelete = async () => {
    if (window.confirm("هل أنت متأكد من حذف هذا العمل؟ لا يمكن التراجع عن هذا الإجراء.")) {
      try {
        await deleteWork(id).unwrap();
        navigate(WorkerRoutes.WORKS);
      } catch (err) {
        console.error("Failed to delete work:", err);
        alert("حدث خطأ أثناء الحذف. يرجى المحاولة مرة أخرى.");
      }
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">جاري التحميل...</div>;
  }

  if (!work) {
    return (
      <div className="p-8 text-center">
        <div className="inline-flex flex-col items-center gap-4 py-12">
          <div className="text-6xl opacity-30">🏗️</div>
          <h2 className="text-2xl font-bold text-gray-900">العمل غير موجود</h2>
          <p className="text-gray-500 mb-6">
            لم نتمكن من العثور على هذا العمل.
          </p>
          <Link
            to={WorkerRoutes.WORKS}
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            العودة إلى المعرض
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig = REQUEST_STATUS_CONFIG[work.status];

  return (
    <div className="p-4 md:p-8 font-sans flex-1 max-w-6xl w-full mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-medium">رجوع</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
        {/* Image Section */}
        <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
          {work.images && work.images.length > 0 ? (
            <img
              src={work.images[0]}
              alt={work.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-8xl opacity-30">📸</div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-8">
          {/* Title & Status */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {work.title}
              </h1>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-blue-50 text-blue-700 text-sm font-semibold rounded-lg">
                  {SERVICE_CATEGORY_LABELS[work.category]}
                </span>
                <span
                  className={`px-4 py-2 text-sm font-semibold rounded-lg ${
                    work.source === "platform"
                      ? "bg-purple-50 text-purple-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {JOB_SOURCE_LABELS[work.source]}
                </span>
                <span
                  className={`px-4 py-2 text-sm font-semibold rounded-lg ${statusConfig.badge}`}
                >
                  {statusConfig.label}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-sm mb-1">إجمالي السعر</p>
              <p className="text-4xl font-bold text-orange-600">{work.price}</p>
              <p className="text-gray-500 text-sm">ج.م</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-100 pt-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
                  معلومات العميل
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">اسم العميل:</span>
                    <span className="font-semibold text-slate-900">
                      {work.clientName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">الموقع:</span>
                    <span className="font-semibold text-slate-900">
                      {work.location}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
                  معلومات العمل
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">تاريخ الإنجاز:</span>
                    <span className="font-semibold text-slate-900">
                      {new Date(work.date).toLocaleDateString("ar-EG")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">المصدر:</span>
                    <span className="font-semibold text-slate-900">
                      {JOB_SOURCE_LABELS[work.source]}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
                وصف العمل
              </h3>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-700 leading-relaxed">
                  {work.description}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 border-t border-gray-100 pt-8 mt-8">
            <Link
              to={WorkerRoutes.WORK_EDIT(id)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-8 py-3 rounded-xl font-medium transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              تعديل العمل
            </Link>
            
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 px-8 py-3 rounded-xl font-medium transition-colors disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              {isDeleting ? "جاري الحذف..." : "حذف العمل"}
            </button>
            
            <div className="flex-1"></div> {/* Spacer */}

            <Link
              to={WorkerRoutes.WORKS}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-3 rounded-xl font-medium transition-colors"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              العودة للمعرض
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
