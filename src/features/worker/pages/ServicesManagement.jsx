/**
 * ============================================
 * SERVICES MANAGEMENT PAGE
 * ============================================
 */

import { Link } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";
import PageContainer from "../components/PageContainer";
import SectionHeader from "../components/SectionHeader";
import EmptyState from "../components/EmptyState";
import { WorkerRoutes } from "../constants/routes.config";
import { useGetWorkerServicesQuery } from "../../../services/workerApi";

export default function ServicesManagement() {
  const { data, isLoading } = useGetWorkerServicesQuery();
  const services = data?.data || [];
  const AddButton = (
    <Link
      to={WorkerRoutes.SERVICE_ADD}
      className="flex items-center justify-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm w-full sm:w-auto"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
      </svg>
      إضافة خدمة جديدة
    </Link>
  );

  return (
    <PageContainer
      title="إدارة الخدمات"
      description="نظرة عامة على خدماتك السابقة ويمكنك إضافة خدمات جديدة."
      actions={AddButton}
    >
      {/* Worker Services List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <SectionHeader title="خدماتي المعروضة" />

        <div className="p-6 flex flex-col gap-4">
          {isLoading ? (
            <div className="p-8 text-center">جاري التحميل...</div>
          ) : services.length > 0 ? (
            services.map((service) => (
              <ServiceCard key={service._id} service={{ ...service, id: service._id }} />
            ))
          ) : (
            <EmptyState message="لا توجد خدمات حتى الآن." icon="💼" />
          )}
        </div>
      </div>
    </PageContainer>
  );
}