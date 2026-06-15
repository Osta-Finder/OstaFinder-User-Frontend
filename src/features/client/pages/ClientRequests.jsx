import { useState, useMemo, Fragment } from "react";
import { Link } from "react-router-dom";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import clsx from "clsx";
import { XCircle, AlertCircle } from "lucide-react";
import OrderStatusBadge from "../components/OrderStatusBadge";
import Rating from "../../../components/ui/Rating";
import CuButton from "../../../components/ui/Button";
import TableSkeleton from "../../../components/ui/TableSkeleton";
import OrderDetailModal from "../components/OrderDetailModal";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import NotificationDialog from "../../../components/ui/NotificationDialog";
import Pagination from "../components/categoriesComponents/Pagination";
import {
  STATUS_TABS,
  getCountColor,
  getCountBg,
} from "../constants/orderConstants";
import {
  useGetRequestStatsQuery,
  useGetRequestsQuery,
  useCancelRequestMutation,
} from "../../../services/requestsApi";

const API_TO_STATUS = {
  معلقة: "pending",
  مقبولة: "accepted",
  "قيد التنفيذ": "in_progress",
  مكتملة: "completed",
  مرفوضة: "rejected",
  ملغية: "cancelled",
};

const STATUS_STEP = {
  pending: 1,
  accepted: 2,
  in_progress: 3,
  completed: 4,
  rejected: 1,
  cancelled: 1,
};

const STATS_KEY_MAP = {
  all: "الكل",
  pending: "معلقة",
  accepted: "مقبولة",
  in_progress: "قيد التنفيذ",
  completed: "مكتملة",
  rejected: "مرفوضة",
};

function transformOrder(item) {
  const workerName = item.worker?.name || item.worker || "";
  const serviceName = item.service?.name || item.service || "";
  return {
    id: item.requestNumber,
    _id: item._id,
    service: serviceName,
    worker: workerName,
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(workerName || "U")}`,
    date: item.date ? new Date(item.date).toLocaleDateString("ar-EG") : "",
    amount: item.amount || 0,
    total: item.amount || 0,
    status: API_TO_STATUS[item.status] || item.status || "pending",
    currentStep: STATUS_STEP[API_TO_STATUS[item.status] || item.status] || 1,
    location: item.address || item.location || "",
    description: item.description || "",
    time: item.time || "",
    platformFee: item.platformFee || 0,
    requestNumber: item.requestNumber,
    rating: item.rating || null,
  };
}

export default function ClientRequests() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [notification, setNotification] = useState(null);
  const [page, setPage] = useState(1);

  const selectedTab = STATUS_TABS[selectedIndex]?.key || "all";
  const filterStatus = selectedTab === "all" ? undefined : selectedTab;

  const { data: statsData } = useGetRequestStatsQuery();
  const { data: requestsData, isLoading } = useGetRequestsQuery({ status: filterStatus, page });
  const [cancelRequest] = useCancelRequestMutation();

  const orders = useMemo(() => {
    if (!requestsData?.data) return [];
    return requestsData.data.map(transformOrder);
  }, [requestsData]);

  const pagination = requestsData?.pagination;
  const stats = statsData?.data;

  const handleTabChange = (index) => {
    setSelectedIndex(index);
    setPage(1);
  };

  const handleCancelConfirm = async () => {
    try {
      await cancelRequest(cancelTarget._id).unwrap();
      setNotification({
        title: "تم الإلغاء",
        message: `تم إلغاء الطلب #${cancelTarget.id}`,
        type: "success",
      });
    } catch {
      setNotification({
        title: "خطأ",
        message: "فشل إلغاء الطلب",
        type: "error",
      });
    }
    setCancelTarget(null);
  };

  const renderOrders = (orders) => {
    if (isLoading) {
      return <TableSkeleton />;
    }

    return (
      <>
        <div className="block lg:hidden">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center">
              <AlertCircle
                className="mb-3 h-10 w-10"
                style={{ color: "var(--text-secondary)" }}
              />
              <p className="font-medium text-gray-900">لا توجد طلبات</p>
              <p
                className="mt-1 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                لا توجد طلبات بهذه الحالة
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {orders.map((order) => (
                <div
                  key={order.id || order._id}
                  onClick={() => setSelectedOrder(order)}
                  className="cursor-pointer p-4 transition-colors hover:bg-gray-50"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900">
                      #{order.id}
                    </span>
                    <div className="flex items-center gap-2">
                      {order.status === "pending" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCancelTarget(order);
                          }}
                          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          إلغاء
                        </button>
                      )}
                      <OrderStatusBadge status={order.status} />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {order.service}
                  </p>
                  <p
                    className="mt-1 text-xs"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {order.worker} - {order.date}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span
                      className="text-sm font-bold"
                      style={{ color: "var(--primary-color)" }}
                    >
                      {order.total} ج.م
                    </span>
                    {order.rating ? (
                      <Rating rating={order.rating.stars} size="sm" />
                    ) : order.status === "completed" ? (
                      <Link
                        to="/client-ratings"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <CuButton className="!py-1 !px-3 !text-xs">
                          قيم الخدمة الآن!
                        </CuButton>
                      </Link>
                    ) : order.status === "rejected" ||
                      order.status === "cancelled" ? null : (
                      <span className="text-xs text-gray-400">
                        بعد اكتمال الخدمة
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="hidden lg:block">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center">
              <AlertCircle
                className="mb-3 h-10 w-10"
                style={{ color: "var(--text-secondary)" }}
              />
              <p className="font-medium text-gray-900">لا توجد طلبات</p>
              <p
                className="mt-1 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                {isLoading ? "جاري التحميل..." : "لا توجد طلبات بهذه الحالة"}
              </p>
            </div>
          ) : (
            <table className="w-full text-right text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-6 py-4 font-semibold text-gray-900">
                    رقم الطلب
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-900">
                    الخدمة
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-900">
                    الصنايعي
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-900">
                    التاريخ
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-900">
                    المبلغ
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-900">
                    الحالة
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-900">
                    التقييم
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-900"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr
                    key={order.id || order._id}
                    onClick={() => setSelectedOrder(order)}
                    className="cursor-pointer transition-colors hover:bg-gray-50/80"
                  >
                    <td className="px-6 py-4 font-bold text-gray-900">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 text-gray-900">{order.service}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={order.avatar}
                          alt={order.worker}
                          className="h-7 w-7 rounded-full bg-gray-100"
                        />
                        <span className="text-gray-900">{order.worker}</span>
                      </div>
                    </td>
                    <td style={{ color: "var(--text-secondary)" }}>
                      {order.date}
                    </td>
                    <td className="font-medium text-gray-900">
                      {order.total} ج.م
                    </td>
                    <td>
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td>
                      {order.rating ? (
                        <Rating rating={order.rating.stars} size="sm" />
                      ) : order.status === "completed" ? (
                        <Link
                          to="/client-ratings"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <CuButton className="!py-1 !px-3 !text-xs">
                            قيم الخدمة الآن!
                          </CuButton>
                        </Link>
                      ) : order.status === "rejected" ||
                        order.status === "cancelled" ? (
                        <span className="text-xs text-gray-300">—</span>
                      ) : (
                        <span className="text-xs text-gray-400">
                          بعد اكتمال الخدمة
                        </span>
                      )}
                    </td>
                    <td>
                      {order.status === "pending" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCancelTarget(order);
                          }}
                          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          إلغاء
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </>
    );
  };

  return (
    <div
      className="min-h-screen pt-24"
      style={{ background: "var(--bg-color)" }}
    >
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900">طلباتي</h1>

        <TabGroup selectedIndex={selectedIndex} onChange={handleTabChange}>
          <TabList className="mt-6 flex flex-wrap gap-2" dir="ltr">
            {STATUS_TABS.map(({ key, label, color }) => {
              const count = stats ? stats[STATS_KEY_MAP[key]] || 0 : 0;
              return (
                <Tab as={Fragment} key={key}>
                  {({ selected, hover }) => (
                    <button
                      className={clsx(
                        "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-200",
                      )}
                      style={{
                        background: selected
                          ? getCountColor(color)
                          : hover
                            ? getCountBg(color)
                            : "#f3f4f6",
                        color: selected ? "#fff" : "#6b7280",
                      }}
                    >
                      {label}
                      <span
                        className="inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs"
                        style={{
                          background: selected
                            ? "rgba(255,255,255,0.25)"
                            : getCountBg(color),
                          color: selected ? "#fff" : getCountColor(color),
                        }}
                      >
                        {count}
                      </span>
                    </button>
                  )}
                </Tab>
              );
            })}
          </TabList>

          <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <TabPanels>
              {STATUS_TABS.map(({ key }) => (
                <TabPanel key={key}>
                  {renderOrders(orders)}
                  <Pagination
                    pagination={pagination || {}}
                    currentPage={page}
                    onPageChange={setPage}
                  />
                </TabPanel>
              ))}
            </TabPanels>
          </div>
        </TabGroup>
      </div>

      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />

      <ConfirmDialog
        open={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={handleCancelConfirm}
        title="إلغاء الطلب"
        message={`هل أنت متأكد من إلغاء الطلب #${cancelTarget?.id}؟`}
        confirmText="نعم، إلغاء"
        cancelText="تراجع"
        variant="danger"
      />

      <NotificationDialog
        open={!!notification}
        onClose={() => setNotification(null)}
        title={notification?.title}
        message={notification?.message}
        type={notification?.type}
      />
    </div>
  );
}
