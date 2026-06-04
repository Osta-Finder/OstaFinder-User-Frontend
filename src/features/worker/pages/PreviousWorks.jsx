/**
 * ============================================
 * PREVIOUS WORKS PAGE
 * ============================================
 * Displays portfolio of completed works
 * Includes both platform jobs and external jobs
 */

import { Link } from "react-router-dom";
import { mockWorks } from "../data/mockData";
import { WorkerRoutes } from "../constants/routes.config";
import {
  JOB_SOURCE_LABELS,
  SERVICE_CATEGORY_LABELS,
} from "../constants/worker.constants";
import PageContainer from "../components/PageContainer";
import EmptyState from "../components/EmptyState";

export default function PreviousWorks() {
  const AddButton = (
    <Link
      to={`${WorkerRoutes.WORKS}/add`}
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
      إضافة عمل جديد
    </Link>
  );

  return (
    <PageContainer
      title="معرض أعمالي السابقة"
      description="عرض جميع الأعمال التي قمت بها سواء من المنصة أو خارجها."
      actions={AddButton}
    >
      {mockWorks.length === 0 ? (
        <EmptyState
          message="لم تقم بأي أعمال حتى الآن. ابدأ بإضافة أعمالك السابقة!"
          icon="🏗️"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockWorks.map((work) => (
            <Link
              key={work.id}
              to={WorkerRoutes.WORK_DETAIL(work.id)}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
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
