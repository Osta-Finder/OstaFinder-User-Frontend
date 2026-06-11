import {
  ChevronLeft,
  CreditCard,
  Headphones,
  LogOut,
  MapPin,
  ShieldCheck,
  User,
} from "lucide-react";
import { useSelector } from "react-redux";
import clientAvatar from "../../../assets/images/client_avatar.png";
import { useLogoutMutation } from "../../../services/authApi";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { label: "ملفي الشخصي", icon: User, active: true },
  { label: "عناويني", icon: MapPin },
  { label: "طرق الدفع", icon: CreditCard },
  { label: "مركز المساعدة", icon: Headphones },
];

const roleLabels = {
  client: "عميل",
  worker: "فني",
};

export default function AccountSidebar() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const displayName = isAuthenticated && user?.name ? user.name : "مستخدم";
  const membershipValue =
    user?.membership || user?.membershipType || user?.role || "عضو بريميوم";
  const membershipLabel =
    typeof membershipValue === "string"
      ? roleLabels[membershipValue.toLowerCase()] || membershipValue
      : membershipValue;
  const avatarSrc =
    user?.avatar || user?.image || user?.profileImage || clientAvatar;

  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <aside className="w-full rounded-4xl border border-[#f1ddd4] bg-white p-6 shadow-[0_8px_24px_rgba(92,28,0,0.06)] lg:max-w-71.25">
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={avatarSrc}
            alt={displayName}
            className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-[0_4px_18px_rgba(21,9,5,0.18)]"
          />
          <span className="absolute bottom-2 right-1 grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-[#10b759] text-white">
            <ShieldCheck size={18} />
          </span>
        </div>

        <h2 className="mt-6 text-xl font-semibold text-[#2a160f]">
          {displayName}
        </h2>
        <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#ffe0ce] px-3 py-1 text-sm font-medium text-brand-brown">
          {membershipLabel}
        </span>
      </div>

      <nav className="mt-9 space-y-3">
        {menuItems.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            type="button"
            className={`flex h-16 w-full items-center justify-between rounded-lg px-5 text-lg transition ${
              active
                ? "bg-[#ff7417] text-[#2a160f]"
                : "bg-transparent text-[#4a2a1d] hover:bg-[#fff3eb]"
            }`}
          >
            <span className="flex items-center gap-3">
              <Icon size={24} strokeWidth={2.1} />
              {label}
            </span>
            {active && <ChevronLeft size={20} />}
          </button>
        ))}
      </nav>

      <div className="mt-8 border-t border-[#f1ddd4] pt-5">
        <button
          type="button"
          className="flex h-12 w-full hover:bg-red-500 hover:text-white rounded-2xl items-center justify-end cursor-pointer gap-3 px-5 text-lg font-medium text-[#dc2626]"
          onClick={handleLogout}
        >
          تسجيل الخروج
          <LogOut size={23} />
        </button>
      </div>
    </aside>
  );
}
