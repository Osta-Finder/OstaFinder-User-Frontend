/**
 * ============================================
 * REJECTED PAGE
 * ============================================
 * Shown when worker's approvalStatus = "rejected".
 */

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../../services/authApi";
import { logout } from "../../../store/slices/authSlice";

export default function RejectedPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [logoutMutation] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (_) {
      // ignore
    }
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const handleContact = () => {
    navigate("/contact-us");
  };

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8f9fa",
        padding: "1rem",
      }}
    >
      <div
        style={{
          maxWidth: "32rem",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Icon */}
        <div
          style={{
            marginBottom: "2rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "6rem",
              height: "6rem",
              borderRadius: "50%",
              backgroundColor: "#ffebee",
              border: "3px solid #ef5350",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "3rem", color: "#ef5350" }}
            >
              cancel
            </span>
          </div>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            color: "#191c1d",
            marginBottom: "0.75rem",
          }}
        >
          لم يتم قبول طلبك
        </h1>

        <p style={{ fontSize: "1rem", color: "#594139", marginBottom: "0.5rem" }}>
          مرحباً {user?.name?.split(" ")[0] || ""}،
        </p>

        <p
          style={{
            fontSize: "1rem",
            color: "#594139",
            marginBottom: "2rem",
            lineHeight: "1.75",
          }}
        >
          نأسف لإبلاغك أنه لم يتم قبول ملفك الشخصي في هذه المرحلة. يمكنك
          التواصل مع فريق الدعم لمعرفة السبب أو إعادة التقديم.
        </p>

        {/* Info box */}
        <div
          style={{
            backgroundColor: "#fff5f5",
            border: "1px solid #ffcdd2",
            borderRadius: "0.75rem",
            padding: "1.25rem",
            marginBottom: "2rem",
            textAlign: "right",
          }}
        >
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
            <span
              className="material-symbols-outlined"
              style={{ color: "#ef5350", fontSize: "1.5rem", flexShrink: 0 }}
            >
              info
            </span>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <li style={{ fontSize: "0.9rem", color: "#b71c1c" }}>
                قد يكون السبب عدم وضوح المستندات المرفقة
              </li>
              <li style={{ fontSize: "0.9rem", color: "#b71c1c" }}>
                أو عدم اكتمال البيانات المطلوبة
              </li>
              <li style={{ fontSize: "0.9rem", color: "#b71c1c" }}>
                تواصل مع الدعم للحصول على تفاصيل إضافية
              </li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            alignItems: "center",
          }}
        >
          <button
            onClick={handleContact}
            style={{
              backgroundColor: "#a83900",
              color: "#fff",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.75rem 2rem",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              width: "100%",
              maxWidth: "20rem",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            تواصل مع الدعم
          </button>

          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "transparent",
              border: "1px solid #ccc",
              borderRadius: "0.5rem",
              padding: "0.6rem 1.5rem",
              fontSize: "0.95rem",
              color: "#666",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#a83900";
              e.currentTarget.style.color = "#a83900";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#ccc";
              e.currentTarget.style.color = "#666";
            }}
          >
            تسجيل الخروج
          </button>
        </div>
      </div>
    </div>
  );
}
