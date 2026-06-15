import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../../components/ui/Button";
import RoleToggle from "../../../components/ui/RoleToggle";
import { useLoginMutation } from "../../../services/authApi";
import InputField from "../components/InputField";
import { validateLoginForm } from "../schemas/auth.schema";
import { useDispatch } from "react-redux";
import { resetOnboarding } from "../../../store/slices/onboardingSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State for form fields
  const [formData, setFormData] = useState({
    emailorPhone: "", // Can be Email or Phone
    password: "",
    role: "client",
  });

  // Validation errors
  const [errors, setErrors] = useState({});
  // Form submission state
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for that field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({
      ...prev,
      role,
    }));
  };

  // Handle form submission
  const [login, { isLoading: isLoggingIn, error: loginError }] =
    useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateLoginForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const result = await login(formData).unwrap();
      localStorage.setItem("loggedIN", "true");
      dispatch(resetOnboarding());
      toast.success("تم تسجيل الدخول بنجاح! جاري التوجيه...", {
        position: "top-left",
        rtl: true,
        theme: "light",
      });

      const user = result.user;
      const role = user?.role;

      setTimeout(() => {
        if (role === "worker") {
          // Enforce worker flow based on backend state
          if (!user?.onboardingCompleted) {
            navigate("/onboarding", { replace: true });
          } else if (user?.approvalStatus === "pending") {
            navigate("/worker/pending-approval", { replace: true });
          } else if (user?.approvalStatus === "rejected") {
            navigate("/worker/rejected", { replace: true });
          } else {
            navigate("/worker/dashboard", { replace: true });
          }
        } else {
          navigate("/", { replace: true });
        }
      }, 1000);
    } catch (err) {
      console.log(err);

      toast.error("فشل تسجيل الدخول", {
        position: "top-left",
        rtl: true,
        theme: "light",
      });
      setErrors({ submit: err?.data?.message || err?.message || 'فشل تسجيل الدخول' });
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center py-12 px-4 bg-linear-to-tr from-[#edf2f9] via-[#f7f3f5] to-[#fcf5f2] dir-rtl"
      style={{ direction: "rtl" }}
    >
      {/* <ToastContainer autoClose={3000} limit={3} /> */}
      <div className="max-w-115 w-full bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-8 border border-white/40 backdrop-blur-md relative overflow-hidden transition-all duration-300">
        {/* Header Logo & Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-brand-brown tracking-wide mb-1 select-none flex items-center justify-center gap-1 font-sans">
            <span className="font-semibold text-3xl font-sans tracking-normal ml-1">
              OSTA
            </span>
            أسطى
          </h1>
          <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-70 mx-auto">
            مرحباً بك مجدداً! قم بتسجيل الدخول للبدء.
          </p>
        </div>
        <RoleToggle formData={formData} handleRoleChange={handleRoleChange} />
        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Phone or Email Input */}
          <InputField
            id="emailorPhone"
            name="emailorPhone"
            label="رقم الهاتف أو البريد الإلكتروني"
            type="text"
            value={formData.emailorPhone}
            onChange={handleChange}
            placeholder="أدخل رقمك أو البريد الإلكتروني"
            error={errors.emailorPhone}
            icon="user"
          />

          {/* Password Input with Forgot Password Link */}
          <InputField
            id="password"
            name="password"
            label="كلمة المرور"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="أدخل كلمة المرور"
            error={errors.password}
            headerAction={
              <Link
                to="/forgot-password"
                onClick={(e) => {
                  e.preventDefault();
                  toast.info("سيتم نقلك لصفحة استعادة كلمة المرور قريباً.", {
                    position: "top-left",
                    rtl: true,
                    theme: "light",
                  });
                }}
                className="text-xs font-semibold text-brand-orange hover:underline underline-offset-2 transition-colors duration-200"
              >
                نسيت كلمة المرور؟
              </Link>
            }
          />

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              loading={isLoggingIn}
              className="w-full text-base font-bold shadow-lg"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              }
              iconPosition="left"
            >
              دخول
            </Button>
          </div>
        </form>

        {/* Separator OR (أو) */}
        <div className="flex items-center my-8 before:content-[''] before:flex-1 before:border-t before:border-gray-200 after:content-[''] after:flex-1 after:border-t after:border-gray-200 text-gray-400 text-sm gap-4 font-bold select-none">
          أو
        </div>

        {/* Footer Link */}
        <div className="text-center text-sm font-semibold text-gray-500">
          ليس لديك حساب؟{" "}
          <Link
            to="/register"
            className="text-brand-brown hover:text-brand-orange underline underline-offset-4 transition-colors duration-200"
          >
            سجل الآن
          </Link>
        </div>
      </div>
    </div>
  );
}
