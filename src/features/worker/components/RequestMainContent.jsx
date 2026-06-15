import { AlertCircle, Check, ChevronRight, MapPin, User } from "lucide-react";
import { toast } from "react-toastify";
import plumbingLeak from "../../../assets/images/plumbing_leak_problem.png";
import { useNavigate } from "react-router-dom";

export default function RequestMainContent({
  requestData,
  currentStep = 1,
  onStepChange = () => {},
  onStatusUpdate = () => {},
  isUpdating = false,
}) {
  const steps = [
    { number: 1, label: "تم القبول", status: "accepted" },
    { number: 2, label: "العمل جاري", status: "in_progress" },
    { number: 3, label: "مكتمل", status: "completed" },
  ];
  const navigate = useNavigate();
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("ar-EG", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="flex-1 space-y-6" dir="rtl">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
        <button
          onClick={() =>
            navigate("/worker/requests") ||
            toast.info("العودة إلى قائمة الطلبات...", {
              position: "top-right",
              rtl: true,
              theme: "light",
            })
          }
          className="flex items-center gap-1 hover:text-brand-orange transition-colors duration-200 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
          <span>العودة للطلبات</span>
          <span className="mx-1">/</span>
          <span className="text-gray-900 font-semibold">
            طلب #{requestData?.requestNumber || 49281}
          </span>
        </button>
      </div>

      {/* Request Header */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
              {requestData?.service || "غير محدد"}
            </h1>
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse"></span>
              <span>
                {currentStep === 1 && requestData?.status === "معلقة"
                  ? "معلقة"
                  : steps[currentStep - 1]?.label || "قيد التنفيذ"}
              </span>
            </span>
          </div>
          <span className="text-xs text-gray-400 font-medium">
            {requestData?.date
              ? `تاريخ الطلب: ${formatDate(requestData.date)}`
              : "تم القبول: اليوم، 10:30 صباحاً"}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-gray-500 pt-2 border-t border-gray-50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gray-50 rounded-lg">
              <User className="w-4 h-4 text-brand-orange" />
            </div>
            <span className="font-bold text-gray-700">
              {requestData?.user?.name || "أحمد محمود"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gray-50 rounded-lg">
              <MapPin className="w-4 h-4 text-brand-orange" />
            </div>
            <span className="font-medium text-gray-600">
              {requestData?.address || "حي النرجس، الرياض"}
            </span>
          </div>
        </div>
      </div>

      {/* Stepper (مراحل الطلب) */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <h3 className="text-lg font-bold text-gray-900 mb-6">مراحل الطلب</h3>
        <div className="relative flex justify-between items-center max-w-2xl mx-auto py-3">
          {/* Progress bar line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.75 bg-gray-100 -translate-y-1/2 z-0 rounded-full"></div>
          {/* Active progress fill */}
          <div
            className="absolute top-1/2 right-0 h-0.75 bg-brand-brown -translate-y-1/2 z-0 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          ></div>

          {steps.map((step) => {
            const isCompleted = step.number < currentStep;
            const isActive = step.number === currentStep;
            return (
              <button
                key={step.number}
                // onClick={() => onStepChange(step.number)}
                // onClick={() => onStatusUpdate(step.status)}
                className="relative z-10 flex flex-col items-center group focus:outline-none"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                    isCompleted
                      ? "bg-brand-brown text-white shadow-md shadow-brand-brown/10 ring-4 ring-white"
                      : isActive
                        ? "bg-brand-orange text-white shadow-md shadow-brand-orange/20 ring-4 ring-brand-orange/15 scale-110"
                        : "bg-white border-2 border-gray-200 text-gray-400 hover:border-gray-300 ring-4 ring-white"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4.5 h-4.5 stroke-[3]" />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        <div className="relative flex justify-between items-center max-w-2xl mx-auto py-3">
          {steps.map((step) => {
            const isCompleted = step.number < currentStep;
            const isActive = step.number === currentStep;
            return (
              <span
                key={step.number}
                className={`mt-3 text-xs font-bold transition-colors duration-300 ${
                  isActive
                    ? "text-brand-orange font-extrabold"
                    : isCompleted || step.number <= currentStep
                      ? "text-gray-800"
                      : "text-gray-400 font-medium"
                }`}
              >
                {step.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Problem Image & Note */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          صورة المشكلة المرفقة
        </h3>

        <div className="relative rounded-2xl overflow-hidden border border-gray-100 aspect-video max-h-96 group shadow-inner">
          <img
            src={plumbingLeak}
            alt="صورة المشكلة المرفقة"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-100/60 flex gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mt-0.5">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-700 block mb-1">
              وصف العميل:
            </span>
            <p className="text-sm font-medium text-gray-600 leading-relaxed italic">
              {requestData?.description || "العميل لم يترك وصفًا للمشكلة."}
            </p>
          </div>
        </div>
      </div>

      {/* Update Request Status (تحديث حالة الطلب) */}
      {currentStep < 3 && (
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <h3 className="text-lg font-bold text-gray-900 mb-5">
            تحديث حالة الطلب
          </h3>

          <div className="space-y-5">
            <div className="pt-4 border-t border-gray-50 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onStatusUpdate("completed")}
                disabled={isUpdating}
                className="flex-1 flex items-center justify-center gap-2 bg-brand-brown hover:bg-[#833304] active:scale-[0.98] text-white font-extrabold text-sm py-4 px-6 rounded-2xl shadow-md hover:shadow-lg shadow-brand-brown/10 hover:shadow-brand-brown/20 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[3.5] text-white" />
                  </div>
                )}
                <span>إتمام الخدمة</span>
              </button>

              {currentStep === 1 && (
                <button
                  onClick={() => onStatusUpdate("in_progress")}
                  disabled={isUpdating}
                  className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border-2 border-gray-100 hover:border-gray-200 active:scale-[0.98] text-gray-700 font-extrabold text-sm py-4 px-6 rounded-2xl transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUpdating ? (
                    <div className="w-5 h-5 border-2 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
                  ) : null}
                  <span>بدء العمل</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
