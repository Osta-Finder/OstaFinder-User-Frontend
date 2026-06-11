import { Building2, Home, Map, Plus } from "lucide-react";
import { useSelector } from "react-redux";

const fallbackAddresses = [
  {
    id: "home",
    title: "المنزل",
    description: "شارع العليا، حي المروج، الرياض",
    icon: Home,
    iconClass: "bg-[#ffe0ce] text-[#a83900]",
  },
  {
    id: "work",
    title: "العمل",
    description: "برج المملكة، طريق الملك فهد",
    icon: Building2,
    iconClass: "bg-[#eceff6] text-[#3e4b63]",
  },
];

export default function SavedAddresses() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const userAddresses =
    user?.addresses || user?.savedAddresses || user?.locations || [];
  const singleAddress = user?.address || user?.location;
  const dynamicAddresses = Array.isArray(userAddresses)
    ? userAddresses.map((address, index) => ({
        id: address?._id || address?.id || `address-${index}`,
        title: address?.title || address?.label || `عنوان ${index + 1}`,
        description:
          address?.description ||
          address?.address ||
          address?.street ||
          address?.city ||
          String(address || ""),
        icon: index === 0 ? Home : Building2,
        iconClass:
          index === 0
            ? "bg-[#ffe0ce] text-[#a83900]"
            : "bg-[#eceff6] text-[#3e4b63]",
      }))
    : [];
  const addresses =
    isAuthenticated && dynamicAddresses.length
      ? dynamicAddresses
      : isAuthenticated && singleAddress
        ? [
            {
              id: "main-address",
              title: "العنوان الرئيسي",
              description: singleAddress,
              icon: Home,
              iconClass: "bg-[#ffe0ce] text-[#a83900]",
            },
          ]
        : fallbackAddresses;

  return (
    <section className="rounded-[32px] border border-[#f1ddd4] bg-white p-7 shadow-[0_8px_24px_rgba(92,28,0,0.06)]">
      <header className="mb-7 flex items-center justify-between">
        <div className="flex items-center gap-3 text-[#a83900]">
          <Map size={26} strokeWidth={2.1} />
          <h2 className="text-xl font-semibold text-[#2a160f]">
            العناوين المحفوظة
          </h2>
        </div>
      </header>

      <div className="space-y-3">
        {addresses.map(({ id, title, description, icon: Icon, iconClass }) => (
          <article
            key={id}
            className="flex min-h-24 items-center justify-between rounded-lg border border-[#f1ddd4] px-5 py-4"
          >
            <div className={`grid h-12 w-12 place-items-center rounded-full ${iconClass}`}>
              <Icon size={24} />
            </div>
            <div className="text-right">
              <h3 className="text-lg font-semibold text-[#2a160f]">{title}</h3>
              <p className="mt-1 text-sm text-[#4d3328]">{description}</p>
            </div>
          </article>
        ))}

        <button
          type="button"
          className="flex min-h-20 w-full items-center justify-center gap-4 rounded-lg border-2 border-dashed border-[#e7b9a7] text-lg font-medium text-[#4a2a1d]"
        >
          <Plus size={24} />
          إضافة عنوان جديد
        </button>
      </div>
    </section>
  );
}
