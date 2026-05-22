export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = "تأكيد", cancelText = "إلغاء", variant = "danger" }) {
  if (!isOpen) return null;

  const confirmStyles = {
    danger: "bg-red-600 hover:bg-red-700 text-white",
    primary: "bg-[#b45309] hover:bg-[#92400e] text-white",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="rtl">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 max-w-md w-full p-6 animate-in fade-in zoom-in">
        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>

        <h3 className="text-lg font-bold text-gray-900 text-center mb-2">{title}</h3>
        <p className="text-sm text-gray-500 text-center mb-6">{message}</p>

        <div className="flex items-center gap-3">
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${confirmStyles[variant]}`}
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
