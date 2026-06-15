import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUpdateMeMutation } from "../../../services/authApi";

const initialFormData = {
  title: "",
  address: "",
  street: "",
  city: "",
  area: "",
  buildingNumber: "",
  floor: "",
  apartment: "",
  isDefault: false,
};

const textInputClass =
  "h-12 w-full rounded-lg border border-[#f1ddd4] bg-[#fbf8fb] px-4 text-[#1f1b1d] outline-none focus:border-[#a83900]";

export default function AddAddressModal({ isOpen, onClose, user }) {
  const [updateMe, { isLoading, error }] = useUpdateMeMutation();
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialFormData);
    }
  }, [isOpen]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const currentAddresses = Array.isArray(user?.addresses)
      ? user.addresses
      : [];
    const newAddress = {
      ...formData,
      title: formData.title.trim() || "عنوان جديد",
      address: formData.address.trim(),
      street: formData.street.trim(),
      city: formData.city.trim(),
      area: formData.area.trim(),
      buildingNumber: formData.buildingNumber.trim(),
      floor: formData.floor.trim(),
      apartment: formData.apartment.trim(),
    };

    const addresses = [
      ...currentAddresses.map((address) => ({
        ...address,
        isDefault: newAddress.isDefault ? false : Boolean(address?.isDefault),
      })),
      newAddress,
    ];

    try {
      await updateMe({ addresses }).unwrap();
      toast.success("تم إضافة العنوان بنجاح");
      onClose();
    } catch (err) {
      console.log(err);
      toast.error("فشل في إضافة العنوان");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/35" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center overflow-y-auto p-4">
        <DialogPanel className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
          <div className="mb-6 flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-[#2a160f]">
              إضافة عنوان جديد
            </DialogTitle>
            <button
              type="button"
              onClick={onClose}
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full text-[#4a2a1d] hover:bg-[#fff3eb]"
              aria-label="إغلاق"
            >
              <X size={22} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" dir="rtl">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#4a2a1d]">
                  اسم العنوان
                </span>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={textInputClass}
                  placeholder="المنزل"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#4a2a1d]">
                  المدينة
                </span>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={textInputClass}
                  placeholder="القاهرة"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#4a2a1d]">
                  المنطقة
                </span>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className={textInputClass}
                  placeholder="مدينة نصر"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#4a2a1d]">
                  الشارع
                </span>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className={textInputClass}
                  placeholder="شارع عباس العقاد"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#4a2a1d]">
                  رقم المبنى
                </span>
                <input
                  type="text"
                  name="buildingNumber"
                  value={formData.buildingNumber}
                  onChange={handleChange}
                  className={textInputClass}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#4a2a1d]">
                  الدور
                </span>
                <input
                  type="text"
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  className={textInputClass}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#4a2a1d]">
                  الشقة
                </span>
                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  className={textInputClass}
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[#4a2a1d]">
                العنوان التفصيلي
              </span>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="min-h-24 w-full resize-none rounded-lg border border-[#f1ddd4] bg-[#fbf8fb] px-4 py-3 text-[#1f1b1d] outline-none focus:border-[#a83900]"
                placeholder="اكتب أقرب علامة مميزة أو وصف تفصيلي للعنوان"
                required
              />
            </label>

            <label className="flex items-center justify-end gap-3 text-sm font-medium text-[#4a2a1d]">
              تعيين كعنوان رئيسي
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
                className="h-5 w-5 accent-[#ff7417]"
              />
            </label>

            {error ? (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                حدث خطأ أثناء حفظ العنوان
              </p>
            ) : null}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="h-12 flex-1 cursor-pointer rounded-lg bg-[#ff7417] px-5 text-lg font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? "جاري الحفظ..." : "حفظ العنوان"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="h-12 cursor-pointer rounded-lg border border-b-red-500 px-6 text-lg font-medium text-[#4a2a1d] hover:bg-red-500 hover:text-white"
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
