import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, Send, Star } from "lucide-react";
import { toast } from "react-toastify";

import { useGetCategoriesQuery } from "../../../services/categoryApi";
import { useCreateRequestMutation } from "../../../services/requestsApi";
import Listbox from "../components/orderComponets/Listbox";
import ServiceDetails from "../components/orderComponets/ServiceDetails";
import ContactInfo from "../components/orderComponets/ContactInfo";
import LocationSection from "../components/orderComponets/LocationSection";
import { useGetMeQuery } from "../../../services/authApi";

export default function CreateOrderPage() {
  const { workerId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const worker = location.state?.worker;

  const { data: userData } = useGetMeQuery();

  const { data: categoriesResponse } = useGetCategoriesQuery();
  const categories = categoriesResponse?.data || [];
  const [createOrder, { isLoading: isSubmitting }] = useCreateRequestMutation();

  const workerCategory = worker?.category;
  // const today = new Date().toISOString().split("T")[0];

  const getNow = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  const minDateTime = getNow();

  const [formData, setFormData] = useState({
    category: workerCategory?._id || "",
    description: "",
    phoneNumber: userData?.phoneNumber || "",
    date: "",
    address: userData?.addresses || "",
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(formData.date) < new Date()) {
      return toast.error("لا يمكن اختيار تاريخ ووقت في الماضي");
    }

    if (!formData.category) {
      return toast.warn("يرجى اختيار فئة الخدمة أولاً");
    }
    const amount = worker?.price;
    if (amount === undefined) {
      return toast.error("عذراً، لم يتم العثور على سعر الخدمة للفني.");
    }
    try {
      const response = await createOrder({
        workerId,
        orderData: { ...formData, amount: amount },
      }).unwrap();

      toast.success(response.message || "تم إرسال طلبك بنجاح!");

      setTimeout(() => navigate("/client-requests"), 2000);
    } catch (err) {
      const errorMessage =
        err?.data?.message || "عذراً، حدث خطأ ما أثناء إرسال الطلب";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-(--bg-color) py-8 px-4 flex-1" dir="rtl">
      <div className="container mx-auto max-w-6xl">
        <header className="flex items-center justify-between mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition font-medium text-sm shrink-0"
          >
            <ArrowRight size={20} />
            رجوع الي الفئات
          </button>

          <div className="text-center flex-1 mx-4">
            <h1 className="text-lg md:text-xl font-bold text-gray-900">
              طلب خدمة جديد
            </h1>
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
              أخبرنا عما تحتاجه وسنقوم بربطك بالفني مباشرة
            </p>
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-8"
        >
          <div className="flex-1 min-w-0 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <Listbox
                categories={categories}
                selectedId={formData.category}
                onSelect={(id) => setFormData({ ...formData, category: id })}
                readOnly={!!workerCategory}
                readOnlyLabel={workerCategory?.name}
              />

              <ServiceDetails
                value={formData.description}
                onChange={(val) =>
                  setFormData({ ...formData, description: val })
                }
              />
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <ContactInfo
                phoneNumber={formData.phoneNumber}
                date={formData.date}
                onPhoneNumberChange={(val) =>
                  setFormData({ ...formData, phoneNumber: val })
                }
                minDate={minDateTime}
                onDateChange={(val) => setFormData({ ...formData, date: val })}
              />

              <LocationSection
                address={formData.address}
                onAddressChange={(val) =>
                  setFormData({ ...formData, address: val })
                }
              />
            </div>

            {!worker && (
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-(--primary-color) hover:bg-(--blacker) disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-md"
                >
                  <Send size={16} />
                  {isSubmitting ? "جاري الإرسال..." : "إرسال طلب الخدمة"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex-1 bg-white border-2 border-(--primary-color) text-(--blacker) font-bold py-3.5 rounded-xl hover:bg-[var(--primary-light)]/50 transition text-sm text-center"
                >
                  إلغاء الطلب
                </button>
              </div>
            )}
          </div>

          {worker && (
            <div className="w-full md:w-80 shrink-0 space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-8">
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <img
                      src={worker.image}
                      alt={worker.name}
                      className="w-full h-full rounded-full object-cover border-2 border-gray-50"
                    />
                    <span
                      className={`absolute bottom-0.5 right-1 w-3.5 h-3.5 border-2 border-white rounded-full ${
                        worker.isOnline ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {worker.name}
                  </h3>
                  <span className="bg-(--primary-light) text-(--primary-color) text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                    {worker.category?.name}
                  </span>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <span className="text-[var(--primary-color)] font-bold text-sm">
                      {worker.rating?.toFixed(1)}
                    </span>
                    <Star
                      size={14}
                      className="fill-[var(--primary-color)] text-[var(--primary-color)]"
                    />
                  </div>
                  <div className="border-t border-gray-100 pt-3 mt-1">
                    <p className="text-[10px] text-gray-400 font-light">
                      تبدأ الخدمة من
                    </p>
                    <p className="text-lg font-black text-gray-800">
                      {worker.price}{" "}
                      <span className="text-xs font-normal text-gray-500">
                        ج.م
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[var(--primary-color)] hover:bg-[var(--blacker)] disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-md"
                >
                  <Send size={16} />
                  {isSubmitting ? "جاري الإرسال..." : "إرسال طلب الخدمة"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="w-full bg-white border-2 border-[var(--primary-color)] text-[var(--blacker)] font-bold py-3.5 rounded-xl hover:bg-[var(--primary-light)]/50 transition text-sm text-center"
                >
                  إلغاء الطلب
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
