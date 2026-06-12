import { ClipboardList, Hammer, PaintRoller, Wrench } from "lucide-react";
import { useSelector } from "react-redux";

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
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const userOrders = user?.orders || user?.requests || user?.recentOrders || [];
  const orders =
    isAuthenticated && Array.isArray(userOrders) && userOrders.length
      ? userOrders.map((order, index) => {
          const service =
            order?.service?.name ||
            order?.category?.name ||
            order?.serviceName ||
            order?.title ||
            "خدمة";
          const status = order?.status || order?.state || "غير محدد";

          return {
            service,
            orderNumber: order?.orderNumber || order?.code || order?._id || order?.id || "-",
            date: order?.date || order?.createdAt || order?.scheduledDate || "-",
            status,
            action: order?.action || "التفاصيل",
            icon: index % 3 === 0 ? Hammer : index % 3 === 1 ? Wrench : PaintRoller,
            statusClass:
              status === "مكتمل" || status === "completed"
                ? "bg-[#dff3e8] text-[#177245]"
                : status === "قيد التنفيذ" || status === "in-progress"
                  ? "bg-[#ffe3cc] text-[#8a4b17]"
                  : "bg-[#e5e8f6] text-[#66708b]",
          };
        })
      : fallbackOrders;

  return (
    <section className="rounded-[32px] border border-[#f1ddd4] bg-white p-7 shadow-[0_8px_24px_rgba(92,28,0,0.06)]">
      <header className="mb-8 flex items-center justify-between">
        <a href="#" className="text-lg font-medium text-[#a83900]">
          عرض الكل
        </a>
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
            {orders.map(({ service, orderNumber, date, status, action, icon: Icon, statusClass }) => (
              <tr key={orderNumber} className="border-b border-[#f6eee9] last:border-0">
                <td className="py-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-[#fff3eb] text-[#a83900]">
                      <Icon size={21} />
                    </span>
                    <span className="text-lg font-medium text-[#2a160f]">{service}</span>
                  </div>
                </td>
                <td className="py-5 text-lg text-[#2a160f]">{orderNumber}</td>
                <td className="py-5 text-lg text-[#2a160f]">{date}</td>
                <td className="py-5">
                  <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${statusClass}`}>
                    {status}
                  </span>
                </td>
                <td className="py-5">
                  <a href="#" className="text-lg font-medium text-[#a83900]">
                    {action}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
