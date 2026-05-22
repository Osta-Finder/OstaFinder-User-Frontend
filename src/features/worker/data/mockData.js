/**
 * ============================================
 * UNIFIED MOCK DATA
 * ============================================
 * All data follows consistent shapes:
 * - price: number | null (never string)
 * - status: enum value only (labels are looked up)
 * - category: enum value
 * - source: enum value
 * - Arabic text is for display only
 */

import {
  RequestStatus,
  ServiceStatus,
  ServiceCategory,
  Urgency,
  JobSource,
} from "../constants/worker.constants";

// ============================================
// DASHBOARD STATS
// ============================================
export const mockDashboardStats = {
  totalOrders: { value: 142, change: "+12%", period: "هذا الأسبوع" },
  employmentRate: { value: "87%", change: "+5%", period: "هذا الشهر" },
  totalEarnings: { value: 4250, currency: "ج.م", change: "+24%", period: "هذا الشهر" },
};

// ============================================
// INCOMING REQUESTS (jobs offered to worker)
// ============================================
export const mockIncomingRequests = [
  {
    id: 101,
    clientName: "محمد العتيبي",
    serviceTitle: "صيانة تكييف دورية",
    timeAgo: "منذ ساعة",
    location: "حي الياسمين، الرياض",
    distance: "8.3 كم",
    urgency: Urgency.NORMAL,
    price: 400,
    category: ServiceCategory.AC,
  },
  {
    id: 102,
    clientName: "سارة خالد",
    serviceTitle: "عطل في الإضاءة الرئيسية",
    timeAgo: "منذ 15 دقيقة",
    location: "حي الملقا، الرياض",
    distance: "5.1 كم",
    urgency: Urgency.NORMAL,
    price: 150,
    category: ServiceCategory.ELECTRICITY,
  },
  {
    id: 103,
    clientName: "أحمد عبدالله",
    serviceTitle: "تسريب مياه في الحمام",
    timeAgo: "عاجل",
    location: "حي النرجس، الرياض",
    distance: "2.5 كم",
    urgency: Urgency.URGENT,
    price: null,
    category: ServiceCategory.PLUMBING,
  },
];

// ============================================
// WORKER SERVICES (services the worker offers)
// ============================================
export const mockWorkerServices = [
  {
    id: "s1",
    title: "تأسيس شبكة كهرباء كاملة",
    category: ServiceCategory.ELECTRICITY,
    price: 1500,
    status: ServiceStatus.ACTIVE,
    description: "تأسيس شبكة كهرباء شاملة للشقق والفلل. يشمل التمديدات، التوصيلات، واللوحات الكهربائية.",
    location: "القاهرة الكبرى",
    createdAt: "2024-10-15",
    image: null,
  },
  {
    id: "s2",
    title: "صيانة تكييفات سبليت",
    category: ServiceCategory.AC,
    price: 250,
    status: ServiceStatus.ACTIVE,
    description: "صيانة دورية وإصلاح أعطال تكييفات سبليت جميع الماركات.",
    location: "القاهرة والجيزة",
    createdAt: "2024-11-02",
    image: null,
  },
  {
    id: "s3",
    title: "إصلاح أعطال السباكة",
    category: ServiceCategory.PLUMBING,
    price: 200,
    status: ServiceStatus.PAUSED,
    description: "إصلاح تسريبات المياه وتغيير المواسير والخلاطات.",
    location: "القاهرة",
    createdAt: "2024-09-20",
    image: null,
  },
  {
    id: "s4",
    title: "تركيب وصيانة إنارة",
    category: ServiceCategory.ELECTRICITY,
    price: 300,
    status: ServiceStatus.ACTIVE,
    description: "تركيب جميع أنواع الإنارة المنزلية والتجارية مع الضمان.",
    location: "الجيزة",
    createdAt: "2024-12-01",
    image: null,
  },
];

// ============================================
// WORKS / PORTFOLIO (completed jobs)
// ============================================
export const mockWorks = [
  {
    id: "w1",
    title: "تأسيس كهرباء شقة 200 متر",
    category: ServiceCategory.ELECTRICITY,
    clientName: "أحمد محمود",
    description: "تم تأسيس شبكة كهرباء كاملة لش��ة 200 متر تشمل جميع التمديدات واللوحات والمفاتيح.",
    date: "2024-10-20",
    source: JobSource.PLATFORM,
    status: RequestStatus.COMPLETED,
    location: "المعادي، القاهرة",
    price: 1200,
    images: [],
  },
  {
    id: "w2",
    title: "صيانة تكييف مركزي",
    category: ServiceCategory.AC,
    clientName: "سارة أحمد",
    description: "صيانة شاملة لنظام تكييف مركزي في فيلا. تنظيف فلاتر وشحن فريون.",
    date: "2024-11-05",
    source: JobSource.PLATFORM,
    status: RequestStatus.COMPLETED,
    location: "التجمع الخامس، القاهرة",
    price: 800,
    images: [],
  },
  {
    id: "w3",
    title: "إصلاح تسريب مياه",
    category: ServiceCategory.PLUMBING,
    clientName: "محمد علي",
    description: "تم إصلا�� تسريب مياه رئيسي في الحمام وتغيير المواسير التالفة.",
    date: "2024-09-15",
    source: JobSource.OUTSIDE,
    status: RequestStatus.COMPLETED,
    location: "مدينة نصر، القاهرة",
    price: 350,
    images: [],
  },
  {
    id: "w4",
    title: "تركيب لوحة كهرباء",
    category: ServiceCategory.ELECTRICITY,
    clientName: "خالد عبدالرحمن",
    description: "تركيب لوحة كهرباء رئيسية جديدة مع القواطع والتوصيلات.",
    date: "2024-08-10",
    source: JobSource.OUTSIDE,
    status: RequestStatus.COMPLETED,
    location: "المهندسين، الجيزة",
    price: 600,
    images: [],
  },
  {
    id: "w5",
    title: "صيانة دورية لتكييفات مكتب",
    category: ServiceCategory.AC,
    clientName: "شركة النور",
    description: "صيانة دورية لعدد 5 وحدات تكييف سبليت في مكتب إداري.",
    date: "2024-12-01",
    source: JobSource.PLATFORM,
    status: RequestStatus.COMPLETED,
    location: "وسط البلد، القاهرة",
    price: 500,
    images: [],
  },
];

// ============================================
// DASHBOARD RECENT REQUESTS
// ============================================
export const mockDashboardRequests = [
  {
    id: 1,
    title: "إصلاح لوحة كهرباء رئيسية",
    location: "المعادي، القاهرة",
    time: "اليوم، 10:00 صباحاً",
    status: RequestStatus.PENDING,
    price: 350,
    category: ServiceCategory.ELECTRICITY,
    urgency: Urgency.NORMAL,
  },
  {
    id: 2,
    title: "تسريب مياه في الحمام",
    location: "التجمع الخامس، القاهرة",
    time: "اليوم، 12:30 ظهراً",
    status: RequestStatus.AWAITING_APPROVAL,
    price: null,
    category: ServiceCategory.PLUMBING,
    urgency: Urgency.URGENT,
  },
  {
    id: 3,
    title: "صيانة تكييف سبليت",
    location: "مدينة نصر، القاهرة",
    time: "أمس، 04:00 مساءً",
    status: RequestStatus.IN_PROGRESS,
    price: 400,
    category: ServiceCategory.AC,
    urgency: Urgency.NORMAL,
  },
  {
    id: 4,
    title: "تغيير خلاط مطبخ",
    location: "المهندسين، الجيزة",
    time: "12 أكتوبر، 02:00 مساءً",
    status: RequestStatus.COMPLETED,
    price: 250,
    category: ServiceCategory.PLUMBING,
    urgency: Urgency.NORMAL,
  },
];

// ============================================
// LEGACY EXPORT (for backward compat until migrated)
// ============================================
// eslint-disable-next-line react-hooks/rules-of-hooks
export const mockServices = mockDashboardRequests.map((req) => ({
  id: req.id,
  title: req.title,
  location: req.location,
  time: req.time,
  price: req.price,
  status: req.status,
  icon: req.category === ServiceCategory.ELECTRICITY ? "⚡" :
        req.category === ServiceCategory.PLUMBING ? "💧" :
        req.category === ServiceCategory.AC ? "❄️" : "🔧",
}));

// ============================================
// HELPERS
// ============================================
export const formatPrice = (price, currency = "ج.م") => {
  if (price === null || price === undefined) return "---";
  return `${price.toLocaleString()} ${currency}`;
};