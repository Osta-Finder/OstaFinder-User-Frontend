import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { motion } from "motion/react";
import { AlertTriangle, X } from "lucide-react";

export default function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmText = "تأكيد", cancelText = "إلغاء", variant = "danger" }) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
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
          className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{
                  background: variant === "danger" ? "#fef2f2" : "#eff6ff",
                }}
              >
                <AlertTriangle
                  className="h-5 w-5"
                  style={{ color: variant === "danger" ? "#ef4444" : "#3b82f6" }}
                />
              </div>
              <DialogTitle className="text-lg font-bold text-gray-900">
                {title}
              </DialogTitle>
            </div>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className="mb-6 text-sm" style={{ color: "var(--text-secondary)" }}>
            {message}
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
              style={{
                background: variant === "danger" ? "#ef4444" : "var(--primary-color)",
              }}
            >
              {confirmText}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
