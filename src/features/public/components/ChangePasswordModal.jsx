import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X, Loader2, Lock, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InputField from "../../auth/components/InputField";
import { useChangePasswordMutation } from "../../../services/authApi";
import {
  validatePassword,
  validateConfirmPassword,
} from "../../../validations/common.schema";

export default function ChangePasswordModal({ isOpen, onClose }) {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showConfirmPrompt, setShowConfirmPrompt] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setErrors({});
      setShowConfirmPrompt(false);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePreSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "كلمة المرور الحالية مطلوبة";
    }

    const newPassErr = validatePassword(formData.newPassword);
    if (newPassErr) {
      newErrors.newPassword = newPassErr;
    } else if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword =
        "كلمة المرور الجديدة يجب أن تكون مختلفة عن كلمة المرور الحالية";
    }

    const confirmPassErr = validateConfirmPassword(
      formData.newPassword,
      formData.confirmPassword,
    );
    if (confirmPassErr) {
      newErrors.confirmPassword = confirmPassErr;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setShowConfirmPrompt(true);
  };

  const handleConfirmedSubmit = async () => {
    try {
      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      }).unwrap();

      toast.success("تم تغيير كلمة المرور بنجاح");
      setShowConfirmPrompt(false);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "حدث خطأ أثناء تغيير كلمة المرور");
      setShowConfirmPrompt(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-6 shadow-2xl transition-all border border-[#f1ddd4] text-right">
          {/* Header */}
          <div className="mb-5 flex items-center justify-between flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="grid cursor-pointer h-10 w-10 place-items-center rounded-full text-[#4a2a1d] hover:bg-[#fff3eb] transition-colors"
              aria-label="إغلاق"
              disabled={isLoading}
            >
              <X size={22} />
            </button>
            <DialogTitle className="text-xl font-bold text-[#2a160f]">
              {showConfirmPrompt
                ? "تأكيد تغيير كلمة المرور"
                : "تغيير كلمة المرور"}
            </DialogTitle>
          </div>

          {showConfirmPrompt ? (
            /* Confirmation Step */
            <div className="space-y-6">
              <div className="flex flex-col items-center text-center space-y-4 p-4 bg-orange-50/50 rounded-2xl border border-orange-100">
                <div className="p-3 rounded-full bg-[#ffe0ce] text-[#ff7417]">
                  <ShieldAlert size={36} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-[#2a160f]">
                    هل أنت متأكد من تغيير كلمة المرور؟
                  </h3>
                  <p className="text-sm text-[#7a5a4d]">
                    سيتم حفظ كلمة المرور الجديدة وتحديث جلسة تسجيل الدخول الخاصة
                    بك.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleConfirmedSubmit}
                  disabled={isLoading}
                  className="h-12 flex-1 cursor-pointer rounded-xl bg-[#ff7417] px-5 text-lg font-semibold text-white transition-all hover:bg-[#ff7417]/95 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>جاري التغيير...</span>
                    </>
                  ) : (
                    <span>نعم، قم بالتغيير</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirmPrompt(false)}
                  disabled={isLoading}
                  className="h-12 cursor-pointer rounded-xl border border-[#f1ddd4] hover:bg-[#fff3eb] px-6 text-lg font-medium text-[#4a2a1d] transition-all"
                >
                  تراجع
                </button>
              </div>
            </div>
          ) : (
            /* Form Input Step */
            <form onSubmit={handlePreSubmit} className="space-y-5">
              <InputField
                label="كلمة المرور الحالية"
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="أدخل كلمة المرور الحالية"
                error={errors.currentPassword}
                icon="lock"
              />

              <InputField
                label="كلمة المرور الجديدة"
                id="newPassword"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="أدخل كلمة المرور الجديدة"
                error={errors.newPassword}
                icon="lock"
              />

              <InputField
                label="تأكيد كلمة المرور الجديدة"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="تأكيد كلمة المرور الجديدة"
                error={errors.confirmPassword}
                icon="lock"
              />

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#f1ddd4]">
                <button
                  type="submit"
                  className="h-12 flex-1 cursor-pointer rounded-xl bg-[#ff7417] px-5 text-lg font-semibold text-white transition-all hover:bg-[#ff7417]/95 flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>تغيير كلمة المرور</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="h-12 cursor-pointer rounded-xl border border-[#f1ddd4] hover:bg-[#fff3eb] px-6 text-lg font-medium text-[#4a2a1d] transition-all"
                >
                  إلغاء
                </button>
              </div>
            </form>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
