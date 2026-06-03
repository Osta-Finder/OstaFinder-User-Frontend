import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WorkerRoutes } from "../constants/routes.config";
import { ServiceCategory } from "../constants/worker.constants";
import { useUpdateWorkerWorkMutation, useGetWorkerWorkByIdQuery } from "../../../services/workerApi";

export default function EditWork() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: workData, isLoading: isFetching } = useGetWorkerWorkByIdQuery(id);
  const [updateWork, { isLoading: isUpdating }] = useUpdateWorkerWorkMutation();
  
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
    price: "",
    clientName: "",
    date: "",
    source: "outside",
    status: "completed"
  });
  
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
        date: work.date ? new Date(work.date).toISOString().split('T')[0] : "",
        source: work.source || "outside",
        status: work.status || "completed"
      });
    }
  }, [workData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "عنوان العمل مطلوب";
    if (!formData.category) newErrors.category = "يرجى اختيار التصنيف";
    if (!formData.location.trim()) newErrors.location = "المدينة/المنطقة مطلوبة";
    if (!formData.description.trim()) newErrors.description = "تفاصيل العمل مطلوبة";
    if (!formData.clientName.trim()) newErrors.clientName = "اسم العميل مطلوب";
    if (!formData.date) newErrors.date = "تاريخ العمل مطلوب";
    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "يرجى إدخال سعر صحيح";
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
      category: formData.category,
      location: formData.location.trim(),
      description: formData.description.trim(),
      clientName: formData.clientName.trim(),
      date: formData.date,
      source: formData.source,
      status: formData.status,
      price: Number(formData.price),
    };

    console.log("Updating work...", payload);

    try {
      await updateWork(payload).unwrap();
      navigate(WorkerRoutes.WORK_DETAIL(id));
    } catch (err) {
      console.error("Failed to update work:", err);
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">تعديل العمل</h1>
            <p className="text-gray-500 text-sm">قم بتحديث بيانات عملك المحفوظة.</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">رجوع</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-bold text-gray-800 mb-2">
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
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-bold text-gray-800 mb-2">
                    التصنيف
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-2xl border transition-all text-gray-700 bg-white ${errors.category ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"}`}
                  >
                    <option value="">اختر تصنيف العمل</option>
                    <option value={ServiceCategory.ELECTRICITY}>كهرباء</option>
                    <option value={ServiceCategory.PLUMBING}>سباكة</option>
                    <option value={ServiceCategory.AC}>تكييف</option>
                    <option value={ServiceCategory.CLEANING}>تنظيف</option>
                  </select>
                  {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-bold text-gray-800 mb-2">
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
                  {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                </div>

                {/* Client Name */}
                <div>
                  <label htmlFor="clientName" className="block text-sm font-bold text-gray-800 mb-2">
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
                  {errors.clientName && <p className="text-red-500 text-xs mt-1">{errors.clientName}</p>}
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="date" className="block text-sm font-bold text-gray-800 mb-2">
                    التاريخ
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-2xl border transition-all text-gray-700 bg-white ${errors.date ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"}`}
                  />
                  {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                </div>

                {/* Price */}
                <div>
                  <label htmlFor="price" className="block text-sm font-bold text-gray-800 mb-2">
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
                  {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                </div>

                {/* Source */}
                <div>
                  <label htmlFor="source" className="block text-sm font-bold text-gray-800 mb-2">
                    مصدر العمل
                  </label>
                  <select
                    id="source"
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 transition-all text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="outside">عمل خارجي</option>
                    <option value="platform">عبر منصة أوسطى فايندر</option>
                  </select>
                </div>
                
                {/* Status */}
                <div>
                  <label htmlFor="status" className="block text-sm font-bold text-gray-800 mb-2">
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
                <label htmlFor="description" className="block text-sm font-bold text-gray-800 mb-2">
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
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>

              {/* Media Upload - placeholder for now */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  صور / فيديوهات العمل
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
                    الحد الأقصى 5 ميجابايت للملف الواحد. الصيغ المدعومة: JPG, PNG, MP4
                  </p>
                </div>
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
