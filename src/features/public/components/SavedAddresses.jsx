import { Building2, Home, Map, Plus, Pencil } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddAddressModal from "./AddAddressModal";

const emptyStateText = "لا توجد عناوين محفوظة حتى الآن";

export default function SavedAddresses() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState(null);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const userAddresses = Array.isArray(user?.addresses) ? user.addresses : [];
  const dynamicAddresses = userAddresses.map((address, index) => {
    const parts = [];
    if (address?.apartment) parts.push(`شقة ${address.apartment}`);
    if (address?.floor) parts.push(`الدور ${address.floor}`);
    if (address?.buildingNumber) parts.push(`عمارة ${address.buildingNumber}`);
    if (address?.street) parts.push(address.street);
    if (address?.area) parts.push(address.area);
    if (address?.city) parts.push(address.city);

    const baseAddress = parts.filter(Boolean).join("، ");
    const detailedDesc = address?.address || address?.description || "";
    const description =
      baseAddress && detailedDesc
        ? `${baseAddress} - ${detailedDesc}`
        : baseAddress || detailedDesc || "";

    return {
      id: address?._id || address?.id || `address-${index}`,
      title: address?.title || address?.label || `عنوان ${index + 1}`,
      description,
      icon: index === 0 ? Home : Building2,
      iconClass:
        index === 0
          ? "bg-[#ffe0ce] text-[#a83900]"
          : "bg-[#eceff6] text-[#3e4b63]",
      rawAddress: address,
    };
  });
  const addresses = isAuthenticated ? dynamicAddresses : [];

  const handleAddClick = () => {
    if (!isAuthenticated) {
      toast.info("يرجى تسجيل الدخول لإضافة عنوان جديد");
      return;
    }

    setAddressToEdit(null);
    setIsAddOpen(true);
  };

  const handleEditClick = (address) => {
    if (!isAuthenticated) {
      toast.info("يرجى تسجيل الدخول لتعديل العنوان");
      return;
    }

    setAddressToEdit(address);
    setIsAddOpen(true);
  };

  return (
    <section className="rounded-4xl border border-[#f1ddd4] bg-white p-5 md:p-7 shadow-[0_8px_24px_rgba(92,28,0,0.06)]">
      <header className="mb-7 flex items-center justify-between">
        <div className="flex items-center gap-3 text-[#a83900]">
          <Map size={26} strokeWidth={2.1} />
          <h2 className="text-xl font-semibold text-[#2a160f]">
            العناوين المحفوظة
          </h2>
        </div>
      </header>

      <div className="space-y-3">
        {isAuthenticated && !addresses.length ? (
          <div className="rounded-lg border border-[#f1ddd4] px-5 py-6 text-center text-[#4d3328]">
            {emptyStateText}
          </div>
        ) : null}

        {addresses.map(({ id, title, description, icon: Icon, iconClass, rawAddress }) => (
          <article
            key={id}
            className="flex min-h-24 items-center justify-between gap-4 rounded-lg border border-[#f1ddd4] px-4 py-4 sm:px-5"
          >
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div
                className={`grid h-12 w-12 place-items-center rounded-full shrink-0 ${iconClass}`}
              >
                <Icon size={24} className="shrink-0" />
              </div>
              <div className="text-right min-w-0">
                <h3 className="text-lg font-semibold text-[#2a160f] truncate">{title}</h3>
                <p className="mt-1 text-sm text-[#4d3328] break-words">{description}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleEditClick(rawAddress)}
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#4a2a1d] hover:bg-[#fff3eb] transition-colors"
              aria-label="تعديل العنوان"
              title="تعديل العنوان"
            >
              <Pencil size={20} className="shrink-0" />
            </button>
          </article>
        ))}

        <button
          type="button"
          onClick={handleAddClick}
          className="flex min-h-20 cursor-pointer hover:bg-[#f1ddd4] w-full items-center justify-center gap-4 rounded-lg border-2 border-dashed border-[#e7b9a7] text-lg font-medium text-[#4a2a1d]"
        >
          <Plus size={24} />
          إضافة عنوان جديد
        </button>
      </div>

      <AddAddressModal
        isOpen={isAddOpen}
        onClose={() => {
          setIsAddOpen(false);
          setAddressToEdit(null);
        }}
        user={user}
        addressToEdit={addressToEdit}
      />
    </section>
  );
}
