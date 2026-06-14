/**
 * ============================================
 * TECHNICAL PROFILE PAGE
 * ============================================
 * Displays the worker's public-facing profile:
 * - Bio, stats, rating
 * - Works gallery (links to PreviousWorks)
 * - Services offered (links to Services)
 * - Customer reviews
 */

import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PageContainer from "../components/PageContainer";
import EmptyState from "../components/EmptyState";
import { WorkerRoutes } from "../constants/routes.config";
import {
  CATEGORY_ICONS,
  SERVICE_CATEGORY_LABELS,
} from "../constants/worker.constants";
import { formatPrice } from "../data/mockData";
import {
  useGetWorkerPublicProfileQuery,
  useGetWorkerPublicServicesQuery,
  useGetWorkerPublicWorksQuery,
  useGetWorkerPublicReviewsQuery,
  useUpdateWorkerProfileMutation,
} from "../../../services/workerApi";
import { useCreateRequestMutation } from "../../../services/requestsApi";


const getInitials = (name) => {
  if (!name) return "";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].substring(0, 2);
  return parts[0][0] + (parts[parts.length - 1]?.[0] || "");
};

const ALL_FILTER = "الكل";

function StarRating({ rating, size = "sm" }) {
  const sizeClass = size === "sm" ? "text-sm" : "text-base";
  return (
    <div className={`flex gap-0.5 ${sizeClass}`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function TechnicianProfile() {
  const { id } = useParams();
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER);

  // User state
  const user = useSelector((state) => state.auth.user);
  const isOwnProfile = user?.role === "worker" && (user?._id === id || user?.id === id);
  const isWorker = user?.role === "worker";

  const theme = {
    primaryBg: isWorker ? "bg-blue-600" : "bg-[#F26B1D]",
    primaryHoverBg: isWorker ? "hover:bg-blue-700" : "hover:bg-[#d95914]",
    primaryText: isWorker ? "text-blue-600" : "text-[#F26B1D]",
    primaryBorder: isWorker ? "border-blue-600" : "border-[#F26B1D]",
    lightBg: isWorker ? "bg-blue-50/70" : "bg-orange-50/70",
    lightBgSolid: isWorker ? "bg-blue-50" : "bg-orange-50",
    lightBorder: isWorker ? "border-blue-100/50" : "border-orange-100/50",
    hoverBorder: isWorker ? "hover:border-blue-200" : "hover:border-orange-200",
    hoverText: isWorker ? "group-hover:text-blue-600" : "group-hover:text-[#F26B1D]",
    gradientFromTo: isWorker ? "from-blue-600 to-indigo-700" : "from-orange-500 to-amber-600",
    spinnerBorder: isWorker ? "border-blue-600" : "border-[#F26B1D]",
  };

  // Booking Modal States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [urgency, setUrgency] = useState("normal");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  // Edit Profile Modal States
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [editName, setEditName] = useState("");

  // Works Gallery Modal State
  const [isAllWorksOpen, setIsAllWorksOpen] = useState(false);
  const [editBio, setEditBio] = useState("");
  const [editExperience, setEditExperience] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editAddress, setEditAddress] = useState("");

  // Fetch worker public data
  const { data: profileResponse, isLoading: isLoadingProfile, error: profileError } = useGetWorkerPublicProfileQuery(id);
  const { data: servicesResponse } = useGetWorkerPublicServicesQuery(id);
  const { data: worksResponse } = useGetWorkerPublicWorksQuery(id);
  const { data: reviewsResponse } = useGetWorkerPublicReviewsQuery(id);

  const [createRequest, { isLoading: isCreatingRequest }] = useCreateRequestMutation();
  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateWorkerProfileMutation();

  const profile = profileResponse?.data;
  const servicesList = servicesResponse?.data || [];
  const allWorks = worksResponse?.data || [];
  const reviewsList = reviewsResponse?.data || [];

  const openEditModal = () => {
    if (profile) {
      setEditName(profile.name || "");
      setEditBio(profile.bio || "");
      setEditExperience(profile.yearsOfExperience || "");
      setEditPrice(profile.price || "");
      setEditPhone(profile.phoneNumber || "");
      setEditEmail(profile.email || "");
      setEditAddress(profile.address || profile.city || "");
      setIsEditOpen(true);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        name: editName,
        bio: editBio,
        yearsOfExperience: Number(editExperience),
        price: Number(editPrice),
        phoneNumber: editPhone,
        email: editEmail,
        address: editAddress,
      }).unwrap();

      setEditSuccess(true);
      setTimeout(() => {
        setIsEditOpen(false);
        setEditSuccess(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert(err?.data?.message || "عذراً، حدث خطأ ما أثناء تعديل الملف الشخصي");
    }
  };


  // Derived filter categories
  const filterCategories = [
    ALL_FILTER,
    ...Array.from(
      new Set(
        servicesList
          .map((s) => SERVICE_CATEGORY_LABELS[s.category] || s.category)
          .filter(Boolean)
      )
    ),
  ];

  const filteredServices =
    activeFilter === ALL_FILTER
      ? servicesList
      : servicesList.filter(
        (s) =>
          SERVICE_CATEGORY_LABELS[s.category] === activeFilter ||
          s.category === activeFilter
      );

  const galleryWorks = allWorks.slice(0, 3);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedService || !address || !clientPhone) return;

    const selectedSvcObject = servicesList.find((s) => (s._id || s.id) === selectedService);
    const serviceTitle = `${selectedSvcObject?.title || "خدمة عامة"}. هاتف: ${clientPhone}. ملاحظات: ${notes || "لا توجد"}`;
    const amountVal = selectedSvcObject?.price || 0;

    try {
      await createRequest({
        service: serviceTitle,
        worker: id,
        date: new Date().toISOString(),
        address: address,
        amount: amountVal,
      }).unwrap();

      setBookingSuccess(true);
      setTimeout(() => {
        setIsBookingOpen(false);
        setBookingSuccess(false);
        setSelectedService("");
        setAddress("");
        setNotes("");
        setUrgency("normal");
        setClientPhone("");
      }, 3000);
    } catch (err) {
      console.error("Failed to create request:", err);
      alert(err?.data?.message || "عذراً، حدث خطأ ما أثناء إرسال طلب الحجز");
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="pt-18 min-h-screen flex items-center justify-center bg-gray-50/50">
        <div className="text-center space-y-4">
          <div className={`w-12 h-12 border-4 ${theme.spinnerBorder} border-t-transparent rounded-full animate-spin mx-auto`}></div>
          <p className="text-gray-500 text-sm font-medium">جاري تحميل ملف الفني...</p>
        </div>
      </div>
    );
  }

  if (profileError || !profile) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gray-50/50" dir="rtl">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center space-y-5">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-3xl mx-auto">
            ⚠️
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">عذراً، لم يتم العثور على الفني</h3>
            <p className="text-sm text-gray-500 mt-2">
              الملف الشخصي الذي تبحث عنه غير متوفر أو تم نقله. يرجى التحقق من الرابط والمحاولة مرة أخرى.
            </p>
          </div>
          <Link
            to={isWorker ? "/worker/dashboard" : "/client-home"}
            className={`inline-block ${theme.primaryBg} ${theme.primaryHoverBg} text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm`}
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    );
  }

  const initials = getInitials(profile.name);
  const avatarUrl = profile.profilePicture || profile.image;
  const profileTags = [
    profile.yearsOfExperience ? `${profile.yearsOfExperience} سنوات خبرة` : null,
    profile.address || profile.city ? `منطقة ${profile.address || profile.city}` : null,
    profile.price ? `سعر يبدأ من ${profile.price} ج.م` : null,
    "موثوق",
    "معتمد",
  ].filter(Boolean);

  return (
    <div className="pt-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ملف الفني</h1>
            <p className="text-sm text-gray-500 mt-1">تفاصيل الفني وخدماته المتاحة</p>
          </div>
          {isOwnProfile ? (
            <button
              onClick={openEditModal}
              className={`flex items-center gap-2 ${theme.primaryBg} ${theme.primaryHoverBg} text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              تعديل ملفي الشخصي
            </button>
          ) : !isWorker ? (
            <button
              onClick={() => setIsBookingOpen(true)}
              className={`flex items-center gap-2 ${theme.primaryBg} ${theme.primaryHoverBg} text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              حجز موعد سريع
            </button>
          ) : null}
        </div>

        {/* Main 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT COLUMN: Main content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Profile card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className={`h-20 bg-gradient-to-l ${isWorker ? "from-blue-600 to-indigo-700" : "from-orange-500 to-amber-600"} relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
              </div>

              <div className="px-6 pb-6 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-14 mb-6">
                  <div className="flex items-end gap-4">
                    <div className={`w-28 h-28 rounded-2xl bg-gradient-to-br ${isWorker ? "from-blue-100 to-indigo-50" : "from-orange-100 to-amber-50"} border-4 border-white shadow-lg flex items-center justify-center text-3xl font-extrabold ${theme.primaryText} shrink-0 overflow-hidden`}>
                      {avatarUrl ? (
                        <img src={avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
                      ) : (
                        initials
                      )}
                    </div>
                    <div className="mb-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white text-[10px]" title="موثوق معتمد">✔</span>
                      </div>
                      <p className={`text-sm ${theme.primaryText} font-semibold`}>{profile.category?.name || "حرفي"}</p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-2 ${isWorker ? "bg-blue-50/50 border border-blue-200/60" : "bg-amber-50 border border-amber-200/60"} px-4 py-2 rounded-xl w-fit`}>
                    <span className="text-amber-500 text-lg">★</span>
                    <span className="text-lg font-bold text-gray-800">{profile.rating || 0}</span>
                    <span className="text-sm text-gray-400">({reviewsList.length} تقييم)</span>
                  </div>
                </div>

                <div className="border-t border-gray-100/80 pt-5 mt-2">
                  <h4 className="text-sm font-bold text-gray-800 mb-2">نبذة عني</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    {profile.bio || "لا توجد نبذة تعريفية متاحة حالياً."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {profileTags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3.5 py-1.5 ${theme.lightBg} ${theme.primaryText} text-xs font-semibold rounded-full border ${theme.lightBorder}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Works Gallery */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">معرض الأعمال السابقة</h3>
                <div className="flex items-center gap-3">
                  {isOwnProfile && (
                    <Link
                      to={`${WorkerRoutes.WORKS}/add`}
                      className="text-xs text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                    >
                      + إضافة عمل جديد
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsAllWorksOpen(true)}
                    className={`text-xs ${theme.primaryText} ${isWorker ? "hover:text-blue-700" : "hover:text-orange-700"} font-semibold hover:underline cursor-pointer`}
                  >
                    عرض الكل ({allWorks.length})
                  </button>
                </div>
              </div>

              <div className="p-6">
                {allWorks.length === 0 ? (
                  <EmptyState message="لم يتم رفع أعمال سابقة حتى الآن." icon="🏗️" />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {galleryWorks.map((work) => (
                      <div
                        key={work._id || work.id}
                        className="group bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300"
                      >
                        <div className={`w-full h-36 bg-gradient-to-br ${isWorker ? "from-blue-50 to-indigo-100" : "from-orange-50 to-amber-100"} flex items-center justify-center relative overflow-hidden`}>
                          {work.images && work.images.length > 0 ? (
                            <img
                              src={work.images[0]}
                              alt={work.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <span className="text-4xl opacity-30">
                              {CATEGORY_ICONS[work.category] ?? "📸"}
                            </span>
                          )}
                        </div>
                        <div className="p-3 flex items-center justify-between gap-2">
                          <div>
                            <p className={`font-bold text-gray-800 text-xs line-clamp-1 ${theme.hoverText} transition-colors`}>
                              {work.title}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-1">
                              {work.date ? new Date(work.date).toLocaleDateString("ar-EG") : ""}
                            </p>
                          </div>
                          {isOwnProfile && work.source === "outside" && (
                            <Link
                              to={`/worker/works/edit/${work._id || work.id}`}
                              className="text-[10px] bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg font-bold hover:bg-blue-100 transition-colors shrink-0"
                            >
                              تعديل
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Services Offered */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">الخدمات المتاحة للحجز</h3>
                <span className="text-xs text-gray-400">اضغط على أي خدمة للحجز الفوري</span>
              </div>

              <div className="p-6 space-y-5">
                {/* Filter chips */}
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {filterCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveFilter(cat)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${activeFilter === cat
                        ? `${theme.primaryBg} text-white ${theme.primaryBorder} shadow-sm`
                        : `bg-gray-50 text-gray-500 border-gray-200 ${theme.hoverBorder} ${isWorker ? "hover:text-blue-600" : "hover:text-[#F26B1D]"}`
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {filteredServices.length === 0 ? (
                  <EmptyState message="لا توجد خدمات حالية في هذه الفئة." icon="🔧" />
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {filteredServices.map((svc) => {
                      const serviceContent = (
                        <>
                          <div className="flex items-center gap-3.5">
                            <div className={`w-11 h-11 rounded-xl ${isWorker ? "bg-blue-50/80" : "bg-orange-50/80"} flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                              {CATEGORY_ICONS[svc.category] ?? "🔧"}
                            </div>
                            <div>
                              <p className={`font-bold text-gray-800 text-sm ${theme.hoverText} transition-colors`}>
                                {svc.title}
                              </p>
                              <p className="text-[11px] text-gray-400 mt-0.5">
                                {SERVICE_CATEGORY_LABELS[svc.category]} {svc.location ? `• ${svc.location}` : ""}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 shrink-0">
                            <div className="text-left">
                              <span className={`block font-extrabold ${theme.primaryText} text-sm`} dir="ltr">
                                {formatPrice(svc.price)}
                              </span>
                              <span className="text-[9px] text-gray-400">سعر تقديري</span>
                            </div>
                            {!isWorker && (
                              <div className={`p-1.5 rounded-lg bg-white border border-gray-100 ${theme.primaryText} group-hover:${theme.primaryBg} group-hover:text-white transition-colors duration-200`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </>
                      );

                      if (isWorker) {
                        return (
                          <div
                            key={svc._id || svc.id}
                            className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100/80 text-right w-full"
                          >
                            {serviceContent}
                          </div>
                        );
                      }

                      return (
                        <button
                          key={svc._id || svc.id}
                          onClick={() => {
                            setSelectedService(svc._id || svc.id);
                            setIsBookingOpen(true);
                          }}
                          className={`flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100/80 hover:bg-white hover:shadow-md ${theme.hoverBorder} transition-all duration-200 group text-right w-full cursor-pointer`}
                        >
                          {serviceContent}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Customer Reviews */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">آراء وتقييمات العملاء</h3>
                <span className="text-xs text-gray-400">{reviewsList.length} تقييم</span>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {reviewsList.length === 0 ? (
                  <div className="col-span-full">
                    <EmptyState message="لا توجد تقييمات مضافة بعد." icon="⭐" />
                  </div>
                ) : (
                  reviewsList.map((review) => {
                    const revInitials = getInitials(review.user?.name || "عميل");
                    const revName = review.user?.name || "عميل Ostafinder";
                    const revDate = review.createdAt ? new Date(review.createdAt).toLocaleDateString("ar-EG") : "";

                    return (
                      <div
                        key={review._id || review.id}
                        className="bg-gray-50/50 rounded-xl border border-gray-100/80 p-4 space-y-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl ${isWorker ? "bg-blue-100/80 text-blue-600" : "bg-orange-100/80 text-[#F26B1D]"} flex items-center justify-center font-bold text-sm shrink-0`}>
                            {revInitials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-gray-800 text-xs truncate">{revName}</p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <StarRating rating={review.stars} />
                              <span className="text-[9px] text-gray-400">{revDate}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                          {review.comment}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar */}
          <div className="space-y-6">

            {/* Contact card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">معلومات التواصل السريع</h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400">رقم الهاتف الجوال</span>
                    <a href={`tel:${profile.phoneNumber}`} className="text-sm font-bold text-gray-800 hover:text-emerald-600 transition-colors" dir="ltr">
                      {profile.phoneNumber || "غير متاح"}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400">البريد الإلكتروني</span>
                    <a href={`mailto:${profile.email}`} className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors break-all">
                      {profile.email || "غير متاح"}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl ${isWorker ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-[#F26B1D]"} flex items-center justify-center shrink-0`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400">منطقة الخدمة الحالية</span>
                    <span className="text-sm font-bold text-gray-800">
                      {profile.address || profile.city || "غير محدد"}
                    </span>
                  </div>
                </div>
              </div>

              {isOwnProfile ? (
                <button
                  onClick={openEditModal}
                  className={`w-full flex items-center justify-center gap-2 py-3 ${theme.primaryBg} ${theme.primaryHoverBg} text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm`}
                >
                  تعديل الملف الشخصي
                </button>
              ) : !isWorker ? (
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className={`w-full flex items-center justify-center gap-2 py-3 ${theme.primaryBg} ${theme.primaryHoverBg} text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm`}
                >
                  حجز الخدمة الآن
                </button>
              ) : null}
            </div>

            {/* Stats card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">إحصائيات الإنجاز</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100/50 text-center">
                  <span className="block text-2xl font-black text-gray-800">{allWorks.length}</span>
                  <span className="text-[10px] text-gray-400 mt-1 block">عملية ناجحة</span>
                </div>
                <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100/50 text-center">
                  <span className="block text-2xl font-black text-gray-800">{profile.yearsOfExperience ? `${profile.yearsOfExperience} س` : "—"}</span>
                  <span className="text-[10px] text-gray-400 mt-1 block">سنوات الخبرة</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">سرعة الاستجابة للطلب:</span>
                  <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">أقل من ساعة</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">ساعات العمل المتاحة:</span>
                  <span className="font-semibold text-slate-700 bg-slate-50 px-2 py-0.5 rounded" dir="ltr">8:00 ص - 10:00 م</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Modal */}
        {isBookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" dir="rtl">
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">

              <div className={`px-6 py-4 bg-gradient-to-l ${theme.gradientFromTo} text-white flex items-center justify-between`}>
                <div>
                  <h3 className="font-bold text-lg">طلب حجز خدمة سريع</h3>
                  <p className="text-white/80 text-[11px] mt-0.5">احجز موعدك مع {profile.name} الآن</p>
                </div>
                <button
                  onClick={() => setIsBookingOpen(false)}
                  className="text-white/85 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                {bookingSuccess ? (
                  <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center text-4xl shadow-md border border-emerald-100">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">تم إرسال طلب الحجز بنجاح!</h4>
                      <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                        تم استلام طلبك، وسيقوم {profile.name} بالتواصل معك خلال دقائق للمتابعة.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-gray-700">اختر الخدمة المطلوبة *</label>
                      <select
                        required
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className={`w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none ${isWorker ? "focus:border-blue-500" : "focus:border-orange-400"} focus:bg-white transition-colors`}
                      >
                        <option value="">-- اختر من قائمة خدمات الفني --</option>
                        {servicesList.map((svc) => (
                          <option key={svc._id || svc.id} value={svc._id || svc.id}>
                            {svc.title} ({svc.price ? `${svc.price} ج.م` : "سعر متغير"})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-gray-700">مدى استعجال الطلب</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button type="button" onClick={() => setUrgency("normal")}
                          className={`py-2 rounded-xl text-xs font-semibold border transition-all duration-200 ${urgency === "normal" ? "bg-slate-100 border-slate-300 text-slate-800" : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
                          حجز عادي (غير مستعجل)
                        </button>
                        <button type="button" onClick={() => setUrgency("urgent")}
                          className={`py-2 rounded-xl text-xs font-bold border transition-all duration-200 ${urgency === "urgent" ? "bg-red-50 border-red-200 text-red-600 shadow-sm" : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
                          ⚠️ عاجل وطارئ جداً
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-gray-700">رقم الهاتف للتواصل *</label>
                      <input
                        type="tel" required
                        placeholder="مثال: 01012345678"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className={`w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none ${isWorker ? "focus:border-blue-500" : "focus:border-orange-400"} focus:bg-white transition-colors`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-gray-700">عنوان موقع العمل بالتفصيل *</label>
                      <input
                        type="text" required
                        placeholder="مثال: القاهرة الجديدة، التجمع الخامس، شارع التسعين"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className={`w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none ${isWorker ? "focus:border-blue-500" : "focus:border-orange-400"} focus:bg-white transition-colors`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-gray-700">ملاحظات أو تفاصيل إضافية</label>
                      <textarea
                        rows={3}
                        placeholder="اكتب هنا أي تفاصيل إضافية تود إخبار الفني بها..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className={`w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none ${isWorker ? "focus:border-blue-500" : "focus:border-orange-400"} focus:bg-white transition-colors resize-none`}
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isCreatingRequest}
                        className={`w-full py-3 ${theme.primaryBg} ${theme.primaryHoverBg} text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg text-sm disabled:opacity-50`}
                      >
                        {isCreatingRequest ? "جاري إرسال الطلب..." : "إرسال الطلب للفني"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Edit Profile Modal */}
        {isEditOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" dir="rtl">
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-l from-blue-600 to-blue-700 text-white flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">تعديل ملفك الشخصي</h3>
                  <p className="text-white/80 text-[11px] mt-0.5">حدث معلوماتك المهنية والشخصية ليراها العملاء</p>
                </div>
                <button
                  onClick={() => setIsEditOpen(false)}
                  className="text-white/85 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 max-h-[75vh] overflow-y-auto">
                {editSuccess ? (
                  <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center text-4xl shadow-md border border-emerald-100">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">تم تعديل الملف بنجاح!</h4>
                      <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                        تم تحديث بياناتك الشخصية بنجاح على النظام.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleEditSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-gray-700">الاسم بالكامل *</label>
                      <input
                        type="text" required
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-gray-700">نبذة تعريفية (Bio)</label>
                      <textarea
                        rows={3}
                        value={editBio}
                        onChange={(e) => setEditBio(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors resize-none"
                        placeholder="تكلم عن خبرتك ومجالك باختصار..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-gray-700">سنوات الخبرة *</label>
                        <input
                          type="number" required min="0"
                          value={editExperience}
                          onChange={(e) => setEditExperience(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-gray-700">سعر يبدأ من (ج.م) *</label>
                        <input
                          type="number" required min="0"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-gray-700">رقم الهاتف للتواصل *</label>
                        <input
                          type="tel" required
                          value={editPhone}
                          onChange={(e) => setEditPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-gray-700">البريد الإلكتروني *</label>
                        <input
                          type="email" required
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-gray-700">منطقة الخدمة / العنوان *</label>
                      <input
                        type="text" required
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                        placeholder="مثال: القاهرة الجديدة، التجمع الخامس"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isUpdatingProfile}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg text-sm disabled:opacity-50"
                      >
                        {isUpdatingProfile ? "جاري الحفظ..." : "حفظ التعديلات"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* All Works Modal */}
        {isAllWorksOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" dir="rtl">
            <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className={`px-6 py-4 bg-gradient-to-l ${theme.gradientFromTo} text-white flex items-center justify-between`}>
                <div>
                  <h3 className="font-bold text-lg">كل الأعمال السابقة ({allWorks.length})</h3>
                  <p className="text-white/80 text-[11px] mt-0.5">تصفح الأعمال والخدمات السابقة التي تم إنجازها</p>
                </div>
                <button
                  onClick={() => setIsAllWorksOpen(false)}
                  className="text-white/85 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 max-h-[75vh] overflow-y-auto">
                {allWorks.length === 0 ? (
                  <EmptyState message="لا توجد أعمال سابقة مضافة بعد." icon="🏗️" />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allWorks.map((work) => (
                      <div
                        key={work._id || work.id}
                        className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                      >
                        <div>
                          {/* Image */}
                          <div className={`w-full h-40 bg-gradient-to-br ${isWorker ? "from-blue-50 to-indigo-100" : "from-orange-50 to-amber-100"} flex items-center justify-center overflow-hidden relative`}>
                            {work.images && work.images.length > 0 ? (
                              <img
                                src={work.images[0]}
                                alt={work.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            ) : (
                              <span className="text-4xl opacity-30">
                                {CATEGORY_ICONS[work.category] ?? "📸"}
                              </span>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-4 space-y-2">
                            <h4 className={`font-bold text-gray-800 text-sm line-clamp-2 ${isWorker ? "group-hover:text-blue-600" : "group-hover:text-orange-600"} transition-colors`}>
                              {work.title}
                            </h4>
                            <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                              {work.description || "لا يوجد وصف إضافي لهذا العمل."}
                            </p>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              <span className="px-2 py-0.5 bg-gray-50 border border-gray-100 text-[10px] font-medium rounded-md text-gray-500">
                                {SERVICE_CATEGORY_LABELS[work.category] || work.category}
                              </span>
                              {work.location && (
                                <span className="px-2 py-0.5 bg-gray-50 border border-gray-100 text-[10px] font-medium rounded-md text-gray-500">
                                  📍 {work.location}
                                </span>
                              )}
                              {work.price && (
                                <span className={`px-2 py-0.5 ${theme.lightBgSolid} border ${theme.lightBorder} text-[10px] font-bold rounded-md ${theme.primaryText}`}>
                                  {work.price} ج.م
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Edit Action for Worker's own profile */}
                        {isOwnProfile && work.source === "outside" && (
                          <div className="px-4 pb-4 pt-2 border-t border-gray-100 flex items-center gap-2">
                            <Link
                              to={`/worker/works/edit/${work._id || work.id}`}
                              className="w-full text-center py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              تعديل هذا العمل
                            </Link>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}