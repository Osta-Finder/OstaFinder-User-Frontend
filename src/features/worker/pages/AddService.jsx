import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WorkerRoutes } from "../constants/routes.config";
import {
  useAddWorkerServiceMutation,
  useUploadImageMutation,
  useGetWorkerProfileQuery,
} from "../../../services/workerApi";

const initialFormState = {
  title: "",
  location: "",
  description: "",
  price: "",
  image: "",
};

export default function AddService() {
  const navigate = useNavigate();
  const [addService, { isLoading }] = useAddWorkerServiceMutation();
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [uploadedImage, setUploadedImage] = useState("");

  const { data: worker } = useGetWorkerProfileQuery();
  const [addService, { isLoading: isSaving }] = useAddWorkerServiceMutation();
  const [uploadImage, { isLoading: isUploadingImage }] = useUploadImageMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileData = new FormData();
    fileData.append("file", file);
    fileData.append("bucket", "services");

    try {
      const response = await uploadImage(fileData).unwrap();
      if (response.success && response.data?.url) {
        setUploadedImage(response.data.url);
        setFormData((prev) => ({ ...prev, image: response.data.url }));
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("فشل رفع الصورة. يرجى المحاولة مرة أخرى.");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "عنوان الخدمة مطلوب";
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

    const categoryName =
      worker?.data?.category?.name ||
      worker?.data?.category ||
      worker?.category?.name ||
      worker?.category ||
      "";

    const payload = {
      title: formData.title.trim(),
      category: categoryName,
      location: formData.location.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      image: formData.image || null,
    };

    try {
      await addService(payload).unwrap();
      navigate(WorkerRoutes.SERVICES);
    } catch (err) {
      console.error("Failed to add service:", err);
      alert("تعذر حفظ الخدمة.");
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
                  <div className="px-4 py-3 rounded-2xl border bg-gray-100 text-gray-700">
                    {worker?.data?.category?.name ||
                      worker?.data?.category ||
                      worker?.category?.name ||
                      worker?.category ||
                      "جاري التحميل..."}
                  </div>
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
                    placeholder="مثال: العريش , شمال سيناء"
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

              {/* Media Upload */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  صورة الخدمة
                </label>
                {uploadedImage ? (
                  <div className="relative rounded-3xl overflow-hidden border border-gray-100 shadow-sm max-w-md">
                    <img
                      src={uploadedImage}
                      alt="Service Preview"
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setUploadedImage("");
                        setFormData((prev) => ({ ...prev, image: "" }));
                      }}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-md transition-colors"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      disabled={isUploadingImage}
                    />
                    <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {isUploadingImage ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-600"></div>
                      ) : (
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
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {isUploadingImage ? "جاري رفع الصورة..." : "اضغط لاختيار صورة للخدمة"}
                    </h3>
                    <p className="text-xs text-gray-400">
                      الحد الأقصى 5 ميجابايت. الصيغ المدعومة: JPG, PNG
                    </p>
                  </label>
                )}
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={isSaving}
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
                {isSaving ? "جاري الحفظ..." : "حفظ الخدمة"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
