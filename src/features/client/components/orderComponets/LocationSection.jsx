import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

import { ChevronDown } from "lucide-react";

export default function LocationSection({
  selectedAddress,
  onAddressChange,
  addresses = [], 
}) {
  
  const formatSavedAddress = (addr) => {
    if (!addr) return "";
    return [addr.address, addr.street, addr.area, addr.city]
      .filter(Boolean) 
      .join(" - ");
  };

  return (
    <>
      <div className="border-t border-gray-100 pt-5 mt-5">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <span className="w-2 h-2 bg-[var(--primary-color)] rounded-full"></span>
          موقع العمل
        </h3>
      </div>

      <div className="mt-4">
        <label className="block text-xs text-gray-500 mb-2">اختر العنوان</label>

        <Listbox value={selectedAddress} onChange={onAddressChange}>
          <div className="relative">
            <ListboxButton
              className="
                w-full rounded-xl border border-gray-200
                bg-white px-4 py-3
                flex items-center justify-between
                text-sm text-right
                focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]
              "
            >
              <span className="truncate">
                {selectedAddress?._id === "custom"
                  ? selectedAddress.address || "اكتب العنوان الجديد بالأسفل..."
                  : selectedAddress 
                    ? formatSavedAddress(selectedAddress) 
                    : "اختر العنوان"}
              </span>

              <ChevronDown size={18} className="text-gray-400" />
            </ListboxButton>

            <ListboxOptions
              anchor="bottom start"
              className="
                z-50 mt-2 w-[var(--button-width)]
                rounded-xl bg-white
                border border-gray-200
                shadow-lg
                max-h-60 overflow-auto
                p-1
              "
            >
              {addresses.length > 0 &&
                addresses.map((addr) => (
                  <ListboxOption
                    key={addr._id}
                    value={addr} 
                    className="
                      cursor-pointer rounded-lg
                      px-3 py-2 text-sm
                      data-[focus]:bg-orange-50
                      data-[selected]:bg-orange-100
                    "
                  >
                    {formatSavedAddress(addr)}
                  </ListboxOption>
                ))}

              <ListboxOption
                value={{ _id: "custom", address: "" }}
                className="
                  cursor-pointer rounded-lg
                  px-3 py-2 text-sm font-medium text-orange-600 border-t border-gray-100 mt-1
                  data-[focus]:bg-orange-50
                  data-[selected]:bg-orange-100
                "
              >
                + إضافة عنوان آخر (لهذا الطلب فقط)
              </ListboxOption>
            </ListboxOptions>
          </div>
        </Listbox>

        {selectedAddress?._id === "custom" && (
          <div className="mt-3">
            <input
              type="text"
              placeholder="اكتب العنوان التفصيلي هنا (مثال: القاهرة، مدينة نصر، شارع الطيران، عمارة 5)..."
              value={selectedAddress.address}
              onChange={(e) =>
                onAddressChange({ _id: "custom", address: e.target.value })
              }
              className="
                w-full rounded-xl border border-gray-200 
                bg-white px-4 py-3 text-sm text-right
                focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]
                placeholder:text-gray-400
              "
            />
          </div>
        )}
      </div>
    </>
  );
}