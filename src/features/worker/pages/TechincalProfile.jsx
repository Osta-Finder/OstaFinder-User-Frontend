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
import { Link, useParams, useNavigate } from "react-router-dom";
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
  useUploadImageMutation,
  useDeleteWorkerWorkMutation,
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
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER);

  // User state
  const user = useSelector((state) => state.auth.user);
  const isOwnProfile = user?.role === "worker" && (user?._id === id || user?.id === id);
  const isWorker = user?.role === "worker";

  // Unified theme using index.css primary color (#eb6a2d) for all users including workers
  const theme = {
    primaryBg: "bg-[#eb6a2d]",
    primaryHoverBg: "hover:bg-[#d95914]",
    primaryText: "text-[#eb6a2d]",
    primaryBorder: "border-[#eb6a2d]",
    lightBg: "bg-orange-50/70",
    lightBgSolid: "bg-orange-50",
    lightBorder: "border-orange-100/50",
    hoverBorder: "hover:border-orange-200",
    hoverText: "group-hover:text-[#eb6a2d]",
    gradientFromTo: "from-[#eb6a2d] to-[#d72a2d]",
    spinnerBorder: "border-[#eb6a2d]",
  };

  // Booking Modal States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [urgency, setUrgency] = useState("normal");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [bookingErrors, setBookingErrors] = useState({});

  // Edit Profile Modal States
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editErrors, setEditErrors] = useState({});

  // Works Gallery Modal State
  const [isAllWorksOpen, setIsAllWorksOpen] = useState(false);
  // Services Modal State
  const [isAllServicesOpen, setIsAllServicesOpen] = useState(false);
  const [editBio, setEditBio] = useState("");
  const [editExperience, setEditExperience] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editResponseTime, setEditResponseTime] = useState("1h");
  const [editWorkStart, setEditWorkStart] = useState("08:00");
  const [editWorkEnd, setEditWorkEnd] = useState("22:00");
  const [editAllDay, setEditAllDay] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState(null); // { message, type: 'success' | 'error' }

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };
  const { data: profileResponse, isLoading: isLoadingProfile, error: profileError } = useGetWorkerPublicProfileQuery(id);
  const { data: servicesResponse } = useGetWorkerPublicServicesQuery(id);
  const { data: worksResponse } = useGetWorkerPublicWorksQuery(id);
  const { data: reviewsResponse } = useGetWorkerPublicReviewsQuery(id);

  const [createRequest, { isLoading: isCreatingRequest }] = useCreateRequestMutation();
  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateWorkerProfileMutation();
  const [uploadImage, { isLoading: isUploadingImage }] = useUploadImageMutation();
  const [deleteWork] = useDeleteWorkerWorkMutation();
  // uploadImage is imported from workerApi above

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
      setEditResponseTime(profile.responseTime || "1h");
      setEditWorkStart(profile.workHoursStart || "08:00");
      setEditWorkEnd(profile.workHoursEnd || "22:00");
      setEditAllDay(profile.workHoursStart === "00:00" && profile.workHoursEnd === "23:59");
      setEditImage(profile.profilePic || profile.profilePicture || profile.image || "");
      setEditErrors({});
      setIsEditOpen(true);
    }
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileData = new FormData();
    fileData.append("file", file);
    fileData.append("bucket", "profile-pics");

    try {
      const response = await uploadImage(fileData).unwrap();
      if (response.success && response.data?.url) {
        setEditImage(response.data.url);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("فشل رفع الصورة. يرجى المحاولة مرة أخرى.");
    }
  };

  const handleDirectAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileData = new FormData();
    fileData.append("file", file);
    fileData.append("bucket", "profile-pics");

    try {
      const response = await uploadImage(fileData).unwrap();
      if (response.success && response.data?.url) {
        const imageUrl = response.data.url;
        await updateProfile({
          image: imageUrl,
        }).unwrap();
      }
    } catch (err) {
      console.error("Direct upload failed:", err);
      alert("فشل رفع وتحديث الصورة. يرجى المحاولة مرة أخرى.");
    }
  };

  const validateEditProfile = () => {
    const errors = {};
    const phoneRegex = /^01[0-2,5][0-9]{8}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|eg|co\.eg|gmail\.com|yahoo\.com|hotmail\.com|outlook\.com)$/i;

    // الاسم
    if (!editName.trim()) {
      errors.name = "الاسم مطلوب";
    } else if (editName.trim().length < 3) {
      errors.name = "الاسم يجب أن يكون 3 أحرف على الأقل";
    }

    // النبذة
    if (editBio.trim().length > 400) {
      errors.bio = `النبذة تجاوزت الحد المسموح (${editBio.trim().length}/400 حرف)`;
    }

    // سنوات الخبرة
    const expVal = String(editExperience).trim();
    const expNum = Number(expVal);
    if (!expVal || isNaN(expNum) || expNum < 1 || expNum > 50) {
      errors.experience = "خبرة ما بين 1 إلى 50 سنة فقط";
    }

    // رقم الهاتف
    if (!editPhone.trim()) {
      errors.phone = "رقم الهاتف غير صحيح";
    } else if (!phoneRegex.test(editPhone.trim())) {
      errors.phone = "رقم الهاتف غير صحيح";
    }

    // البريد الإلكتروني
    if (!editEmail.trim()) {
      errors.email = "البريد الإلكتروني مطلوب";
    } else if (!editEmail.includes("@")) {
      errors.email = "نسيت @ في البريد الإلكتروني";
    } else if (!emailRegex.test(editEmail.trim())) {
      errors.email = "البريد الإلكتروني غير صحيح";
    }

    return errors;
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const errors = validateEditProfile();
    if (Object.keys(errors).length > 0) {
      setEditErrors(errors);
      return;
    }
    setEditErrors({});
    const finalWorkStart = editAllDay ? "00:00" : editWorkStart;
    const finalWorkEnd = editAllDay ? "23:59" : editWorkEnd;
    if (!editAllDay && editWorkStart && editWorkEnd && editWorkStart >= editWorkEnd) {
      alert("وقت بداية العمل يجب أن يكون قبل وقت النهاية");
      return;
    }
    try {
      await updateProfile({
        name: editName,
        bio: editBio,
        yearsOfExperience: Number(editExperience),
        price: Number(editPrice),
        phoneNumber: editPhone,
        email: editEmail,
        address: editAddress,
        image: editImage,
        responseTime: editResponseTime,
        workHoursStart: finalWorkStart,
        workHoursEnd: finalWorkEnd,
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

  const validateBooking = () => {
    const errors = {};
    const phoneRegex = /^(01)[0-2,5]{1}[0-9]{8}$/;

    if (!selectedService) {
      errors.service = "يرجى اختيار الخدمة المطلوبة";
    }
    if (!clientPhone.trim()) {
      errors.clientPhone = "رقم الهاتف مطلوب";
    } else if (!phoneRegex.test(clientPhone.trim())) {
      errors.clientPhone = "رقم الهاتف غير صحيح، مثال: 01012345678";
    }
    if (!address.trim()) {
      errors.address = "عنوان موقع العمل مطلوب";
    } else if (address.trim().length < 3) {
      errors.address = "العنوان يجب أن يكون 3 أحرف على الأقل";
    } else if (!/[a-zA-Z\u0600-\u06FF]/.test(address.trim())) {
      errors.address = "العنوان يجب أن يحتوي على حروف وليس أرقام فقط";
    } else if (address.trim().length > 150) {
      errors.address = `العنوان تجاوز الحد المسموح (${address.trim().length}/150 حرف)`;
    }
    if (notes.trim()) {
      if (notes.trim().length > 150) {
        errors.notes = `الملاحظات تجاوزت الحد المسموح (${notes.trim().length}/150 حرف)`;
      }
    }
    return errors;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const errors = validateBooking();
    if (Object.keys(errors).length > 0) {
      setBookingErrors(errors);
      return;
    }
    setBookingErrors({});

    const selectedSvcObject = servicesList.find((s) => (s._id || s.id) === selectedService);

    // Navigate to createOrderPage with prefilled data via location.state
    navigate(`/create-order/${id}`, {
      state: {
        worker: {
          _id: id,
          name: profile.name,
          image: avatarUrl,
          rating: profile.rating,
          price: selectedSvcObject?.price || profile.price || 0,
          isOnline: profile.isOnline,
          category: profile.category,
        },
        prefilled: {
          serviceName: selectedSvcObject?.title || "",
          servicePrice: selectedSvcObject?.price || 0,
          urgency: urgency,
          phoneNumber: clientPhone,
          address: address,
          notes: notes,
        },
      },
    });
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
  const avatarUrl = profile.profilePic || profile.profilePicture || profile.image;
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
        {/* Main 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT COLUMN: Main content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Profile card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="h-20 bg-[#eb6a2d] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
              </div>

              <div className="px-6 pb-6 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-14 mb-6">
                  <div className="flex items-end gap-4">
                    <div className="relative group w-28 h-28 shrink-0">
                      <div className={`w-full h-full rounded-2xl bg-gradient-to-br from-orange-100 to-amber-50 border-4 border-white shadow-lg flex items-center justify-center text-3xl font-extrabold ${theme.primaryText} overflow-hidden`}>
                        {isUploadingImage ? (
                          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-20">
                            <div className="w-6 h-6 border-2 border-[#F26B1D] border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        ) : null}
                        {avatarUrl ? (
                          <img src={avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
                        ) : (
                          initials
                        )}
                      </div>
                      
                      {isOwnProfile && (
                        <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white rounded-2xl opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-200 z-10 text-center p-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-[10px] font-bold">تغيير الصورة</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleDirectAvatarChange}
                            className="hidden"
                            disabled={isUploadingImage}
                          />
                        </label>
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

                  <div className="flex items-center gap-2 bg-amber-50 border border-amber-200/60 px-4 py-2 rounded-xl w-fit">
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
                      className={`text-xs ${theme.primaryText} hover:text-orange-700 font-semibold hover:underline`}
                    >
                      + إضافة عمل جديد
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsAllWorksOpen(true)}
                    className={`text-xs ${theme.primaryText} hover:text-orange-700 font-semibold hover:underline cursor-pointer`}
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
                        <div className="w-full h-36 bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center relative overflow-hidden">
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
                            <div className="flex items-center gap-1.5 shrink-0">
                              <Link
                                to={`/worker/works/edit/${work._id || work.id}`}
                                className={`text-[10px] ${theme.lightBgSolid} ${theme.primaryText} px-2.5 py-1 rounded-lg font-bold hover:bg-orange-100 transition-colors`}
                              >
                                تعديل
                              </Link>
                              <button
                                type="button"
                                onClick={async () => {
                                  try {
                                    await deleteWork(work._id || work.id).unwrap();
                                    showToast("تم حذف العمل بنجاح");
                                  } catch {
                                    showToast("فشل الحذف، يرجى المحاولة مرة أخرى", "error");
                                  }
                                }}
                                className="text-[10px] bg-red-50 text-red-500 px-2.5 py-1 rounded-lg font-bold hover:bg-red-100 transition-colors"
                              >
                                حذف
                              </button>
                            </div>
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
                <div className="flex items-center gap-3">
                  {servicesList.length > 5 && (
                    <button
                      type="button"
                      onClick={() => setIsAllServicesOpen(true)}
                      className={`text-xs ${theme.primaryText} hover:text-orange-700 font-semibold hover:underline cursor-pointer`}
                    >
                      عرض الكل ({servicesList.length})
                    </button>
                  )}
                  {servicesList.length <= 5 && (
                    <span className="text-xs text-gray-400">اضغط على أي خدمة للحجز الفوري</span>
                  )}
                </div>
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
                        : `bg-gray-50 text-gray-500 border-gray-200 ${theme.hoverBorder} hover:text-[#eb6a2d]`
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
                    {filteredServices.slice(0, 5).map((svc) => {
                      const serviceContent = (
                        <>
                          {/* Service image if available */}
                          {/* Service image if available */}
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-3.5">
                              {svc.image ? (
                                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                                  <img src={svc.image} alt={svc.title} className="w-full h-full object-cover" />
                                </div>
                              ) : (
                                <div className="w-11 h-11 rounded-xl bg-orange-50/80 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform duration-300">
                                  {CATEGORY_ICONS[svc.category] ?? "🔧"}
                                </div>
                              )}
                              <div>
                                <p className={`font-bold text-gray-800 text-sm ${theme.hoverText} transition-colors`}>
                                  {svc.title}
                                </p>
                                <p className="text-[11px] text-gray-400 mt-0.5">
                                  {SERVICE_CATEGORY_LABELS[svc.category]} {svc.location ? `• ${svc.location}` : ""}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              <div className="text-left">
                                <span className={`block font-extrabold ${theme.primaryText} text-sm`} dir="ltr">
                                  {formatPrice(svc.price)}
                                </span>
                                <span className="text-[9px] text-gray-400">سعر تقديري</span>
                              </div>
                              {isOwnProfile ? (
                                <Link
                                  to={`/worker/services/${svc._id || svc.id}`}
                                  className={`p-1.5 rounded-lg ${theme.lightBgSolid} border border-orange-100 ${theme.primaryText} hover:bg-orange-100 transition-colors`}
                                  title="تعديل الخدمة"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </Link>
                              ) : (
                                <div className={`p-1.5 rounded-lg bg-white border border-gray-100 ${theme.primaryText} group-hover:${theme.primaryBg} group-hover:text-white transition-colors duration-200`}>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      );

                      if (isWorker) {
                        return (
                          <div
                            key={svc._id || svc.id}
                            className={`flex flex-col p-4 bg-gray-50/50 rounded-xl border border-gray-100/80 text-right w-full ${svc.image ? "" : ""}`}
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
                          className={`flex flex-col p-4 bg-gray-50/50 rounded-xl border border-gray-100/80 hover:bg-white hover:shadow-md ${theme.hoverBorder} transition-all duration-200 group text-right w-full cursor-pointer`}
                        >
                          {serviceContent}
                        </button>
                      );
                    })}
                  </div>
                )}
                {/* Show more button if services > 5 */}
                {filteredServices.length > 5 && (
                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => setIsAllServicesOpen(true)}
                      className={`inline-flex items-center gap-2 px-5 py-2 ${theme.lightBgSolid} ${theme.primaryText} border ${theme.primaryBorder} rounded-xl text-xs font-bold hover:bg-orange-100 transition-colors`}
                    >
                      عرض كل الخدمات ({servicesList.length})
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
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
                          <div className={`w-10 h-10 rounded-xl bg-orange-100/80 text-[#eb6a2d] flex items-center justify-center font-bold text-sm shrink-0`}>
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
                  <div className={`w-10 h-10 rounded-xl bg-orange-50 text-[#eb6a2d] flex items-center justify-center shrink-0`}>
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
                  <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {(() => {
                      const rt = profile.responseTime;
                      const map = { "1h": "خلال ساعة", "3h": "خلال 3 ساعات", "6h": "خلال 6 ساعات", "allday": "مدار اليوم", "2d": "خلال يومين", "3d": "خلال 3 أيام", "4d": "خلال 4 أيام", "5d": "خلال 5 أيام", "6d": "خلال 6 أيام", "7d": "خلال أسبوع" };
                      return map[rt] || "خلال ساعة";
                    })()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">ساعات العمل المتاحة:</span>
                  <span className="font-semibold text-slate-700 bg-slate-50 px-2 py-0.5 rounded" dir="ltr">
                    {profile.workHoursStart === "00:00" && profile.workHoursEnd === "23:59"
                      ? "طوال اليوم"
                      : `${profile.workHoursStart || "08:00"} - ${profile.workHoursEnd || "22:00"}`}
                  </span>
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
                  onClick={() => { setIsBookingOpen(false); setBookingErrors({}); }}
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
                        onChange={(e) => { setSelectedService(e.target.value); setBookingErrors((p) => ({ ...p, service: "" })); }}
                        className={`w-full px-3.5 py-2.5 bg-gray-50 border rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:bg-white transition-colors ${bookingErrors.service ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-orange-400"}`}
                      >
                        <option value="">-- اختر من قائمة خدمات الفني --</option>
                        {servicesList.map((svc) => (
                          <option key={svc._id || svc.id} value={svc._id || svc.id}>
                            {svc.title} ({svc.price ? `${svc.price} ج.م` : "سعر متغير"})
                          </option>
                        ))}
                      </select>
                      {bookingErrors.service && <p className="text-[11px] text-red-500 mt-1 font-medium">{bookingErrors.service}</p>}
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
                        onChange={(e) => { setClientPhone(e.target.value); setBookingErrors((p) => ({ ...p, clientPhone: "" })); }}
                        className={`w-full px-3.5 py-2.5 bg-gray-50 border rounded-xl text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white transition-colors ${bookingErrors.clientPhone ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-orange-400"}`}
                      />
                      {bookingErrors.clientPhone && <p className="text-[11px] text-red-500 mt-1 font-medium">{bookingErrors.clientPhone}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-gray-700 flex items-center justify-between">
                        <span>عنوان موقع العمل بالتفصيل *</span>
                        <span className={`text-[10px] font-normal ${address.trim().length > 150 ? "text-red-500" : "text-gray-400"}`}>
                          {address.trim().length}/150 حرف
                        </span>
                      </label>
                      <input
                        type="text" required
                        placeholder="مثال: القاهرة الجديدة، التجمع الخامس، شارع التسعين"
                        value={address}
                        onChange={(e) => { setAddress(e.target.value); setBookingErrors((p) => ({ ...p, address: "" })); }}
                        className={`w-full px-3.5 py-2.5 bg-gray-50 border rounded-xl text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white transition-colors ${bookingErrors.address ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-orange-400"}`}
                      />
                      {bookingErrors.address && <p className="text-[11px] text-red-500 mt-1 font-medium">{bookingErrors.address}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-gray-700 flex items-center justify-between">
                        <span>ملاحظات أو تفاصيل إضافية</span>
                        <span className={`text-[10px] font-normal ${notes.trim().length > 150 ? "text-red-500" : "text-gray-400"}`}>
                          {notes.trim().length}/150 حرف
                        </span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="اكتب هنا أي تفاصيل إضافية تود إخبار الفني بها..."
                        value={notes}
                        onChange={(e) => { setNotes(e.target.value); setBookingErrors((p) => ({ ...p, notes: "" })); }}
                        className={`w-full px-3.5 py-2.5 bg-gray-50 border rounded-xl text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white transition-colors resize-none ${bookingErrors.notes ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-orange-400"}`}
                      />
                      {bookingErrors.notes && <p className="text-[11px] text-red-500 mt-1 font-medium">{bookingErrors.notes}</p>}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isCreatingRequest}
                        className={`w-full py-3 ${theme.primaryBg} ${theme.primaryHoverBg} text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg text-sm disabled:opacity-50`}
                      >
                        {isCreatingRequest ? "جاري التحقق..." : "متابعة ←"}
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
              <div className={`px-6 py-4 bg-gradient-to-l ${theme.gradientFromTo} text-white flex items-center justify-between`}>
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
                  <form onSubmit={handleEditSubmit} className="space-y-4" noValidate>
                    {/* Profile Picture Upload */}
                    <div className="flex items-center gap-4 pb-2 border-b border-gray-100">
                      <div className="relative group w-16 h-16 shrink-0">
                        <div className="w-full h-full rounded-xl bg-gradient-to-br from-orange-100 to-amber-50 border-2 border-gray-200 flex items-center justify-center text-lg font-extrabold text-[#eb6a2d] overflow-hidden">
                          {isUploadingImage ? (
                            <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-20 rounded-xl">
                              <div className="w-5 h-5 border-2 border-[#eb6a2d] border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          ) : null}
                          {editImage ? (
                            <img src={editImage} alt="صورة الملف" className="w-full h-full object-cover" />
                          ) : (
                            getInitials(editName)
                          )}
                        </div>
                        <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white rounded-xl opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-200 z-10 text-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-[9px] font-bold leading-tight">تغيير</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePicChange}
                            className="hidden"
                            disabled={isUploadingImage}
                          />
                        </label>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-gray-700">صورة الملف الشخصي</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">اضغط على الصورة لتغييرها • JPG, PNG مقبول</p>
                        {editImage && (
                          <button
                            type="button"
                            onClick={() => setEditImage("")}
                            className="text-[10px] text-red-400 hover:text-red-600 mt-1 font-medium transition-colors"
                          >
                            × حذف الصورة
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-gray-700">الاسم بالكامل *</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => { setEditName(e.target.value); setEditErrors((p) => ({ ...p, name: "" })); }}
                        className={`w-full px-3.5 py-2.5 bg-gray-50 border rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:bg-white transition-colors ${editErrors.name ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-[#eb6a2d]"}`}
                      />
                      {editErrors.name && <p className="text-[11px] text-red-500 mt-1 font-medium">{editErrors.name}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-gray-700 flex items-center justify-between">
                        <span>نبذة تعريفية (Bio)</span>
                        <span className={`text-[10px] font-normal ${editBio.trim().length > 400 ? "text-red-500" : "text-gray-400"}`}>
                          {editBio.trim().length}/400 حرف
                        </span>
                      </label>
                      <textarea
                        rows={3}
                        value={editBio}
                        onChange={(e) => { setEditBio(e.target.value); setEditErrors((p) => ({ ...p, bio: "" })); }}
                        className={`w-full px-3.5 py-2.5 bg-gray-50 border rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:bg-white transition-colors resize-none ${editErrors.bio ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-[#eb6a2d]"}`}
                        placeholder="تكلم عن خبرتك ومجالك باختصار..."
                      />
                      {editErrors.bio && <p className="text-[11px] text-red-500 mt-1 font-medium">{editErrors.bio}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-gray-700">سنوات الخبرة *</label>
                        <input
                          type="number" min="1" max="50"
                          value={editExperience}
                          onChange={(e) => { setEditExperience(e.target.value); setEditErrors((p) => ({ ...p, experience: "" })); }}
                          className={`w-full px-3.5 py-2.5 bg-gray-50 border rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:bg-white transition-colors ${editErrors.experience ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-[#eb6a2d]"}`}
                        />
                        {editErrors.experience && <p className="text-[11px] text-red-500 mt-1 font-medium">{editErrors.experience}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-gray-700">سعر يبدأ من (ج.م) *</label>
                        <input
                          type="number" min="0"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:border-[#eb6a2d] focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-gray-700">رقم الهاتف للتواصل *</label>
                        <input
                          type="tel"
                          value={editPhone}
                          onChange={(e) => { setEditPhone(e.target.value); setEditErrors((p) => ({ ...p, phone: "" })); }}
                          className={`w-full px-3.5 py-2.5 bg-gray-50 border rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:bg-white transition-colors ${editErrors.phone ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-[#eb6a2d]"}`}
                          placeholder="01012345678"
                        />
                        {editErrors.phone && <p className="text-[11px] text-red-500 mt-1 font-medium">{editErrors.phone}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-gray-700">البريد الإلكتروني *</label>
                        <input
                          type="text"
                          value={editEmail}
                          onChange={(e) => { setEditEmail(e.target.value); setEditErrors((p) => ({ ...p, email: "" })); }}
                          className={`w-full px-3.5 py-2.5 bg-gray-50 border rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:bg-white transition-colors ${editErrors.email ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-[#eb6a2d]"}`}
                          placeholder="example@email.com"
                        />
                        {editErrors.email && <p className="text-[11px] text-red-500 mt-1 font-medium">{editErrors.email}</p>}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-gray-700">منطقة الخدمة / العنوان *</label>
                      <input
                        type="text"
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:border-[#eb6a2d] focus:bg-white transition-colors"
                        placeholder="مثال: القاهرة الجديدة، التجمع الخامس"
                      />
                    </div>

                    {/* Response Time */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-gray-700">سرعة الاستجابة للطلب</label>
                      {/* Hours group */}
                      <p className="text-[10px] text-gray-400 font-medium">بالساعات</p>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: "1h", label: "خلال ساعة" },
                          { value: "3h", label: "خلال 3 ساعات" },
                          { value: "6h", label: "خلال 6 ساعات" },
                        ].map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setEditResponseTime(opt.value)}
                            className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all duration-200 text-center ${
                              editResponseTime === opt.value
                                ? `${theme.primaryBg} text-white border-[#eb6a2d] shadow-sm`
                                : "bg-gray-50 text-gray-600 border-gray-200 hover:border-orange-200 hover:text-[#eb6a2d]"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                      {/* Days group */}
                      <p className="text-[10px] text-gray-400 font-medium pt-1">بالأيام</p>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: "allday", label: "مدار اليوم" },
                          { value: "2d", label: "يومين" },
                          { value: "3d", label: "3 أيام" },
                          { value: "4d", label: "4 أيام" },
                          { value: "5d", label: "5 أيام" },
                          { value: "6d", label: "6 أيام" },
                          { value: "7d", label: "أسبوع" },
                        ].map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setEditResponseTime(opt.value)}
                            className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all duration-200 text-center ${
                              editResponseTime === opt.value
                                ? `${theme.primaryBg} text-white border-[#eb6a2d] shadow-sm`
                                : "bg-gray-50 text-gray-600 border-gray-200 hover:border-orange-200 hover:text-[#eb6a2d]"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Work Hours */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-gray-700">ساعات العمل المتاحة</label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editAllDay}
                            onChange={(e) => setEditAllDay(e.target.checked)}
                            className="w-3.5 h-3.5 accent-[#eb6a2d] cursor-pointer"
                          />
                          <span className="text-[11px] font-semibold text-gray-600">طوال اليوم (24/7)</span>
                        </label>
                      </div>
                      {!editAllDay ? (
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] text-gray-400 mb-1">من</label>
                            <input
                              type="time"
                              value={editWorkStart}
                              onChange={(e) => setEditWorkStart(e.target.value)}
                              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:border-[#eb6a2d] focus:bg-white transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-gray-400 mb-1">إلى</label>
                            <input
                              type="time"
                              value={editWorkEnd}
                              onChange={(e) => setEditWorkEnd(e.target.value)}
                              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:border-[#eb6a2d] focus:bg-white transition-colors"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className={`px-4 py-2.5 ${theme.lightBgSolid} border border-orange-100 rounded-xl`}>
                          <p className={`text-xs font-semibold ${theme.primaryText} text-center`}>متاح طوال اليوم — 00:00 حتى 23:59</p>
                        </div>
                      )}
                      {!editAllDay && editWorkStart && editWorkEnd && editWorkStart >= editWorkEnd && (
                        <p className="text-[11px] text-red-500 font-medium">وقت البداية يجب أن يكون قبل وقت النهاية</p>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isUpdatingProfile}
                        className={`w-full py-3 ${theme.primaryBg} ${theme.primaryHoverBg} text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg text-sm disabled:opacity-50`}
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

        {/* All Services Modal */}
        {isAllServicesOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" dir="rtl">
            <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className={`px-6 py-4 bg-gradient-to-l ${theme.gradientFromTo} text-white flex items-center justify-between`}>
                <div>
                  <h3 className="font-bold text-lg">كل الخدمات المتاحة ({servicesList.length})</h3>
                  <p className="text-white/80 text-[11px] mt-0.5">اضغط على أي خدمة للحجز الفوري</p>
                </div>
                <button
                  onClick={() => setIsAllServicesOpen(false)}
                  className="text-white/85 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 max-h-[75vh] overflow-y-auto space-y-3">
                {servicesList.length === 0 ? (
                  <EmptyState message="لا توجد خدمات مضافة بعد." icon="🔧" />
                ) : (
                  servicesList.map((svc) => {
                    const svcContent = (
                      <>
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-3.5">
                            {svc.image ? (
                              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                                <img src={svc.image} alt={svc.title} className="w-full h-full object-cover" />
                              </div>
                            ) : (
                              <div className="w-11 h-11 rounded-xl bg-orange-50/80 flex items-center justify-center text-xl shrink-0">
                                {CATEGORY_ICONS[svc.category] ?? "🔧"}
                              </div>
                            )}
                            <div>
                              <p className={`font-bold text-gray-800 text-sm ${theme.hoverText} transition-colors`}>
                                {svc.title}
                              </p>
                              <p className="text-[11px] text-gray-400 mt-0.5">
                                {SERVICE_CATEGORY_LABELS[svc.category]} {svc.location ? `• ${svc.location}` : ""}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <div className="text-left">
                              <span className={`block font-extrabold ${theme.primaryText} text-sm`} dir="ltr">
                                {formatPrice(svc.price)}
                              </span>
                              <span className="text-[9px] text-gray-400">سعر تقديري</span>
                            </div>
                            {isOwnProfile ? (
                              <Link
                                to={`/worker/services/${svc._id || svc.id}`}
                                className={`p-1.5 rounded-lg ${theme.lightBgSolid} border border-orange-100 ${theme.primaryText} hover:bg-orange-100 transition-colors`}
                                title="تعديل الخدمة"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </Link>
                            ) : (
                              <div className={`p-1.5 rounded-lg bg-white border border-gray-100 ${theme.primaryText} group-hover:bg-[#eb6a2d] group-hover:text-white transition-colors duration-200`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    );

                    if (isWorker) {
                      return (
                        <div
                          key={svc._id || svc.id}
                          className="flex flex-col p-4 bg-gray-50/50 rounded-xl border border-gray-100/80 text-right w-full"
                        >
                          {svcContent}
                        </div>
                      );
                    }

                    return (
                      <button
                        key={svc._id || svc.id}
                        onClick={() => {
                          setSelectedService(svc._id || svc.id);
                          setIsAllServicesOpen(false);
                          setIsBookingOpen(true);
                        }}
                        className={`flex flex-col p-4 bg-gray-50/50 rounded-xl border border-gray-100/80 hover:bg-white hover:shadow-md ${theme.hoverBorder} transition-all duration-200 group text-right w-full cursor-pointer`}
                      >
                        {svcContent}
                      </button>
                    );
                  })
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
                          <div className={`w-full h-40 bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center overflow-hidden relative`}>
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
                            <h4 className={`font-bold text-gray-800 text-sm line-clamp-2 group-hover:text-[#eb6a2d] transition-colors`}>
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
                              className={`flex-1 text-center py-2 px-3 ${theme.lightBgSolid} hover:bg-orange-100 ${theme.primaryText} font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              تعديل
                            </Link>
                            <button
                              type="button"
                              onClick={async () => {
                                try {
                                  await deleteWork(work._id || work.id).unwrap();
                                  showToast("تم حذف العمل بنجاح");
                                } catch {
                                  showToast("فشل الحذف، يرجى المحاولة مرة أخرى", "error");
                                }
                              }}
                              className="flex-1 py-2 px-3 bg-red-50 hover:bg-red-100 text-red-500 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              حذف
                            </button>
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

      {/* Toast Notification */}
      {toast && (
        <div
          dir="rtl"
          className={`fixed top-6 right-6 z-[9999] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border min-w-[280px] max-w-sm
            ${toast.type === "error"
              ? "bg-white border-red-100"
              : "bg-white border-green-100"
            } animate-fade-in-up`}
          style={{ animation: "slideUp 0.3s ease" }}
        >
          {/* Icon */}
          <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white text-base
            ${toast.type === "error" ? "bg-red-500" : "bg-emerald-500"}`}>
            {toast.type === "error" ? "✕" : "✓"}
          </div>

          {/* Message */}
          <p className={`text-sm font-semibold flex-1
            ${toast.type === "error" ? "text-red-700" : "text-gray-800"}`}>
            {toast.message}
          </p>

          {/* Close */}
          <button
            onClick={() => setToast(null)}
            className="text-gray-300 hover:text-gray-500 transition-colors text-lg leading-none"
          >
            ×
          </button>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl overflow-hidden">
            <div
              className={`h-full ${toast.type === "error" ? "bg-red-400" : "bg-emerald-400"}`}
              style={{ animation: "shrink 3s linear forwards" }}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shrink {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </div>
  );
}