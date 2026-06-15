import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AboutCTA() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  console.log("Authenticated user in AboutCTA:", { user, isAuthenticated });
  const navigate = useNavigate();
  const handleJoinClick = () => {
    if (user?.role === "client") {
      toast.info("أنت بالفعل مسجل كعميل. يرجى تسجيل الخروج وإنشاء حساب جديد كفني.", {
        position: "top-right",
        rtl: true,
        theme: "light",
      });
    }
    navigate("/register?role=worker");
  };
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden bg-brand-brown rounded-3xl py-16 px-8 md:px-16 text-center text-white shadow-xl">
          {/* Background Decorative SVG Watermark */}
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10 pointer-events-none w-64 h-64 md:w-96 md:h-96">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-full h-full text-white"
            >
              {/* Construction Hat Shape */}
              <path d="M2 12a10 10 0 0 1 20 0v1h-20v-1z" />
              <path d="M12 2v10" />
              <path d="M12 2a4 4 0 0 1 4 4H8a4 4 0 0 1 4-4z" />
              {/* Wrench Cross */}
              <path d="M4 16h16" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
              هل أنت فني محترف؟
            </h2>
            <p className="text-lg md:text-xl text-orange-100/90 font-light mb-10 leading-relaxed max-w-2xl">
              انضم إلى أكبر شبكة من الفنيين المعتمدين في مصر وزد من دخلك وعملائك
              اليوم.
            </p>
            <button
              className="px-10 py-4 cursor-pointer bg-white text-brand-brown font-bold text-lg rounded-full shadow-lg hover:bg-orange-50 transition duration-300 transform hover:scale-105 active:scale-100"
              onClick={handleJoinClick}
            >
              انضم إلى فريقنا الآن
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
