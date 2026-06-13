/**
 * ============================================
 * APPROVAL PENDING PAGE
 * ============================================
 * Shown when worker has completed onboarding but
 * approvalStatus = "pending" (waiting admin review).
 */

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../../services/authApi";
import { logout } from "../../../store/slices/authSlice";
import { useGetMeQuery } from "../../../services/authApi";

export default function ApprovalPendingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // Poll every 30 seconds to check if approval changed
  const { data: freshUser } = useGetMeQuery(undefined, {
    pollingInterval: 30000,
  });

  const [logoutMutation] = useLogoutMutation();

  // If approval came through while on this page, navigate away
  const effectiveUser = freshUser || user;
  if (effectiveUser?.approvalStatus === "approved") {
    navigate("/worker/dashboard", { replace: true });
    return null;
  }
  if (effectiveUser?.approvalStatus === "rejected") {
    navigate("/worker/rejected", { replace: true });
    return null;
  }

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (_) {
      // ignore
    }
    dispatch(logout());
    navigate("/login", { replace: true });
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
              backgroundColor: "#fff3e0",
              border: "3px solid #ff9800",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "3rem", color: "#ff9800" }}
            >
              hourglass_top
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
          طلبك قيد المراجعة
        </h1>

        <p style={{ fontSize: "1rem", color: "#594139", marginBottom: "0.5rem" }}>
          مرحباً {effectiveUser?.name?.split(" ")[0] || ""}،
        </p>

        <p
          style={{
            fontSize: "1rem",
            color: "#594139",
            marginBottom: "2rem",
            lineHeight: "1.75",
          }}
        >
          تم استلام ملفك الشخصي وهو الآن قيد المراجعة من قبل فريقنا. ستتلقى
          إشعاراً فور اتخاذ القرار.
        </p>

        {/* Info box */}
        <div
          style={{
            backgroundColor: "#fff8f0",
            border: "1px solid #ffe0b2",
            borderRadius: "0.75rem",
            padding: "1.25rem",
            marginBottom: "2rem",
            textAlign: "right",
          }}
        >
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
            <span
              className="material-symbols-outlined"
              style={{ color: "#ff9800", fontSize: "1.5rem", flexShrink: 0 }}
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
              <li style={{ fontSize: "0.9rem", color: "#5d4037" }}>
                ✓ مدة المراجعة عادةً 24 - 48 ساعة عمل
              </li>
              <li style={{ fontSize: "0.9rem", color: "#5d4037" }}>
                ✓ ستظهر لك نتيجة القرار تلقائياً عند تحديث الصفحة
              </li>
              <li style={{ fontSize: "0.9rem", color: "#5d4037" }}>
                ✓ تأكد من صحة بريدك الإلكتروني لاستقبال الإشعار
              </li>
            </ul>
          </div>
        </div>

        {/* Refresh hint */}
        <p style={{ fontSize: "0.85rem", color: "#9e9e9e", marginBottom: "1.5rem" }}>
          يتم التحقق من حالة طلبك تلقائياً كل 30 ثانية
        </p>

        {/* Logout */}
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
  );
}
