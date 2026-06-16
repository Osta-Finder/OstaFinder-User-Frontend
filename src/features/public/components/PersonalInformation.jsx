import { ClipboardList, Pencil } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetMeQuery } from "../../../services/authApi";
import PersonalInformationModal from "./PersonalInformationModal";

export default function PersonalInformation() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const shouldFetchProfile =
    isAuthenticated ||
    (typeof window !== "undefined" &&
      localStorage.getItem("loggedIN") === "true");
  useGetMeQuery(undefined, { skip: !shouldFetchProfile });

  const fields = [
    {
      label: "الاسم الكامل",
      value: isAuthenticated ? user?.name || "غير محدد" : "غير مسجل",
    },
    {
      label: "البريد الإلكتروني",
      value: isAuthenticated ? user?.email || "غير محدد" : "غير مسجل",
    },
    {
      label: "رقم الهاتف",
      value: isAuthenticated
        ? user?.phoneNumber || user?.phone || "غير محدد"
        : "غير مسجل",
    },
  ];

  return (
    <section className="rounded-4xl border border-[#f1ddd4] bg-white p-5 md:p-7 shadow-[0_8px_24px_rgba(92,28,0,0.06)]">
      <header className="mb-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsEditOpen(true)}
          className="flex items-center cursor-pointer gap-2 text-lg font-medium text-[#a83900]"
        >
          تعديل
          <Pencil size={18} />
        </button>

        <div className="flex items-center gap-3 text-[#a83900]">
          <ClipboardList size={27} strokeWidth={2.1} />
          <h2 className="text-xl font-semibold text-[#2a160f]">
            المعلومات الشخصية
          </h2>
        </div>
      </header>

      <div className="space-y-5">
        {fields.map((field) => (
          <label key={field.label} className="block">
            <span className="mb-2 block text-sm font-medium text-[#4a2a1d]">
              {field.label}
            </span>
            <span className="flex min-h-14 items-center rounded-lg bg-[#eeecef] px-5 text-lg text-[#1f1b1d] break-all">
              {field.value}
            </span>
          </label>
        ))}
      </div>

      <PersonalInformationModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        user={user}
      />
    </section>
  );
}
