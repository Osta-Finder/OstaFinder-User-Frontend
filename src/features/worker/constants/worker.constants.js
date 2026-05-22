/**
 * ============================================
 * WORKER DOMAIN CONSTANTS & ENUMS
 * ============================================
 * Arabic labels are for DISPLAY ONLY
 * All logic uses enum values only
 */

// ============================================
// REQUEST STATUS ENUM
// ============================================
export const RequestStatus = {
  PENDING: "pending",
  AWAITING_APPROVAL: "awaiting_approval",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
};

export const REQUEST_STATUS_LABELS = {
  [RequestStatus.PENDING]: "قيد الانتظار",
  [RequestStatus.AWAITING_APPROVAL]: "بانتظار الموافقة",
  [RequestStatus.IN_PROGRESS]: "قيد التنفيذ",
  [RequestStatus.COMPLETED]: "مكتمل",
};

export const REQUEST_STATUS_CONFIG = {
  [RequestStatus.PENDING]: {
    label: "قيد الانتظار",
    badge: "bg-gray-100 text-gray-700 border border-gray-200",
    dot: "bg-green-500",
  },
  [RequestStatus.AWAITING_APPROVAL]: {
    label: "بانتظار الموافقة",
    badge: "bg-orange-50 text-orange-800 border border-orange-200",
    dot: "bg-orange-500",
  },
  [RequestStatus.IN_PROGRESS]: {
    label: "قيد التنفيذ",
    badge: "bg-blue-50 text-blue-800 border border-blue-200",
    dot: "bg-blue-500",
  },
  [RequestStatus.COMPLETED]: {
    label: "مكتمل",
    badge: "bg-green-50 text-green-800 border border-green-200",
    dot: "bg-gray-400",
  },
};

// ============================================
// SERVICE STATUS ENUM
// ============================================
export const ServiceStatus = {
  ACTIVE: "active",
  PAUSED: "paused",
  INACTIVE: "inactive",
};

export const SERVICE_STATUS_LABELS = {
  [ServiceStatus.ACTIVE]: "نشط",
  [ServiceStatus.PAUSED]: "متوقف",
  [ServiceStatus.INACTIVE]: "غير نشط",
};

export const SERVICE_STATUS_CONFIG = {
  [ServiceStatus.ACTIVE]: {
    label: "نشط",
    badge: "bg-green-50 text-green-800 border border-green-200",
    dot: "bg-green-500",
  },
  [ServiceStatus.PAUSED]: {
    label: "متوقف",
    badge: "bg-amber-50 text-amber-700 border border-amber-200",
    dot: "bg-amber-500",
  },
  [ServiceStatus.INACTIVE]: {
    label: "غير نشط",
    badge: "bg-gray-100 text-gray-600 border border-gray-200",
    dot: "bg-gray-400",
  },
};

// ============================================
// URGENCY ENUM
// ============================================
export const Urgency = {
  NORMAL: "normal",
  URGENT: "urgent",
};

export const URGENCY_LABELS = {
  [Urgency.NORMAL]: "عادي",
  [Urgency.URGENT]: "عاجل",
};

// ============================================
// SOURCE ENUM (where the job came from)
// ============================================
export const JobSource = {
  PLATFORM: "platform",
  OUTSIDE: "outside",
};

export const JOB_SOURCE_LABELS = {
  [JobSource.PLATFORM]: "من المنصة",
  [JobSource.OUTSIDE]: "خارجي",
};

// ============================================
// CATEGORY ENUM
// ============================================
export const ServiceCategory = {
  ELECTRICITY: "electricity",
  PLUMBING: "plumbing",
  AC: "ac",
  CLEANING: "cleaning",
};

export const SERVICE_CATEGORY_LABELS = {
  [ServiceCategory.ELECTRICITY]: "كهرباء",
  [ServiceCategory.PLUMBING]: "سباكة",
  [ServiceCategory.AC]: "تكييف",
  [ServiceCategory.CLEANING]: "تنظيف",
};

export const CATEGORY_ICONS = {
  [ServiceCategory.ELECTRICITY]: "⚡",
  [ServiceCategory.PLUMBING]: "💧",
  [ServiceCategory.AC]: "❄️",
  [ServiceCategory.CLEANING]: "🧹",
};