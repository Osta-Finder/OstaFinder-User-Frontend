import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import { validateLoginForm } from "../schemas/auth.schema";
import { useLoginMutation } from "../../../services/authApi";
import RoleToggle from "../../../components/ui/RoleToggle";

export default function Login() {
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    emailorPhone: "", // Can be Email or Phone
    password: "",
    role : "client"
  });

  // Validation errors
  const [errors, setErrors] = useState({});
  // Form submission state
  const [isLoading, setIsLoading] = useState(false);
  // Password visibility
  const [showPassword, setShowPassword] = useState(false);

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

  const handleRoleChange = (role)=>{
    console.log(role);
    
        setFormData((prev) => ({
      ...prev,
      role,
    }));
  }

  // Handle form submission
  const [login, { isLoading: isLoggingIn, error: loginError }] = useLoginMutation();

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
      console.log("result " , result);
      
      // Assuming result contains user role
      const role = result.user?.role === "woreker" ? "worker" : result.user?.role;
      if (role === "client") {
        navigate("/client-home");
      } else {
        navigate("/worker-dashboard");
      }
    } catch (err) {
      console.log(err);
      
      setErrors({ submit: err?.data?.message || "فشل تسجيل الدخول" });
    }
  };


  return (
    <div className="min-h-screen w-full flex items-center justify-center py-12 px-4 bg-gradient-to-tr from-[#edf2f9] via-[#f7f3f5] to-[#fcf5f2] dir-rtl" style={{ direction: "rtl" }}>
      <div className="max-w-[460px] w-full bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-8 border border-white/40 backdrop-blur-md relative overflow-hidden transition-all duration-300">
        
        {/* Header Logo & Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-brand-brown tracking-wide mb-1 select-none flex items-center justify-center gap-1 font-sans">
            <span className="font-semibold text-3xl font-sans tracking-normal ml-1">OSTA</span>
            أسطى
          </h1>
          <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-[280px] mx-auto">
            مرحباً بك مجدداً! قم بتسجيل الدخول للبدء.
          </p>
        </div>
        <RoleToggle formData={formData} handleRoleChange={handleRoleChange} />
        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Phone or Email Input */}
          <div className="flex flex-col text-right">
            <label htmlFor="emailorPhone" className="text-xs font-semibold text-gray-500 mb-1.5 mr-2">
              رقم الهاتف أو البريد الإلكتروني
            </label>
            <div className="relative">
              <input
                id="emailorPhone"
                name="emailorPhone"
                type="text"
                value={formData.emailorPhone}
                onChange={handleChange}
                placeholder="أدخل رقمك أو البريد الإلكتروني"
                className={`w-full bg-white border ${
                  errors.emailorPhone ? "border-red-500 focus:ring-red-100" : "border-[#E5E3E4] focus:ring-[#f26e1e]/10 focus:border-brand-orange"
                } rounded-full py-3.5 pr-12 pl-4 text-right text-sm font-medium placeholder-gray-300 text-gray-800 transition-all duration-200 outline-none focus:ring-4`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${errors.emailorPhone ? "text-red-400" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
            </div>
            {errors.emailorPhone && (
              <span className="text-red-500 text-xs mt-1 mr-2 flex items-center gap-1 transition-all duration-200">
                <span>⚠</span> {errors.emailorPhone}
              </span>
            )}
          </div>

          {/* Password Input with Forgot Password Link */}
          <div className="flex flex-col text-right relative">
            <div className="flex justify-between items-center mb-1.5 px-2">
              <label htmlFor="password" className="text-xs font-semibold text-gray-500">
                كلمة المرور
              </label>
              <Link
                to="/forgot-password"
                onClick={(e) => {
                  e.preventDefault();
                  alert("سيتم نقلك لصفحة استعادة كلمة المرور قريباً.");
                }}
                className="text-xs font-semibold text-brand-orange hover:underline underline-offset-2 transition-colors duration-200"
              >
                نسيت كلمة المرور؟
              </Link>
            </div>
            
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="أدخل كلمة المرور"
                className={`w-full bg-white border ${
                  errors.password ? "border-red-500 focus:ring-red-100" : "border-[#E5E3E4] focus:ring-[#f26e1e]/10 focus:border-brand-orange"
                } rounded-full py-3.5 pr-12 pl-12 text-right text-sm font-medium placeholder-gray-300 text-gray-800 transition-all duration-200 outline-none focus:ring-4`}
              />
              
              {/* Lock Icon (Right Side) */}
              <span className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${errors.password ? "text-red-400" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              
              {/* Show/Hide Password Eye (Left Side) */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center cursor-pointer text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.025 10.025 0 014.132-5.4M9.9 4.24a9.124 9.124 0 011.66-.18c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-2.24 4.053m-3.136-3.136L12 12m0 0l-1.5-1.5m1.5 1.5l2.5 2.5M21 21l-2-2m-13.8-13.8L3 3" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-xs mt-1 mr-2 flex items-center gap-1 transition-all duration-200">
                <span>⚠</span> {errors.password}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              loading={isLoggingIn}
              className="w-full text-base font-bold shadow-lg"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
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
          <Link to="/register" className="text-brand-brown hover:text-brand-orange underline underline-offset-4 transition-colors duration-200">
            سجل الآن
          </Link>
        </div>

      </div>
    </div>
  );
}
