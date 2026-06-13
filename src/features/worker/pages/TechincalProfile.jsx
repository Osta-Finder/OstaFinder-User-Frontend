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
import { Link } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import { WorkerRoutes } from "../constants/routes.config";
import {
  CATEGORY_ICONS,
  SERVICE_CATEGORY_LABELS,
} from "../constants/worker.constants";
import {
  formatPrice,
} from "../data/mockData";
import {
  useGetWorkerWorksQuery,
  useGetWorkerServicesQuery,
} from "../../../services/workerApi";

/// ─── Mock profile data (replace with API call later) ─────────────────────────
const mockProfile = {
  name: "محمد عبد الله",
  specialty: "فني كهرباء وتكييف متخصص",
  rating: 4.9,
  reviewCount: 124,
  bio: "خبرة أكثر من 10 سنوات في تأسيس وصيانة شبكات الكهرباء وتكييفات الهواء للمنازل والشركات. أتميز بالدقة في المواعيد واستخدام أحدث المعدات والتقنيات لضمان جودة وأمان لا مثيل لهما.",
  tags: ["موثوق", "منضبط في المواعيد", "معتمد", "متاح للطوارئ"],
  avatarInitials: "م ع",
  phone: "+20 101 234 5678",
  email: "m.abdullah@ostafinder.com",
  location: "القاهرة الجديدة، مصر",
  experience: "10 سنوات",
  completedJobs: 142,
  workingHours: "8:00 ص - 10:00 م",
  responseTime: "أقل من ساعة",
};

// ─── Mock reviews (replace with API call later) ───────────────────────────────
const mockReviews = [
  {
    id: 1,
    name: "أحمد سالم",
    rating: 5,
    date: "منذ أسبوع",
    comment: "فني محترف جداً، وصل في الوقت المحدد وأنجز العمل بشكل ممتاز. أنصح بالتعامل معه بشدة.",
    initials: "أ",
  },
  {
    id: 2,
    name: "فاطمة العمري",
    rating: 5,
    date: "منذ أسبوعين",
    comment: "تجربة رائعة، السعر معقول والعمل نظيف ومرتب وسريع جداً.",
    initials: "ف",
  },
  {
    id: 3,
    name: "خالد المطيري",
    rating: 4,
    date: "منذ شهر",
    comment: "عمل ممتاز وسريع، دقة في المواعيد وسرعة في تشخيص العطل وإصلاحه.",
    initials: "خ",
  },
];

// ─── Filter categories derived from constants ─────────────────────────────────
const ALL_FILTER = "الكل";
const filterCategories = [
  ALL_FILTER,
  ...Object.values(SERVICE_CATEGORY_LABELS),
];

// ─── Star Rating ──────────────────────────────────────────────────────────────
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

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TechnicianProfile() {
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER);
  
  // Direct Booking Modal States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [urgency, setUrgency] = useState("normal");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  // Fetch works and services from API
  const { data: worksData } = useGetWorkerWorksQuery();
  const { data: servicesData } = useGetWorkerServicesQuery();
  const allWorks = worksData?.data || [];
  const allServices = servicesData?.data || [];

  // Filter services by selected category label
  const filteredServices =
    activeFilter === ALL_FILTER
      ? allServices
      : allServices.filter(
          (s) => SERVICE_CATEGORY_LABELS[s.category] === activeFilter
        );

  // Show only last 3 works in the preview gallery
  const galleryWorks = allWorks.slice(0, 3);

  // Handle booking form submission
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!selectedService || !address) return;
    
    // Simulate API request
    setBookingSuccess(true);
    setTimeout(() => {
      // Reset form after success screen
      setIsBookingOpen(false);
      setBookingSuccess(false);
      setSelectedService("");
      setAddress("");
      setNotes("");
      setUrgency("normal");
    }, 3000);
  };

  return (
    <div className="pt-20">
      <PageContainer
      title="ملفي المهني"
      description="صفحتك الشخصية العامة كما تظهر للزبائن والجمهور"
      actions={
        <div className="flex gap-2.5">
          <button
            onClick={() => setIsBookingOpen(true)}
            className="flex items-center gap-2 bg-[#F26B1D] hover:bg-[#d95914] text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            حجز موعد سريع
          </button>
          
          <button
            onClick={() => alert("سيتم توجيهك إلى صفحة تعديل بياناتك قريباً")}
            className="flex items-center gap-2 bg-white hover:bg-gray-50 text-slate-700 border border-gray-200 px-5 py-2.5 rounded-xl font-medium transition-all duration-200 text-sm shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            تعديل الملف
          </button>
        </div>
      }
    >
      {/* ── MAIN 2-COLUMN LAYOUT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* RIGHT COLUMN: MAIN CONTENT (Profile details, Services, Gallery, Reviews) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Profile card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Header banner */}
            <div className="h-32 bg-gradient-to-l from-orange-500 to-amber-600 relative overflow-hidden">
              {/* Premium geometric background decoration */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
            </div>

            <div className="px-6 pb-6">
              {/* Avatar + Name row */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-14 mb-6">
                <div className="flex items-end gap-4">
                  {/* Avatar */}
                  <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-50 border-4 border-white shadow-lg flex items-center justify-center text-3xl font-extrabold text-[#F26B1D] shrink-0">
                    {mockProfile.avatarInitials}
                  </div>
                  <div className="mb-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h2 className="text-2xl font-bold text-gray-900">{mockProfile.name}</h2>
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white text-[10px]" title="موثوق معتمد">✔</span>
                    </div>
                    <p className="text-sm text-orange-600 font-semibold">{mockProfile.specialty}</p>
                  </div>
                </div>

                {/* Rating badge */}
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200/60 px-4 py-2 rounded-xl w-fit">
                  <span className="text-amber-500 text-lg">★</span>
                  <span className="text-lg font-bold text-gray-800">{mockProfile.rating}</span>
                  <span className="text-sm text-gray-400">({mockProfile.reviewCount} تقييم)</span>
                </div>
              </div>

              {/* Bio */}
              <div className="border-t border-gray-100/80 pt-5 mt-2">
                <h4 className="text-sm font-bold text-gray-800 mb-2">نبذة عني</h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  {mockProfile.bio}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {mockProfile.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1.5 bg-orange-50/70 text-[#F26B1D] text-xs font-semibold rounded-full border border-orange-100/50"
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
              <Link
                to={WorkerRoutes.WORKS}
                className="text-xs font-semibold text-[#F26B1D] hover:underline"
              >
                عرض الكل ({allWorks.length})
              </Link>
            </div>

            <div className="p-6">
              {allWorks.length === 0 ? (
                <EmptyState message="لم يتم رفع أعمال سابقة حتى الآن." icon="🏗️" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {galleryWorks.map((work) => (
                    <Link
                      key={work._id || work.id}
                      to={WorkerRoutes.WORK_DETAIL(work._id || work.id)}
                      className="group bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300"
                    >
                      {/* Image / placeholder */}
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

                      {/* Info */}
                      <div className="p-3">
                        <p className="font-bold text-gray-850 text-xs line-clamp-1 group-hover:text-[#F26B1D] transition-colors">
                          {work.title}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          {new Date(work.date).toLocaleDateString("ar-EG")}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Services Offered */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">الخدمات المتاحة للحجز</h3>
              <span className="text-xs text-gray-450">اضغط على أي خدمة للحجز الفوري</span>
            </div>

            <div className="p-6 space-y-5">
              {/* Filter chips */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {filterCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                      activeFilter === cat
                        ? "bg-[#F26B1D] text-white border-[#F26B1D] shadow-sm"
                        : "bg-gray-55/70 text-gray-500 border-gray-200 hover:border-orange-200 hover:text-[#F26B1D]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Service list */}
              {filteredServices.length === 0 ? (
                <EmptyState message="لا توجد خدمات حالية في هذه الفئة." icon="🔧" />
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {filteredServices.map((svc) => (
                    <button
                      key={svc.id}
                      onClick={() => {
                        setSelectedService(svc.id);
                        setIsBookingOpen(true);
                      }}
                      className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100/80 hover:bg-white hover:shadow-md hover:border-orange-200 transition-all duration-200 group text-right w-full"
                    >
                      {/* Right: icon + info */}
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-orange-50/80 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform duration-300">
                          {CATEGORY_ICONS[svc.category] ?? "🔧"}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-sm group-hover:text-[#F26B1D] transition-colors">
                            {svc.title}
                          </p>
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            {SERVICE_CATEGORY_LABELS[svc.category]} • {svc.location}
                          </p>
                        </div>
                      </div>

                      {/* Left: price + action */}
                      <div className="flex items-center gap-4 shrink-0">
                        <div className="text-left">
                          <span className="block font-extrabold text-[#F26B1D] text-sm" dir="ltr">
                            {formatPrice(svc.price)}
                          </span>
                          <span className="text-[9px] text-gray-400">سعر تقديري</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-white border border-gray-100 text-[#F26B1D] group-hover:bg-[#F26B1D] group-hover:text-white transition-colors duration-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">آراء وتقييمات العملاء</h3>
              <span className="text-xs text-gray-400">{mockProfile.reviewCount} تقييم</span>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-gray-50/50 rounded-xl border border-gray-100/80 p-4.5 space-y-3"
                >
                  {/* Reviewer */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100/80 text-[#F26B1D] flex items-center justify-center font-bold text-sm shrink-0">
                      {review.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 text-xs truncate">{review.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <StarRating rating={review.rating} />
                        <span className="text-[9px] text-gray-400">{review.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-xs text-gray-650 leading-relaxed font-sans line-clamp-3">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* LEFT COLUMN: SIDEBAR WIDGETS (Quick Book, Info Card, Working Hours) */}
        <div className="space-y-6">
          
          {/* Direct call & contact card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">معلومات التواصل السريع</h3>
            
            <div className="space-y-4">
              {/* Phone item */}
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400">رقم الهاتف الجوال</span>
                  <a href={`tel:${mockProfile.phone}`} className="text-sm font-bold text-gray-800 hover:text-emerald-600 transition-colors" dir="ltr">
                    {mockProfile.phone}
                  </a>
                </div>
              </div>

              {/* Email item */}
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400">البريد الإلكتروني</span>
                  <a href={`mailto:${mockProfile.email}`} className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors break-all">
                    {mockProfile.email}
                  </a>
                </div>
              </div>

              {/* Location item */}
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F26B1D] flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400">منطقة الخدمة الحالية</span>
                  <span className="text-sm font-bold text-gray-800">
                    {mockProfile.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Booking CTA */}
            <button
              onClick={() => setIsBookingOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#F26B1D] hover:bg-[#d95914] text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm"
            >
              حجز الخدمة الآن
            </button>
          </div>

          {/* Quick Stats & Badges */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">إحصائيات الإنجاز</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100/50 text-center">
                <span className="block text-2xl font-black text-gray-800">{mockProfile.completedJobs}</span>
                <span className="text-[10px] text-gray-400 mt-1 block">عملية ناجحة</span>
              </div>
              <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100/50 text-center">
                <span className="block text-2xl font-black text-gray-800">{mockProfile.experience}</span>
                <span className="text-[10px] text-gray-400 mt-1 block">سنوات الخبرة</span>
              </div>
            </div>
            
            {/* Quick response items */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-450">سرعة الاستجابة للطلب:</span>
                <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{mockProfile.responseTime}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-450">ساعات العمل المتاحة:</span>
                <span className="font-semibold text-slate-700 bg-slate-50 px-2 py-0.5 rounded" dir="ltr">{mockProfile.workingHours}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ── INTERACTIVE DIRECT BOOKING MODAL ── */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn" dir="rtl">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-300 scale-100">
            
            {/* Header */}
            <div className="px-6 py-4.5 bg-gradient-to-l from-orange-500 to-amber-600 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">طلب حجز خدمة سريع</h3>
                <p className="text-white/80 text-[11px] mt-0.5">احجز موعدك مع {mockProfile.name} الآن</p>
              </div>
              <button
                onClick={() => setIsBookingOpen(false)}
                className="text-white/85 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {bookingSuccess ? (
                /* Success Message */
                <div className="py-8 flex flex-col items-center justify-center text-center space-y-4 animate-scaleUp">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center text-4xl shadow-md border border-emerald-100">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">تم إرسال طلب الحجز بنجاح!</h4>
                    <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                      تم استلام طلبك، وسيقوم {mockProfile.name} بالتواصل معك هاتفياً أو عبر التطبيق خلال دقائق للمتابعة.
                    </p>
                  </div>
                </div>
              ) : (
                /* Booking Form */
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  {/* Select Service */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700">اختر الخدمة المطلوبة *</label>
                    <select
                      required
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:border-orange-400 focus:bg-white transition-colors"
                    >
                      <option value="">-- اختر من قائمة خدمات الفني --</option>
                      {allServices.map((svc) => (
                        <option key={svc._id || svc.id} value={svc._id || svc.id}>
                          {svc.title} ({svc.price ? `${svc.price} ج.م` : "سعر متغير"})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Urgency selection */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700">مدى استعجال الطلب</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setUrgency("normal")}
                        className={`py-2 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                          urgency === "normal"
                            ? "bg-slate-100 border-slate-350 text-slate-800"
                            : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        حجز عادي (غير مستعجل)
                      </button>
                      <button
                        type="button"
                        onClick={() => setUrgency("urgent")}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all duration-200 ${
                          urgency === "urgent"
                            ? "bg-red-50 border-red-200 text-red-600 shadow-sm"
                            : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        ⚠️ عاجل وطارئ جداً
                      </button>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700">عنوان موقع العمل بالتفصيل *</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: القاهرة الجديدة، التجمع الخامس، شارع التسعين"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Description / Notes */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700">ملاحظات أو تفاصيل إضافية للمشكلة</label>
                    <textarea
                      rows={3}
                      placeholder="اكتب هنا أي تفاصيل إضافية أو صور عطل تود إخبار الفني بها لمساعدته على تشخيص المشكلة..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#F26B1D] hover:bg-[#d95914] text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                    >
                      إرسال الطلب للفني
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      )}
    </PageContainer>
    </div>
  );
}