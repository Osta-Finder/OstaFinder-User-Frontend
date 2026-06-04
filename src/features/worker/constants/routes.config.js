/**
 * ============================================
 * WORKER ROUTES CONFIGURATION
 * ============================================
 * Single source of truth for all worker routes
 * Use these constants everywhere to avoid mismatches
 */

export const WorkerRoutes = {
  // Base
  DASHBOARD: "/worker/dashboard",

  // Requests
  REQUESTS: "/worker/requests",
  REQUEST_DETAIL: (id) => `/worker/requests/${id}`,

  // Services
  SERVICES: "/worker/services",
  SERVICE_ADD: "/worker/services/add",
  SERVICE_DETAIL: (id) => `/worker/services/${id}`,

  // Works (portfolio)
  WORKS: "/worker/works",
  WORK_DETAIL: (id) => `/worker/works/${id}`,

  // Other
  WALLET: "/worker/wallet",
  SUPPORT: "/worker/support",
  PROFILE: "/worker/profile",
};

export const WorkerNavItems = [
  {
    path: WorkerRoutes.DASHBOARD,
    label: "لوحة التحكم",
    icon: "LayoutDashboard",
  },
  {
    path: WorkerRoutes.REQUESTS,
    label: "إدارة الطلبات",
    icon: "ClipboardList",
  },
  {
    path: WorkerRoutes.WORKS,
    label: "معرض أعمالي",
    icon: "Briefcase",
  },
  {
    path: WorkerRoutes.WALLET,
    label: "المحفظة",
    icon: "Wallet",
  },
  {
    path: WorkerRoutes.SUPPORT,
    label: "الدعم الفني",
    icon: "Headphones",
  },
];