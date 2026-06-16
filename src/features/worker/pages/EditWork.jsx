import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WorkerRoutes } from "../constants/routes.config";
import {
  useUpdateWorkerWorkMutation,
  useGetWorkerWorkByIdQuery,
  useGetWorkerProfileQuery,
  useUploadImageMutation,
} from "../../../services/workerApi";

export default function EditWork() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: workData, isLoading: isFetching } =
    useGetWorkerWorkByIdQuery(id);
  const { data: worker } = useGetWorkerProfileQuery();
  const [updateWork, { isLoading: isUpdating }] = useUpdateWorkerWorkMutation();
  const [uploadImage, { isLoading: isUploadingImage }] = useUploadImageMutation();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
    price: "",
    clientName: "",
    date: "",
    source: "outside",
    status: "completed",
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (workData?.data) {
      const work = workData.data;
      setFormData({
        title: work.title || "",
        category: work.category || "",
        location: work.location || "",
        description: work.description || "",
        price: work.price || "",
        clientName: work.clientName || "",
        date: work.date ? new Date(work.date).toISOString().split("T")[0] : "",
        source: work.source || "outside",
        status: work.status || "completed",
      });
      setUploadedImages(work.images || []);
    }
  }, [workData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        setUploadedImages((prev) => [...prev, response.data.url]);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("فشل رفع الصورة. يرجى المحاولة مرة أخرى.");
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setUploadedImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const validateForm = () => {
    const newErrors = {};
    const textOnlyRegex = /^[a-zA-Z\u0600-\u06FF\s]+$/;
    const titleRegex = /^[a-zA-Z\u0600-\u06FF0-9\s,\.\-\(\)\/]+$/;
    const letterRegex = /[a-zA-Z\u0600-\u06FF]/;

    // Title
    if (!formData.title.trim()) {
      newErrors.title = "عنوان العمل مطلوب";
    } else if (formData.title.trim().length < 5) {
      newErrors.title = "عنوان العمل يجب أن يكون 5 أحرف على الأقل";
    } else if (formData.title.trim().length > 100) {
      newErrors.title = "عنوان العمل لا يجب أن يتجاوز 100 حرف";
    } else if (!letterRegex.test(formData.title)) {
      newErrors.title = "عنوان العمل يجب أن يحتوي على حروف";
    } else if (!titleRegex.test(formData.title)) {
      newErrors.title = "عنوان العمل يحتوي على رموز غير صالحة";
    }

    // Location
    if (!formData.location.trim()) {
      newErrors.location = "المدينة/المنطقة مطلوبة";
    } else if (formData.location.trim().length < 3) {
      newErrors.location = "المدينة/المنطقة يجب أن تكون 3 أحرف على الأقل";
    } else if (formData.location.trim().length > 100) {
      newErrors.location = "المدينة/المنطقة لا يجب أن تتجاوز 100 حرف";
    } else if (!letterRegex.test(formData.location)) {
      newErrors.location = "المدينة/المنطقة يجب أن تحتوي على حروف";
    } else if (!titleRegex.test(formData.location)) {
      newErrors.location = "المدينة/المنطقة تحتوي على رموز غير صالحة";
    }

    // Client Name
    if (!formData.clientName.trim()) {
      newErrors.clientName = "اسم العميل مطلوب";
    } else if (formData.clientName.trim().length < 3) {
      newErrors.clientName = "اسم العميل يجب أن يكون 3 أحرف على الأقل";
    } else if (formData.clientName.trim().length > 100) {
      newErrors.clientName = "اسم العميل لا يجب أن يتجاوز 100 حرف";
    } else if (!textOnlyRegex.test(formData.clientName)) {
      newErrors.clientName = "اسم العميل يجب أن يحتوي على حروف ومسافات فقط";
    }

    // Date
    if (!formData.date) {
      newErrors.date = "تاريخ العمل مطلوب";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      if (selectedDate > today) {
        newErrors.date = "تاريخ العمل لا يمكن أن يكون في المستقبل";
      }
    }

    // Price
    if (!formData.price) {
      newErrors.price = "التكلفة مطلوبة";
    } else if (Number(formData.price) < 10) {
      newErrors.price = "السعر يجب أن يكون 10 ج.م على الأقل";
    }

    // Description
    if (!formData.description.trim()) {
      newErrors.description = "تفاصيل العمل مطلوبة";
    } else if (formData.description.trim().length < 15) {
      newErrors.description = "تفاصيل العمل يجب أن تكون 15 حرفاً على الأقل";
    } else if (formData.description.trim().length > 1000) {
      newErrors.description = "تفاصيل العمل لا يجب أن تتجاوز 1000 حرف";
    } else if (!letterRegex.test(formData.description)) {
      newErrors.description = "تفاصيل العمل يجب أن تحتوي على حروف مفيدة";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      id,
      title: formData.title.trim(),
      category:
        formData.category ||
        worker?.data?.category?.name ||
        worker?.data?.category ||
        worker?.category?.name ||
        worker?.category ||
        "",
      location: formData.location.trim(),
      description: formData.description.trim(),
      clientName: formData.clientName.trim(),
      date: formData.date,
      status: formData.status,
      price: Number(formData.price),
      images: uploadedImages,
    };

    try {
      await updateWork(payload).unwrap();
      navigate(WorkerRoutes.WORK_DETAIL(id));
    } catch (err) {
      console.error("Failed to update work:", err);
      alert(err?.data?.message || "حدث خطأ أثناء حفظ التعديلات.");
    }
  };

  if (isFetching) {
    return <div className="p-8 text-center">جاري تحميل البيانات...</div>;
  }

  return (
    <div className="p-4 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              تعديل العمل
            </h1>
            <p className="text-gray-500 text-sm">
              قم بتحديث بيانات عملك المحفوظة.
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="font-medium">رجوع</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-bold text-gray-800 mb-2"
                >
                  عنوان العمل
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-2xl border transition-all placeholder:text-gray-400 ${errors.title ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"}`}
                  placeholder="مثال: تأسيس سباكة لفيلا سكنية"
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
                    {formData.category ||
                      worker?.data?.category?.name ||
                      worker?.data?.category ||
                      worker?.category?.name ||
                      worker?.category ||
                      "غير محدد"}
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
                    placeholder="مثال: الرياض, جدة"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.location}
                    </p>
                  )}
                </div>

                {/* Client Name */}
                <div>
                  <label
                    htmlFor="clientName"
                    className="block text-sm font-bold text-gray-800 mb-2"
                  >
                    اسم العميل
                  </label>
                  <input
                    id="clientName"
                    name="clientName"
                    type="text"
                    value={formData.clientName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-2xl border transition-all placeholder:text-gray-400 ${errors.clientName ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"}`}
                    placeholder="اسم العميل أو الجهة"
                  />
                  {errors.clientName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.clientName}
                    </p>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-bold text-gray-800 mb-2"
                  >
                    التاريخ
                  </label>

                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    max={new Date().toISOString().split("T")[0]}
                    className={`w-full px-4 py-3 rounded-2xl border transition-all text-gray-700 bg-white ${errors.date ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"}`}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-bold text-gray-800 mb-2"
                  >
                    التكلفة / السعر
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

                {/* Status */}
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-bold text-gray-800 mb-2"
                  >
                    حالة العمل
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 transition-all text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="completed">سابق (مكتمل)</option>
                    <option value="in_progress">حالي (قيد التنفيذ)</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-bold text-gray-800 mb-2"
                >
                  تفاصيل العمل
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-2xl border transition-all placeholder:text-gray-400 resize-none ${errors.description ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"}`}
                  placeholder="اكتب وصفاً مفصلاً لما قمت بإنجازه، المواد المستخدمة، ومراحل العمل..."
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Media Upload */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  صور العمل
                </label>
                
                {/* Uploaded Images List */}
                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                    {uploadedImages.map((imgUrl, index) => (
                      <div key={index} className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-sm aspect-video">
                        <img
                          src={imgUrl}
                          alt={`Work Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full shadow-md transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
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
                    ))}
                  </div>
                )}

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
                    {isUploadingImage ? "جاري رفع الصورة..." : "اضغط لاختيار صورة لإضافتها للعمل"}
                  </h3>
                  <p className="text-xs text-gray-400">
                    الحد الأقصى 5 ميجابايت. الصيغ المدعومة: JPG, PNG
                  </p>
                </label>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={isUpdating}
                className="w-1/3 min-w-[150px] bg-[#d97706] text-white py-3.5 rounded-2xl font-bold hover:bg-[#b45309] transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                {isUpdating ? "جاري الحفظ..." : "حفظ التعديلات"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
