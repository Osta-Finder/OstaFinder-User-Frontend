import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { motion } from "motion/react";
import { X, MapPin, Calendar, Check } from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";
import { STEPS } from "../constants/orderConstants";

export default function OrderDetailModal({ order, onClose }) {
  if (!order) return null;
  return (
    <Dialog open={!!order} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          as={motion.div}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-[600px] rounded-xl bg-white p-6 shadow-2xl"
        >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-gray-900">طلب #{order.id}</h3>
            <OrderStatusBadge status={order.status} />
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="mb-1 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
              الخدمة
            </h4>
            <p className="font-semibold text-gray-900">{order.service}</p>
            <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
              {order.description}
            </p>
          </div>

          <hr className="border-gray-100" />

          <div className="flex items-center gap-3">
            <img
              src={order.avatar}
              alt={order.worker}
              className="h-10 w-10 rounded-full bg-gray-100"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">الصنايعي</p>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {order.worker}
              </p>
            </div>
          </div>

          <hr className="border-gray-100" />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "var(--primary-color)" }} />
              <div>
                <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>الموقع</p>
                <p className="text-sm text-gray-900">{order.location}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Calendar className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "var(--primary-color)" }} />
              <div>
                <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>التاريخ والوقت</p>
                <p className="text-sm text-gray-900">{order.date} - {order.time}</p>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          <div>
            <h4 className="mb-3 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>التكلفة</h4>
            <div className="space-y-2 rounded-lg bg-gray-50 p-4">
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--text-secondary)" }}>تكلفة الخدمة</span>
                <span className="font-medium text-gray-900">{order.amount} ج.م</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--text-secondary)" }}>عمولة المنصة</span>
                <span className="font-medium text-gray-900">{order.platformFee} ج.م</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-gray-900">الإجمالي</span>
                <span className="font-bold" style={{ color: "var(--primary-color)" }}>
                  {order.total} ج.م
                </span>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          <div>
            <h4 className="mb-4 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>تتبع الطلب</h4>
            <div className="relative">
              <div className="absolute left-0 right-0 top-4 h-0.5 bg-gray-200" />
              <div className="relative flex justify-between">
                {STEPS.map((step) => {
                  const isCurrent = order.currentStep === step.key;
                  const isPast = order.currentStep > step.key;
                  const isRejected = order.status === "rejected" && step.key === 1;
                  return (
                    <div key={step.key} className="flex flex-col items-center">
                      <div
                        className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all"
                        style={{
                          background: isRejected ? "#ef4444" : isPast ? "#22c55e" : isCurrent ? "var(--primary-color)" : "#e5e7eb",
                          color: isPast || isCurrent || isRejected ? "#fff" : "#9ca3af",
                        }}
                      >
                        {isRejected ? <X className="h-4 w-4" /> : isPast ? <Check className="h-4 w-4" /> : step.key}
                      </div>
                      <p
                        className="mt-2 text-xs font-medium"
                        style={{
                          color: isRejected ? "#ef4444" : isCurrent ? "var(--primary-color)" : isPast ? "#22c55e" : "#9ca3af",
                        }}
                      >
                        {isRejected ? "تم الرفض" : step.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
