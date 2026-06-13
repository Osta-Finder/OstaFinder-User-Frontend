import { useParams, Link, useNavigate } from "react-router-dom";
import { WorkerRoutes } from "../constants/routes.config";
import StatusBadge from "../components/StatusBadge";
import { formatPrice } from "../data/mockData";
import {
  useGetWorkerServiceByIdQuery,
  useUpdateWorkerServiceMutation,
  useDeleteWorkerServiceMutation,
} from "../../../services/workerApi";

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

export default function Service() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: response, isLoading } = useGetWorkerServiceByIdQuery(id);
  const [updateService, { isLoading: isUpdating }] = useUpdateWorkerServiceMutation();
  const [deleteService, { isLoading: isDeleting }] = useDeleteWorkerServiceMutation();

  const service = response?.data;

  const handleToggleStatus = async () => {
    if (!service) return;
    const newStatus = service.status === "active" ? "paused" : "active";
    try {
      await updateService({ id, status: newStatus }).unwrap();
    } catch (err) {
      console.error("Failed to toggle status:", err);
      alert("تعذر تعديل حالة الخدمة.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("هل أنت متأكد من رغبتك في حذف هذه الخدمة؟")) return;
    try {
      await deleteService(id).unwrap();
      navigate(WorkerRoutes.SERVICES);
    } catch (err) {
      console.error("Failed to delete service:", err);
      alert("تعذر حذف الخدمة.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 font-sans flex justify-center items-center" dir="rtl">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 font-sans text-center text-gray-500" dir="rtl">
        الخدمة غير موجودة.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 font-sans" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            to={WorkerRoutes.SERVICES}
            className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-2 w-fit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            العودة للخدمات
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-4 mb-8">
            {service.image ? (
              <img
                src={service.image}
                alt={service.title}
                className="w-16 h-16 rounded-2xl object-cover shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 shrink-0 text-3xl">
                🔧
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {service.title}
              </h1>
              <p className="text-gray-500 mt-1">
                عرض حالة الطلب ومتابعة التحديثات
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">الموقع</p>
              <p className="font-medium text-gray-800">{service.location}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">تاريخ ووقت التنفيذ</p>
              <p className="font-medium text-gray-800">{formatDate(service.createdAt)}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">التكلفة المتوقعة</p>
              <p className="font-bold text-gray-900">
                {formatPrice(service.price)}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">الحالة</p>
              <StatusBadge status={service.status} />
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">الوصف</h3>
            <p className="text-gray-600 leading-relaxed">
              {service.description}
            </p>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={handleToggleStatus}
              disabled={isUpdating}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50"
            >
              {service.status === "active" ? "تجميد الخدمة" : "تنشيط الخدمة"}
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-50 hover:bg-red-100 text-red-600 px-6 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50"
            >
              حذف الخدمة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
