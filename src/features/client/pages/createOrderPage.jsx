import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight, Send } from "lucide-react";
import { toast } from "react-toastify";

import { useGetCategoriesQuery } from "../../../services/categoryApi";
import { useCreateOrderMutation } from "../../../services/orderApi";
import CategorySelector from "../components/orderComponets/CategorySelector";
import ServiceDetails from "../components/orderComponets/ServiceDetails";
import ContactInfo from "../components/orderComponets/ContactInfo";
import LocationSection from "../components/orderComponets/LocationSection";

export default function CreateOrderPage() {
  const { workerId } = useParams();
  const navigate = useNavigate();

  const { data: categoriesResponse, isLoading: isLoadingCats } = useGetCategoriesQuery();
  const categories = categoriesResponse?.data || [];
  const [createOrder, { isLoading: isSubmitting }] = useCreateOrderMutation();
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    phone: "",
    preferredTime: "",
    location: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category) {
      return toast.warn("يرجى اختيار فئة الخدمة أولاً");
    }
    try {
      const response = await createOrder({
        workerId,
        orderData: formData,
      }).unwrap();

      toast.success(response.message || "تم إرسال طلبك بنجاح!");

      setTimeout(() => navigate("/client-home"), 2000);
    } catch (err) {
      const errorMessage =
        err?.data?.message || "عذراً، حدث خطأ ما أثناء إرسال الطلب";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] py-8 px-4" dir="rtl">
      <header className="container mx-auto max-w-3xl flex justify-between items-center mb-6">
        
        <div className="flex items-center gap-2 font-bold text-xl text-gray-800">
          <span>Osta Finder</span>
          <span className="text-orange-600">🛠️</span>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mr-4 text-gray-500 hover:text-gray-800 transition"
          >
            <ArrowRight size={22} />
          </button>
        </div>
      </header>

      <div className="container mx-auto max-w-3xl text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">طلب خدمة جديد</h1>
        <p className="text-sm text-gray-500">
          أخبرنا عما تحتاجه وسنقوم بربطك بالفني مباشرة
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="container mx-auto max-w-3xl space-y-6"
      >
        <CategorySelector
          categories={categories}
          isLoading={isLoadingCats}
          selectedCategory={formData.category}
          onSelect={(id) => setFormData({ ...formData, category: id })}
        />

        <ServiceDetails
          value={formData.description}
          onChange={(val) => setFormData({ ...formData, description: val })}
        />

        <ContactInfo
          phone={formData.phone}
          preferredTime={formData.preferredTime}
          onPhoneChange={(val) => setFormData({ ...formData, phone: val })}
          onTimeChange={(val) =>
            setFormData({ ...formData, preferredTime: val })
          }
        />

        <LocationSection
          address={formData.location}
          onAddressChange={(val) => setFormData({ ...formData, location: val })}
        />

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-amber-800 hover:bg-amber-900 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-md"
          >
            <Send size={16} />
            {isSubmitting ? "جاري الإرسال..." : "إرسال طلب الخدمة"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 bg-white border-2 border-amber-800 text-amber-900 font-bold py-3.5 rounded-xl hover:bg-amber-50/50 transition text-sm text-center"
          >
            إلغاء الطلب
          </button>
        </div>
      </form>
    </div>
  );
}
