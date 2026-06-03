import { useState, Fragment } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import clsx from "clsx";
import { XCircle, AlertCircle } from "lucide-react";
import ORDERS from "../../../mock/orders";
import OrderStatusBadge from "../components/OrderStatusBadge";
import OrderDetailModal from "../components/OrderDetailModal";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import NotificationDialog from "../../../components/ui/NotificationDialog";
import {
  STATUS_TABS,
  getStatusCount,
  getCountColor,
  getCountBg,
} from "../constants/orderConstants";

export default function ClientRequests() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleCancelConfirm = () => {
    setNotification({ title: "تم الإلغاء", message: `تم إلغاء الطلب #${cancelTarget}`, type: "success" });
    setCancelTarget(null);
  };

  const renderOrders = (orders) => (
    <>
      {/* Mobile: card layout */}
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
                key={order.id}
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
                          setCancelTarget(order.id);
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop: table layout */}
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
              لا توجد طلبات بهذه الحالة
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
                <th className="px-6 py-4 font-semibold text-gray-900"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr
                  key={order.id}
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
                    {order.status === "pending" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCancelTarget(order.id);
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

  return (
    <div
      className="min-h-screen pt-24"
      style={{ background: "var(--bg-color)" }}
    >
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-gray-900">طلباتي</h1>

        {/* Status Tabs */}
        <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <TabList className="mt-6 flex flex-wrap gap-2" dir="ltr">
            {STATUS_TABS.map(({ key, label, color }) => {
              const count = getStatusCount(ORDERS, key);
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

          {/* Table Section */}
          <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <TabPanels>
              {STATUS_TABS.map(({ key }) => {
                const panelOrders =
                  key === "all"
                    ? ORDERS
                    : ORDERS.filter((o) => o.status === key);
                return (
                  <TabPanel key={key}>{renderOrders(panelOrders)}</TabPanel>
                );
              })}
            </TabPanels>
          </div>
        </TabGroup>
      </div>

      {/* Detail Modal */}
      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />

      {/* Cancel Confirmation */}
      <ConfirmDialog
        open={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={handleCancelConfirm}
        title="إلغاء الطلب"
        message={`هل أنت متأكد من إلغاء الطلب #${cancelTarget}؟`}
        confirmText="نعم، إلغاء"
        cancelText="تراجع"
        variant="danger"
      />

      {/* Result Notification */}
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
