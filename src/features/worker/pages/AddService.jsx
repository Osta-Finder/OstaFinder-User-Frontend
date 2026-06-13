/**
 * ============================================
 * ADD SERVICE PAGE
 * ============================================
 * Controlled form with proper state management
 * Ready for API integration
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WorkerRoutes } from "../constants/routes.config";
import { ServiceCategory } from "../constants/worker.constants";
import { useAddWorkerServiceMutation } from "../../../services/workerApi";

const initialFormState = {
  title: "",
  category: "",
  location: "",
  description: "",
  price: "",
};

export default function AddService() {
  const navigate = useNavigate();
  const [addService, { isLoading }] = useAddWorkerServiceMutation();
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "عنوان الخدمة مطلوب";
    if (!formData.category) newErrors.category = "يرجى اختيار التصنيف";
    if (!formData.location.trim())
      newErrors.location = "المدينة/المنطقة مطلوبة";
    if (!formData.description.trim())
      newErrors.description = "تفاصيل الخدمة مطلوبة";
    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "يرجى إدخال سعر صحيح";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Prepare data for API (price as number, category as enum)
    const payload = {
      title: formData.title.trim(),
      category: formData.category,
      location: formData.location.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
    };

    console.log("Saving service...", payload);

    try {
      await addService(payload).unwrap();
      navigate(WorkerRoutes.SERVICES);
    } catch (err) {
      console.error("Failed to save service:", err);
      alert(
        err?.data?.message ||
          err?.error ||
          "حدث خطأ أثناء إضافة الخدمة"
      );
    }
  };

  return (
    <div className="p-4 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            إضافة خدمة جديدة
          </h1>
          <p className="text-gray-500 text-sm">
            قم بتعبئة تفاصيل الخدمة التي تود إضافتها لمعرض أعمالك.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-6">
              {/* Service Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-bold text-gray-800 mb-2"
                >
                  عنوان الخدمة
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-2xl border transition-all placeholder:text-gray-400 ${errors.title ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"}`}
                  placeholder="مثال: تأسيس شبكة كهرباء شقة بالكامل"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-bold text-gray-800 mb-2"
                  >
                    التصنيف
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-2xl border transition-all text-gray-700 bg-white ${errors.category ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"}`}
                  >
                    <option value="">اختر تصنيف الخدمة</option>
                    <option value={ServiceCategory.ELECTRICITY}>كهرباء</option>
                    <option value={ServiceCategory.PLUMBING}>سباكة</option>
                    <option value={ServiceCategory.AC}>تكييف</option>
                    <option value={ServiceCategory.CLEANING}>تنظيف</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.category}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-bold text-gray-800 mb-2"
                  >
                    المدينة / المنطقة
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-2xl border transition-all placeholder:text-gray-400 ${errors.location ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"}`}
                    placeholder="مثال: الرياض, جدة"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.location}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-bold text-gray-800 mb-2"
                >
                  التفاصيل
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-2xl border transition-all placeholder:text-gray-400 resize-none ${errors.description ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"}`}
                  placeholder="اكتب وصفاً مفصلاً للخدمة، المواد المستخدمة، ومراحل العمل..."
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-bold text-gray-800 mb-2"
                >
                  السعر التقريبي
                </label>
                <div className="relative">
                  <input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pl-12 rounded-2xl border transition-all placeholder:text-gray-400 text-left ${errors.price ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"}`}
                    placeholder="0"
                    dir="ltr"
                    min="0"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                    ج.م
                  </span>
                </div>
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">{errors.price}</p>
                )}
              </div>

              {/* Media Upload - placeholder for now */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  معرض الوسائط (صور / فيديوهات)
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    اسحب وأفلت الملفات هنا
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    أو اضغط لاختيار الصور والفيديوهات من جهازك
                  </p>
                  <p className="text-xs text-gray-400">
                    الحد الأقصى 5 ميجابايت للملف الواحد. الصيغ المدعومة: JPG,
                    PNG, MP4
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="w-1/3 min-w-[150px] bg-[#b45309] text-white py-3.5 rounded-2xl font-bold hover:bg-[#92400e] transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                  />
                </svg>
                {isLoading ? "جاري الحفظ..." : "حفظ الخدمة"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
