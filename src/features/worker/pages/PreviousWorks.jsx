/**
 * ============================================
 * PREVIOUS WORKS PAGE
 * ============================================
 * Displays portfolio of completed works
 * Includes both platform jobs and external jobs
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetWorkerWorksQuery,
  useDeleteWorkerWorkMutation,
} from "../../../services/workerApi";
import { WorkerRoutes } from "../constants/routes.config";
import {
  JOB_SOURCE_LABELS,
  SERVICE_CATEGORY_LABELS,
} from "../constants/worker.constants";
import PageContainer from "../components/PageContainer";
import EmptyState from "../components/EmptyState";
import ConfirmModal from "../components/ConfirmModal";
import PortfolioPagination from "../components/PortfolioPagination";

export default function PreviousWorks() {
  const { data: worksData, isLoading, refetch } = useGetWorkerWorksQuery();
  const [deleteWork] = useDeleteWorkerWorkMutation();

  const [activeTab, setActiveTab] = useState("platform"); // "platform" or "outside"
  const [platformPage, setPlatformPage] = useState(1);
  const [outsidePage, setOutsidePage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const [workToDelete, setWorkToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const works = worksData?.data || [];
  const platformWorks = works.filter((w) => w.source === "platform");
  const outsideWorks = works.filter((w) => w.source === "outside");

  const paginatedPlatformWorks = platformWorks.slice(
    (platformPage - 1) * ITEMS_PER_PAGE,
    platformPage * ITEMS_PER_PAGE
  );

  const paginatedOutsideWorks = outsideWorks.slice(
    (outsidePage - 1) * ITEMS_PER_PAGE,
    outsidePage * ITEMS_PER_PAGE
  );

  const platformPagination = {
    numberOfPages: Math.ceil(platformWorks.length / ITEMS_PER_PAGE),
  };

  const outsidePagination = {
    numberOfPages: Math.ceil(outsideWorks.length / ITEMS_PER_PAGE),
  };

  const handleDeleteConfirm = async () => {
    if (!workToDelete) return;
    try {
      await deleteWork(workToDelete).unwrap();
      setIsDeleteModalOpen(false);
      setWorkToDelete(null);
      refetch();
    } catch (err) {
      console.error("Failed to delete work:", err);
    }
  };

  const AddButton = (
    <Link
      to={`${WorkerRoutes.WORKS}/add`}
      className="flex items-center justify-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm w-full sm:w-auto"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
          clipRule="evenodd"
        />
      </svg>
      إضافة عمل جديد
    </Link>
  );

  const renderWorkCard = (work) => (
    <div
      key={work._id || work.id}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
    >
      <Link
        to={WorkerRoutes.WORK_DETAIL(work._id || work.id)}
        className="block flex-1"
      >
        {/* Image Placeholder */}
        <div className="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden relative">
          {work.images && work.images.length > 0 ? (
            <img
              src={work.images[0]}
              alt={work.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="text-4xl opacity-40">📸</div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Header */}
          <div>
            <h3 className="font-bold text-slate-900 line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors">
              {work.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg">
                {SERVICE_CATEGORY_LABELS[work.category] || work.category}
              </span>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-lg ${
                  work.source === "platform"
                    ? "bg-purple-50 text-purple-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {JOB_SOURCE_LABELS[work.source] || work.source}
              </span>
            </div>
          </div>

          {/* Client & Date */}
          <div className="space-y-2 text-sm text-gray-600 border-t border-gray-50 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">العميل:</span>
              <span className="font-medium text-slate-900">
                {work.clientName}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">التاريخ:</span>
              <span className="font-medium text-slate-900">
                {new Date(work.date).toLocaleDateString("ar-EG")}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">السعر:</span>
              <span className="font-bold text-orange-600">
                {work.price} ج.م
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Edit/Delete actions for outside works */}
      {work.source === "outside" && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-50 flex items-center gap-2">
          <Link
            to={`/worker/works/edit/${work._id || work.id}`}
            className="flex-1 text-center py-2 px-3 bg-amber-50 hover:bg-amber-100 text-amber-700 font-medium text-xs rounded-xl transition-colors flex items-center justify-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            تعديل
          </Link>
          <button
            onClick={() => {
              setWorkToDelete(work._id || work.id);
              setIsDeleteModalOpen(true);
            }}
            className="flex-1 py-2 px-3 bg-red-50 hover:bg-red-100 text-red-700 font-medium text-xs rounded-xl transition-colors flex items-center justify-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            حذف
          </button>
        </div>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="p-8 text-center flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
          <p className="text-gray-505 font-medium">جاري تحميل معرض أعمالك...</p>
        </div>
      </div>
    );
  }

  return (
    <PageContainer
      title="معرض الأعمال"
      description="عرض جميع الأعمال التي قمت بها سواء من المنصة أو خارجها."
    >
      <div className="space-y-8">
        {/* Tab Headers */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-3" dir="rtl">
          <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveTab("platform")}
              className={`pb-3 text-lg sm:text-xl font-bold transition-all relative cursor-pointer whitespace-nowrap ${
                activeTab === "platform"
                  ? "text-slate-900 font-extrabold"
                  : "text-gray-400 hover:text-gray-650"
              }`}
            >
              <span className="flex items-center gap-2">
                الخدمات المنفذة عبر الموقع
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold transition-colors duration-200 ${
                  activeTab === "platform"
                    ? "bg-orange-50 text-[#eb6a2d]"
                    : "bg-gray-100 text-gray-500"
                }`}>
                  {platformWorks.length}
                </span>
              </span>
              {activeTab === "platform" && (
                <div className="absolute bottom-0 right-0 left-0 h-1 bg-[#eb6a2d] rounded-t-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("outside")}
              className={`pb-3 text-lg sm:text-xl font-bold transition-all relative cursor-pointer whitespace-nowrap ${
                activeTab === "outside"
                  ? "text-slate-900 font-extrabold"
                  : "text-gray-400 hover:text-gray-650"
              }`}
            >
              <span className="flex items-center gap-2">
                أعمال سابقة خارج الموقع
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold transition-colors duration-200 ${
                  activeTab === "outside"
                    ? "bg-orange-50 text-[#eb6a2d]"
                    : "bg-gray-100 text-gray-500"
                }`}>
                  {outsideWorks.length}
                </span>
              </span>
              {activeTab === "outside" && (
                <div className="absolute bottom-0 right-0 left-0 h-1 bg-[#eb6a2d] rounded-t-full" />
              )}
            </button>
          </div>

          {activeTab === "outside" && (
            <div className="shrink-0 w-full sm:w-auto">
              {AddButton}
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="space-y-6">
          {activeTab === "platform" ? (
            platformWorks.length === 0 ? (
              <EmptyState
                message="لم يتم تسجيل أي خدمات منفذة عبر الموقع بعد. عند إكمال طلبات العملاء ستظهر هنا تلقائياً."
                icon="🌐"
              />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" dir="rtl">
                  {paginatedPlatformWorks.map(renderWorkCard)}
                </div>
                <div className="pt-2">
                  <PortfolioPagination
                    pagination={platformPagination}
                    currentPage={platformPage}
                    onPageChange={setPlatformPage}
                  />
                </div>
              </>
            )
          ) : (
            outsideWorks.length === 0 ? (
              <EmptyState
                message="لم تقم بإضافة أي أعمال خارجية سابقة بعد. ابدأ بإضافة عمل جديد!"
                icon="🏗️"
              />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" dir="rtl">
                  {paginatedOutsideWorks.map(renderWorkCard)}
                </div>
                <div className="pt-2">
                  <PortfolioPagination
                    pagination={outsidePagination}
                    currentPage={outsidePage}
                    onPageChange={setOutsidePage}
                  />
                </div>
              </>
            )
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setWorkToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="حذف العمل"
        message="هل أنت متأكد من رغبتك في حذف هذا العمل نهائياً من معرض أعمالك؟ لا يمكن التراجع عن هذا الإجراء."
        confirmText="حذف"
        cancelText="إلغاء"
        variant="danger"
      />
    </PageContainer>
  );
}
