import { ClipboardList, Hammer, PaintRoller, Wrench } from "lucide-react";
import { useSelector } from "react-redux";
import { useGetOrdersQuery } from "../../../services/orderApi";
import { Link } from "react-router-dom";
import { useGetRequestsQuery } from "../../../services/requestsApi";

const fallbackOrders = [
  {
    service: "سباكة",
    orderNumber: "#OF-8821",
    date: "15 مايو 2024",
    status: "مكتمل",
    action: "التفاصيل",
    icon: Hammer,
    statusClass: "bg-[#dff3e8] text-[#177245]",
  },
  {
    service: "صيانة كهرباء",
    orderNumber: "#OF-9042",
    date: "يوم أمس",
    status: "قيد التنفيذ",
    action: "تتبع",
    icon: Wrench,
    statusClass: "bg-[#ffe3cc] text-[#8a4b17]",
  },
  {
    service: "أعمال دهانات",
    orderNumber: "#OF-9105",
    date: "مجدول غدا",
    status: "معلق",
    action: "التفاصيل",
    icon: PaintRoller,
    statusClass: "bg-[#e5e8f6] text-[#66708b]",
  },
];

export default function RecentOrders() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const { data, isLoading } = useGetRequestsQuery("all");
  const ordersData = data?.data || [];
  console.log("Fetched orders data:", ordersData);
  const orders =
    isAuthenticated && Array.isArray(ordersData) && ordersData.length > 0
      ? ordersData.map((order, index) => {
          const service =
            order?.category?.name ||
            order?.service?.name ||
            order?.serviceName ||
            order?.title ||
            "خدمة";

          const statusMap = {
            pending: "معلق",
            accepted: "مقبول",
            rejected: "مرفوض",
            completed: "مكتمل",
            cancelled: "ملغي",
          };
          const status =
            statusMap[order?.status] || order?.status || "غير محدد";

          return {
            service,
            orderNumber:
              order?.orderNumber ||
              order?.code ||
              order?._id ||
              order?.id ||
              "-",
            date:
              order?.date ||
              order?.createdAt ||
              order?.created_at ||
              "تاريخ غير محدد",
            status,
            action: order?.action || "التفاصيل",
            icon:
              index % 3 === 0 ? Hammer : index % 3 === 1 ? Wrench : PaintRoller,
            statusClass:
              status === "مكتمل" || status === "completed"
                ? "bg-[#dff3e8] text-[#177245]"
                : status === "مقبول" ||
                    status === "accepted" ||
                    status === "قيد التنفيذ" ||
                    status === "in-progress"
                  ? "bg-[#ffe3cc] text-[#8a4b17]"
                  : status === "مرفوض" ||
                      status === "rejected" ||
                      status === "ملغي" ||
                      status === "cancelled"
                    ? "bg-[#fbebeb] text-[#af2323]"
                    : "bg-[#e5e8f6] text-[#66708b]",
          };
        })
      : !isAuthenticated
        ? fallbackOrders
        : [];
  console.log("Orders to display:", orders);
  return (
    <section className="rounded-[32px] border border-[#f1ddd4] bg-white p-7 shadow-[0_8px_24px_rgba(92,28,0,0.06)]">
      <header className="mb-8 flex items-center justify-between">
        <Link
          to="/client-requests"
          className="text-lg font-medium text-[#a83900]"
        >
          عرض الكل
        </Link>
        <div className="flex items-center gap-3 text-[#a83900]">
          <ClipboardList size={26} strokeWidth={2.1} />
          <h2 className="text-xl font-semibold text-[#2a160f]">
            الطلبات الأخيرة
          </h2>
        </div>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-right">
          <thead>
            <tr className="border-b border-[#f1ddd4] text-lg text-[#4a2a1d]">
              <th className="pb-5 font-bold">نوع الخدمة</th>
              <th className="pb-5 font-bold">رقم الطلب</th>
              <th className="pb-5 font-bold">التاريخ</th>
              <th className="pb-5 font-bold">الحالة</th>
              <th className="pb-5 font-bold">الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan="5"
                  className="py-8 text-center text-lg text-gray-500"
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <span className="h-8 w-8 animate-spin rounded-full border-4 border-[#ff7417] border-t-transparent"></span>
                    <span>جاري تحميل طلباتك...</span>
                  </div>
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="py-8 text-center text-lg text-gray-500"
                >
                  لا توجد طلبات سابقة.
                </td>
              </tr>
            ) : (
              orders.map(
                ({
                  service,
                  orderNumber,
                  date,
                  status,
                  action,
                  icon: Icon,
                  statusClass,
                }) => (
                  <tr
                    key={orderNumber}
                    className="border-b border-[#f6eee9] last:border-0"
                  >
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-[#fff3eb] text-[#a83900]">
                          <Icon size={21} />
                        </span>
                        <span className="text-lg font-medium text-[#2a160f]">
                          {service}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 text-lg text-[#2a160f]">
                      {orderNumber}
                    </td>
                    <td className="py-5 text-lg text-[#2a160f]">
                      {new Date(date).toLocaleDateString("ar-EG")}
                    </td>
                    <td className="py-5">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${statusClass}`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="py-5">
                      <a
                        href="#"
                        className="text-lg font-medium text-[#a83900]"
                      >
                        {action}
                      </a>
                    </td>
                  </tr>
                ),
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
