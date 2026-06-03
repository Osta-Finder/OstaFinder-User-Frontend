import React from "react";
import {
  ChevronRight,
  User,
  MapPin,
  Clock,
  Sparkles,
  Check,
  Calendar,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import plumbingLeak from "../../../assets/images/plumbing_leak_problem.png";

export default function RequestMainContent({
  currentStep = 2,
  onStepChange = () => {},
  eta = "",
  onEtaChange = () => {},
  onStatusUpdate = () => {},
}) {
  const steps = [
    { number: 1, label: "تم القبول" },
    { number: 2, label: "في الطريق" },
    { number: 3, label: "العمل جاري" },
    { number: 4, label: "مكتمل" },
  ];

  return (
    <div className="flex-1 space-y-6" dir="rtl">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
        <button
          onClick={() =>
            toast.info("العودة إلى قائمة الطلبات...", {
              position: "top-left",
              rtl: true,
              theme: "light",
            })
          }
          className="flex items-center gap-1 hover:text-brand-orange transition-colors duration-200 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
          <span>العودة للطلبات</span>
          <span className="mx-1">/</span>
          <span className="text-gray-900 font-semibold">طلب #49281</span>
        </button>
      </div>

      {/* Request Header */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
              تسرب مياه في الحمام
            </h1>
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse"></span>
              <span>قيد التنفيذ</span>
            </span>
          </div>
          <span className="text-xs text-gray-400 font-medium">
            تم القبول: اليوم، 10:30 صباحاً
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-gray-500 pt-2 border-t border-gray-50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gray-50 rounded-lg">
              <User className="w-4 h-4 text-brand-orange" />
            </div>
            <span className="font-bold text-gray-700">أحمد محمود</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gray-50 rounded-lg">
              <MapPin className="w-4 h-4 text-brand-orange" />
            </div>
            <span className="font-medium text-gray-600">حي النرجس، الرياض</span>
          </div>
        </div>
      </div>

      {/* Stepper (مراحل الطلب) */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <h3 className="text-lg font-bold text-gray-900 mb-6">مراحل الطلب</h3>
        <div className="relative flex justify-between items-center max-w-2xl mx-auto px-4 py-3">
          {/* Progress bar line */}
          <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-gray-100 -translate-y-1/2 z-0 rounded-full"></div>
          {/* Active progress fill */}
          <div
            className="absolute top-1/2 right-0 h-[3px] bg-brand-brown -translate-y-1/2 z-0 rounded-full transition-all duration-500 ease-out"
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
                onClick={() => onStepChange(step.number)}
                className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
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
                <span
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
              </button>
            );
          })}
        </div>
      </div>

      {/* AI Smart Diagnosis (التشخيص الذكي AI) */}
      <div className="bg-gradient-to-r from-orange-50/40 via-amber-50/30 to-rose-50/20 rounded-3xl p-6 border border-brand-orange/15 shadow-[0_8px_30px_rgb(242,110,30,0.02)] relative overflow-hidden group">
        {/* Subtle decorative background lights */}
        <div className="absolute -top-12 -left-12 w-28 h-28 bg-brand-orange/10 rounded-full blur-xl pointer-events-none transition-transform duration-700 group-hover:scale-125"></div>

        <div className="flex items-start justify-between gap-4 mb-5 relative z-10">
          <div>
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span>التشخيص الذكي (AI)</span>
            </h3>
            <p className="text-gray-500 text-xs mt-0.5 font-medium">
              مبني على صورة العميل ووصفه
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-orange to-amber-400 flex items-center justify-center shadow-sm shadow-brand-orange/20 text-white animate-pulse">
            <Sparkles className="w-4.5 h-4.5" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 relative z-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-transform duration-300 hover:translate-y-[-2px]">
            <span className="text-xs font-bold text-gray-400 block mb-1.5">
              المشكلة المتوقعة
            </span>
            <p className="text-sm font-bold text-gray-800 leading-relaxed">
              كسر في الأنبوب الرئيسي تحت المغسلة
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-transform duration-300 hover:translate-y-[-2px]">
            <span className="text-xs font-bold text-gray-400 block mb-1.5">
              الأدوات المقترحة للزيارة
            </span>
            <p className="text-sm font-bold text-gray-800 leading-relaxed">
              مفتاح إنجليزي، شريط تيفلون، أنبوب مرن بديل
            </p>
          </div>
        </div>

        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/40 relative z-10">
          <div className="flex items-center justify-between text-xs font-bold text-gray-600 mb-2">
            <span>نسبة الثقة في التشخيص</span>
            <span className="text-brand-orange font-extrabold text-sm">85%</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-l from-brand-orange to-brand-brown rounded-full transition-all duration-1000 ease-out"
              style={{ width: "85%" }}
            ></div>
          </div>
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
              ملاحظة العميل:
            </span>
            <p className="text-sm font-medium text-gray-600 leading-relaxed italic">
              "الماء يسرب بشكل مستمر منذ ساعتين تحت المغسلة، أرجو الحضور بأسرع وقت."
            </p>
          </div>
        </div>
      </div>

      {/* Update Request Status (تحديث حالة الطلب) */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <h3 className="text-lg font-bold text-gray-900 mb-5">تحديث حالة الطلب</h3>

        <div className="space-y-5">
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-2">
              وقت الوصول المتوقع (ETA)
            </label>
            <div className="relative max-w-md">
              <input
                type="text"
                value={eta}
                onChange={(e) => onEtaChange(e.target.value)}
                placeholder="مثال: 30 دقيقة"
                className="w-full bg-gray-50 hover:bg-gray-100/50 focus:bg-white text-gray-800 placeholder-gray-400 font-semibold py-3 px-4 rounded-2xl border-2 border-gray-100 hover:border-gray-200 focus:border-brand-orange outline-none transition-all duration-300 pl-11"
              />
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-gray-400 font-semibold mt-2">
              سيتم إرسال إشعار للعميل بوقت وصولك.
            </p>
          </div>

          <div className="pt-4 border-t border-gray-50 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onStatusUpdate("complete")}
              className="flex-1 flex items-center justify-center gap-2 bg-brand-brown hover:bg-[#833304] active:scale-[0.98] text-white font-extrabold text-sm py-4 px-6 rounded-2xl shadow-md hover:shadow-lg shadow-brand-brown/10 hover:shadow-brand-brown/20 transition-all duration-300 cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 stroke-[3.5] text-white" />
              </div>
              <span>إتمام الخدمة</span>
            </button>

            <button
              onClick={() => onStatusUpdate("on_the_way")}
              className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border-2 border-gray-100 hover:border-gray-200 active:scale-[0.98] text-gray-700 font-extrabold text-sm py-4 px-6 rounded-2xl transition-all duration-300 cursor-pointer"
            >
              <span>تحديث الحالة إلى "في الطريق"</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
