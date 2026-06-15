import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUpdateMeMutation } from "../../../services/authApi";

export default function PersonalInformationModal({ isOpen, onClose, user }) {
  const [updateMe, { isLoading, error }] = useUpdateMeMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || user?.phone || "",
    });
  }, [isOpen, user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateMe(formData).unwrap();
      toast.success("تم تحديث المعلومات الشخصية بنجاح");
      onClose();
    } catch (err) {
      console.log(err);
      toast.error("فشل في تحديث المعلومات الشخصية");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/35" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
          <div className="mb-6 flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-[#2a160f]">
              تعديل المعلومات الشخصية
            </DialogTitle>
            <button
              type="button"
              onClick={onClose}
              className="grid cursor-pointer h-10 w-10 place-items-center rounded-full text-[#4a2a1d] hover:bg-[#fff3eb]"
              aria-label="إغلاق"
            >
              <X size={22} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[#4a2a1d]">
                الاسم الكامل
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border border-[#f1ddd4] bg-[#fbf8fb] px-4 text-[#1f1b1d] outline-none focus:border-[#a83900]"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[#4a2a1d]">
                البريد الإلكتروني
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border border-[#f1ddd4] bg-[#fbf8fb] px-4 text-left text-[#1f1b1d] outline-none focus:border-[#a83900]"
                dir="ltr"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[#4a2a1d]">
                رقم الهاتف
              </span>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border border-[#f1ddd4] bg-[#fbf8fb] px-4 text-left text-[#1f1b1d] outline-none focus:border-[#a83900]"
                dir="ltr"
                required
              />
            </label>

            {error && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                حدث خطأ أثناء تحديث البيانات
              </p>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="h-12 flex-1 cursor-pointer rounded-lg bg-[#ff7417] px-5 text-lg font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? "جاري الحفظ..." : "حفظ التعديلات"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="h-12 cursor-pointer rounded-lg border border-b-red-500 hover:bg-red-500 hover:text-white px-6 text-lg font-medium text-[#4a2a1d]"
              >
                إلغاء
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
