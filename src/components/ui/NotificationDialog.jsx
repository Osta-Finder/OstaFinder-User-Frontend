import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { motion } from "motion/react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

const ICONS = {
  success: { icon: CheckCircle, bg: "#f0fdf4", color: "#22c55e" },
  error: { icon: XCircle, bg: "#fef2f2", color: "#ef4444" },
  warning: { icon: AlertTriangle, bg: "#fffbeb", color: "#f59e0b" },
  info: { icon: Info, bg: "#eff6ff", color: "#3b82f6" },
};

export default function NotificationDialog({ open, onClose, title, message, type = "info" }) {
  const config = ICONS[type] || ICONS.info;
  const Icon = config.icon;

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
          className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ background: config.bg }}
              >
                <Icon className="h-5 w-5" style={{ color: config.color }} />
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

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="rounded-lg px-6 py-2 text-sm font-medium text-white transition-colors"
              style={{ background: config.color }}
            >
              موافق
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
