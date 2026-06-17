import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useUpdateMeMutation,
  useUpdateAddressMutation,
} from "../../../services/authApi";
import { validateField } from "../../../validations/common.schema";

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

const getTextInputClass = (hasError) =>
  `h-12 w-full rounded-lg border bg-[#fbf8fb] px-4 text-[#1f1b1d] outline-none transition-all ${
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
      : "border-[#f1ddd4] focus:border-[#a83900]"
  }`;

const getTextareaClass = (hasError) =>
  `min-h-24 w-full resize-none rounded-lg border bg-[#fbf8fb] px-4 py-3 text-[#1f1b1d] outline-none transition-all ${
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
      : "border-[#f1ddd4] focus:border-[#a83900]"
  }`;

export default function AddAddressModal({
  isOpen,
  onClose,
  user,
  addressToEdit,
}) {
  const [updateMe, { isLoading, error }] = useUpdateMeMutation();
  const [
    updateAddress,
    { isLoading: isUpdatingAddress, error: updateAddressError },
  ] = useUpdateAddressMutation();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (addressToEdit) {
        setFormData({
          title: addressToEdit.title || "",
          address: addressToEdit.address || "",
          street: addressToEdit.street || "",
          city: addressToEdit.city || "",
          area: addressToEdit.area || "",
          buildingNumber: addressToEdit.buildingNumber || "",
          floor: addressToEdit.floor || "",
          apartment: addressToEdit.apartment || "",
          isDefault: addressToEdit.isDefault || false,
        });
      } else {
        setFormData(initialFormData);
      }
      setErrors({});
      setTouched({});
    }
  }, [isOpen, addressToEdit]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((current) => ({
      ...current,
      [name]: fieldValue,
    }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, fieldValue),
      }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {};
    const touchedFields = {};

    Object.keys(initialFormData).forEach((key) => {
      if (key === "isDefault") return;
      touchedFields[key] = true;
      const errorMsg = validateField(key, formData[key]);
      if (errorMsg) {
        validationErrors[key] = errorMsg;
      }
    });

    setTouched(touchedFields);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("يرجى تصحيح الأخطاء في النموذج");
      return;
    }

    const addressData = {
      title: formData.title.trim() || "عنوان جديد",
      address: formData.address.trim(),
      street: formData.street.trim(),
      city: formData.city.trim(),
      area: formData.area.trim(),
      buildingNumber: formData.buildingNumber.trim(),
      floor: formData.floor.trim(),
      apartment: formData.apartment.trim(),
      isDefault: formData.isDefault,
    };

    try {
      if (addressToEdit) {
        await updateAddress({
          addressId: addressToEdit._id,
          data: addressData,
        }).unwrap();
        toast.success("تم تعديل العنوان بنجاح");
      } else {
        const currentAddresses = Array.isArray(user?.addresses)
          ? user.addresses
          : [];
        const addresses = [
          ...currentAddresses.map((address) => ({
            ...address,
            isDefault: addressData.isDefault
              ? false
              : Boolean(address?.isDefault),
          })),
          addressData,
        ];
        await updateMe({ addresses }).unwrap();
        toast.success("تم إضافة العنوان بنجاح");
      }
      onClose();
    } catch (err) {
      console.log(err);
      toast.error(
        addressToEdit ? "فشل في تعديل العنوان" : "فشل في إضافة العنوان",
      );
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/35" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center overflow-y-auto p-4">
        <DialogPanel className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
          <div className="mb-6 flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-[#2a160f]">
              {addressToEdit ? "تعديل العنوان" : "إضافة عنوان جديد"}
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
              <label className="block text-right">
                <span className="mb-2 block text-sm font-medium text-[#4a2a1d]">
                  اسم العنوان
                </span>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getTextInputClass(touched.title && errors.title)}
                  placeholder="المنزل"
                />
                {touched.title && errors.title && (
                  <p className="mt-1 text-xs text-red-500">{errors.title}</p>
                )}
              </label>

              <label className="block text-right">
                <span className="mb-2 block text-sm font-medium text-[#4a2a1d]">
                  المدينة <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getTextInputClass(touched.city && errors.city)}
                  placeholder="القاهرة"
                />
                {touched.city && errors.city && (
                  <p className="mt-1 text-xs text-red-500">{errors.city}</p>
                )}
              </label>

              <label className="block text-right">
                <span className="mb-2 block text-sm font-medium text-[#4a2a1d]">
                  المنطقة <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getTextInputClass(touched.area && errors.area)}
                  placeholder="مدينة نصر"
                />
                {touched.area && errors.area && (
                  <p className="mt-1 text-xs text-red-500">{errors.area}</p>
                )}
              </label>

              <label className="block text-right">
                <span className="mb-2 block text-sm font-medium text-[#4a2a1d]">
                  الشارع <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getTextInputClass(touched.street && errors.street)}
                  placeholder="شارع عباس العقاد"
                />
                {touched.street && errors.street && (
                  <p className="mt-1 text-xs text-red-500">{errors.street}</p>
                )}
              </label>

              <label className="block text-right">
                <span className="mb-2 block text-sm font-medium text-[#4a2a1d]">
                  رقم المبنى <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  name="buildingNumber"
                  value={formData.buildingNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getTextInputClass(
                    touched.buildingNumber && errors.buildingNumber,
                  )}
                />
                {touched.buildingNumber && errors.buildingNumber && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.buildingNumber}
                  </p>
                )}
              </label>

              <label className="block text-right">
                <span className="mb-2 block text-sm font-medium text-[#4a2a1d]">
                  الدور
                </span>
                <input
                  type="text"
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getTextInputClass(touched.floor && errors.floor)}
                />
                {touched.floor && errors.floor && (
                  <p className="mt-1 text-xs text-red-500">{errors.floor}</p>
                )}
              </label>

              <label className="block text-right">
                <span className="mb-2 block text-sm font-medium text-[#4a2a1d]">
                  الشقة
                </span>
                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getTextInputClass(
                    touched.apartment && errors.apartment,
                  )}
                />
                {touched.apartment && errors.apartment && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.apartment}
                  </p>
                )}
              </label>
            </div>

            <label className="block text-right">
              <span className="mb-2 block text-sm font-medium text-[#4a2a1d]">
                العنوان التفصيلي <span className="text-red-500">*</span>
              </span>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getTextareaClass(touched.address && errors.address)}
                placeholder="اكتب أقرب علامة مميزة أو وصف تفصيلي للعنوان"
              />
              {touched.address && errors.address && (
                <p className="mt-1 text-xs text-red-500">{errors.address}</p>
              )}
            </label>

            <label className="flex items-center justify-start gap-3 text-sm font-medium text-[#4a2a1d]">
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
                className="h-5 w-5 accent-[#ff7417]"
              />
              تعيين كعنوان رئيسي
            </label>

            {error || updateAddressError ? (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 text-right">
                حدث خطأ أثناء حفظ العنوان
              </p>
            ) : null}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isLoading || isUpdatingAddress}
                className="h-12 flex-1 cursor-pointer rounded-lg bg-[#ff7417] px-5 text-lg font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading || isUpdatingAddress
                  ? "جاري الحفظ..."
                  : addressToEdit
                    ? "حفظ التعديلات"
                    : "حفظ العنوان"}
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
