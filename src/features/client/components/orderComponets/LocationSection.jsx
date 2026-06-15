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
  addresses,
}) {
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
                {selectedAddress?.address || "اختر العنوان"}
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
              {addresses.map((addr) => (
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
                  {addr.address}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      </div>
    </>
  );
}
