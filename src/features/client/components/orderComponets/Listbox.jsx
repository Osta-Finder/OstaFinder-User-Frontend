import { Listbox as HListbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { Check, ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import DynamicIcon from "../../../../utils/DynamicIcon"

export default function Listbox({ categories, selectedId, onSelect, readOnly, readOnlyLabel }) {
  const selected = categories.find(c => c._id === selectedId) || null

  return (
    <>
      <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-[var(--primary-color)] rounded-full"></span> فئة الخدمة
      </h3>

      {readOnly ? (
        <div className="flex items-center gap-2 w-full rounded-xl border border-gray-200 bg-gray-50 py-3 px-4 text-sm text-gray-600 cursor-not-allowed">
          {selected && <DynamicIcon iconString={selected.icon} className="w-5 h-5 text-[var(--primary-color)] shrink-0" />}
          <span>{readOnlyLabel || selected?.name}</span>
        </div>
      ) : (
        <HListbox value={selected} onChange={(cat) => onSelect(cat._id)}>
          <ListboxButton
            className={clsx(
              'relative w-full rounded-xl border py-3 pr-10 pl-3 text-right text-sm transition',
              'focus:outline-none focus:border-[var(--primary-color)]',
              selected
                ? 'border-gray-200 text-gray-800'
                : 'border-gray-200 text-gray-400'
            )}
          >
            {selected ? (
              <span className="flex items-center gap-2">
                <DynamicIcon iconString={selected.icon} className="w-5 h-5 text-[var(--primary-color)] shrink-0" />
                <span>{selected.name}</span>
              </span>
            ) : (
              "اختر فئة الخدمة..."
            )}
            <ChevronDown
              className="absolute left-3 top-3.5 size-4 text-gray-400"
              aria-hidden="true"
            />
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            transition
            className={clsx(
              'w-(--button-width) rounded-xl border border-gray-100 bg-white p-1 shadow-lg mt-1 z-50',
              'transition duration-100 ease-in data-leave:data-closed:opacity-0'
            )}
          >
            {categories.map((cat) => (
              <ListboxOption
                key={cat._id}
                value={cat}
                className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-2.5 select-none data-focus:bg-[var(--primary-light)]"
              >
                <Check className="invisible size-4 fill-[var(--primary-color)] group-data-selected:visible shrink-0" />
                <DynamicIcon iconString={cat.icon} className="w-5 h-5 text-gray-400 group-data-selected:text-[var(--primary-color)] shrink-0" />
                <div className="text-sm text-gray-700 group-data-selected:text-[var(--blacker)] group-data-selected:font-bold">
                  {cat.name}
                </div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </HListbox>
      )}
    </>
  )
}
