/**
 * ============================================
 * PREVIOUS WORKS PAGE
 * ============================================
 * Displays portfolio of completed works
 * Includes both platform jobs and external jobs
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { WorkerRoutes } from "../constants/routes.config";
import {
  JOB_SOURCE_LABELS,
  SERVICE_CATEGORY_LABELS,
} from "../constants/worker.constants";
import PageContainer from "../components/PageContainer";
import EmptyState from "../components/EmptyState";
import { useGetWorkerWorksQuery } from "../../../services/workerApi";

export default function PreviousWorks() {
  const [activeTab, setActiveTab] = useState("completed");
  const { data, isLoading } = useGetWorkerWorksQuery();
  
  const allWorks = data?.data || [];
  
  const works = allWorks.filter((w) => {
    if (activeTab === "completed") {
      return !w.status || w.status === "completed";
    }
    return w.status === "in_progress";
  });
  const AddButton = (
    <Link
      to={`${WorkerRoutes.WORKS}/add?status=${activeTab}`}
      className="flex items-center justify-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm w-full sm:w-auto"
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
      {activeTab === "completed" ? "إضافة عمل سابق" : "إضافة عمل حالي"}
    </Link>
  );

  return (
    <PageContainer
      title="معرض أعمالي"
      description="إدارة وعرض جميع أعمالك، سواء التي تم إنجازها أو التي قيد التنفيذ."
      actions={AddButton}
    >
      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("completed")}
          className={`py-3 px-4 font-medium text-sm transition-colors border-b-2 ${
            activeTab === "completed"
              ? "border-[#d97706] text-[#b45309]"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          الأعمال السابقة
        </button>
        <button
          onClick={() => setActiveTab("in_progress")}
          className={`py-3 px-4 font-medium text-sm transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === "in_progress"
              ? "border-[#d97706] text-[#b45309]"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          الأعمال الحالية
          {activeTab === "in_progress" && (
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
          )}
        </button>
      </div>

      {isLoading ? (
        <div className="p-8 text-center">جاري التحميل...</div>
      ) : works.length === 0 ? (
        <EmptyState
          message={
            activeTab === "completed"
              ? "لم تقم بأي أعمال حتى الآن. ابدأ بإضافة أعمالك السابقة!"
              : "لا توجد أعمال قيد التنفيذ حالياً."
          }
          icon={activeTab === "completed" ? "🏗️" : "⏳"}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work) => (
            <Link
              key={work._id}
              to={WorkerRoutes.WORK_DETAIL(work._id)}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Image Placeholder */}
              <div className="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden relative">
                {activeTab === "in_progress" && (
                  <div className="absolute top-3 left-3 z-10 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                    قيد التنفيذ
                  </div>
                )}
                {work.images && work.images.length > 0 ? (
                  <img
                    src={work.images[0]}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="text-4xl opacity-40">
                    {activeTab === "completed" ? "📸" : "🚧"}
                  </div>
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
                      {SERVICE_CATEGORY_LABELS[work.category]}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-lg ${
                        work.source === "platform"
                          ? "bg-purple-50 text-purple-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {JOB_SOURCE_LABELS[work.source]}
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
          ))}
        </div>
      )}
    </PageContainer>
  );
}
