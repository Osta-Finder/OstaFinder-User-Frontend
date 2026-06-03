import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import { useRegisterMutation } from "../../../services/authApi";
import { validateRegisterForm } from "../schemas/auth.schema";
import RoleToggle from "../../../components/ui/RoleToggle";

export default function Register() {
  const navigate = useNavigate();
  
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "client", // "client" (عميل) or "worker" (فني)
  });

  // Validation errors
  const [errors, setErrors] = useState({});
  // Form submission state
        // Remove unused loading state
        // const [isLoading, setIsLoading] = useState(false);
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

  // Handle role switch
  const handleRoleChange = (role) => {
    console.log(role);
    
    setFormData((prev) => ({
      ...prev,
      role,
    }));
  };

  // Handle form submission
  const [register, { isLoading: isRegistering, error: registerError }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateRegisterForm(formData);
    console.log("formData" , formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Map role to backend enum (worker -> woreker)
    const payload = {
      ...formData,
      role: formData.role === "worker" ? "worker" : formData.role,
    };
    
    try {      
      const result = await register(payload).unwrap();
      console.log("result" , result);
      
      // Success handled by auth slice via onQueryStarted
      navigate(formData.role === "client" ? "/client-home" : "/worker-dashboard");
    } catch (err) {
      // err contains server error
      console.log(err);
      
      setErrors({ submit: err?.data?.message || "فشل التسجيل" });
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
          <p className="text-gray-400 text-sm font-medium">إنشاء حساب جديد</p>
        </div>

        {/* Custom Role Selector Toggle (عميل / فني) */}
        <RoleToggle formData={formData} handleRoleChange={handleRoleChange} />
        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name Input */}
          <div className="flex flex-col text-right">
            <label htmlFor="name" className="text-xs font-semibold text-gray-500 mb-1.5 mr-2">
              الاسم
            </label>
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="الاسم الكامل"
                className={`w-full bg-white border ${
                  errors.name ? "border-red-500 focus:ring-red-100" : "border-[#E5E3E4] focus:ring-[#f26e1e]/10 focus:border-brand-orange"
                } rounded-full py-3.5 pr-12 pl-4 text-right text-sm font-medium placeholder-gray-300 text-gray-800 transition-all duration-200 outline-none focus:ring-4`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${errors.name ? "text-red-400" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
            </div>
            {errors.name && (
              <span className="text-red-500 text-xs mt-1 mr-2 flex items-center gap-1 transition-all duration-200">
                <span>⚠</span> {errors.name}
              </span>
            )}
          </div>

          {/* Email Input */}
          <div className="flex flex-col text-right">
            <label htmlFor="email" className="text-xs font-semibold text-gray-500 mb-1.5 mr-2">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className={`w-full bg-white border ${
                  errors.email ? "border-red-500 focus:ring-red-100" : "border-[#E5E3E4] focus:ring-[#f26e1e]/10 focus:border-brand-orange"
                } rounded-full py-3.5 pr-12 pl-4 text-right text-sm font-medium placeholder-gray-300 text-gray-800 transition-all duration-200 outline-none focus:ring-4`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${errors.email ? "text-red-400" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
            </div>
            {errors.email && (
              <span className="text-red-500 text-xs mt-1 mr-2 flex items-center gap-1 transition-all duration-200">
                <span>⚠</span> {errors.email}
              </span>
            )}
          </div>

          {/* Phone Input */}
          <div className="flex flex-col text-right">
            <label htmlFor="phoneNumber" className="text-xs font-semibold text-gray-500 mb-1.5 mr-2">
              رقم الهاتف
            </label>
            <div className="relative">
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+966 5X XXX XXXX"
                className={`w-full bg-white border ${
                  errors.phoneNumber ? "border-red-500 focus:ring-red-100" : "border-[#E5E3E4] focus:ring-[#f26e1e]/10 focus:border-brand-orange"
                } rounded-full py-3.5 pr-12 pl-4 text-right text-sm font-medium placeholder-gray-300 text-gray-800 transition-all duration-200 outline-none focus:ring-4`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${errors.phoneNumber ? "text-red-400" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </span>
            </div>
            {errors.phoneNumber && (
              <span className="text-red-500 text-xs mt-1 mr-2 flex items-center gap-1 transition-all duration-200">
                <span>⚠</span> {errors.phoneNumber}
              </span>
            )}
          </div>

          {/* Password Input */}
          <div className="flex flex-col text-right">
            <label htmlFor="password" className="text-xs font-semibold text-gray-500 mb-1.5 mr-2">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
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

          {/* Confirm Password Input */}
          <div className="flex flex-col text-right">
            <label htmlFor="confirmPassword" className="text-xs font-semibold text-gray-500 mb-1.5 mr-2">
              تأكيد كلمة المرور
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full bg-white border ${
                  errors.confirmPassword ? "border-red-500 focus:ring-red-100" : "border-[#E5E3E4] focus:ring-[#f26e1e]/10 focus:border-brand-orange"
                } rounded-full py-3.5 pr-12 pl-12 text-right text-sm font-medium placeholder-gray-300 text-gray-800 transition-all duration-200 outline-none focus:ring-4`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${errors.confirmPassword ? "text-red-400" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
            </div>
            {errors.confirmPassword && (
              <span className="text-red-500 text-xs mt-1 mr-2 flex items-center gap-1 transition-all duration-200">
                <span>⚠</span> {errors.confirmPassword}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="secondary"
              loading={isRegistering}
              className="w-full text-base font-bold shadow-lg"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              }
              iconPosition="right"
            >
              إنشاء حساب
            </Button>
          </div>
        </form>

        {/* Separator OR (أو) */}
        <div className="flex items-center my-6 before:content-[''] before:flex-1 before:border-t before:border-gray-200 after:content-[''] after:flex-1 after:border-t after:border-gray-200 text-gray-400 text-sm gap-4 font-bold select-none">
          أو
        </div>

        {/* Social Sign-In Options */}
        <div className="space-y-3">
          
          {/* Google Login */}
          <Button
            variant="outline"
            className="w-full hover:shadow-sm"
            onClick={() => alert("تسجيل الدخول عبر Google")}
            icon={
              <svg className="h-5 w-5 ml-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.58h3.3c1.93,-1.78 3.04,-4.4 3.04,-7.38c0,-0.34 -0.03,-0.68 -0.08,-1.02Z" fill="#4285F4" />
                <path d="M12,20.6c2.43,0 4.47,-0.8 5.96,-2.2l-3.3,-2.58c-0.92,0.62 -2.1,1.0 -3.66,1.0c-2.35,0 -4.34,-1.59 -5.05,-3.72H2.53v2.66c1.49,2.96 4.54,4.84 8.04,4.84Z" fill="#34A853" />
                <path d="M6.95,13.1c-0.18,-0.54 -0.28,-1.11 -0.28,-1.7c0,-0.59 0.1,-1.16 0.28,-1.7V7.04H2.53C1.92,8.26 1.57,9.64 1.57,11.1c0,1.46 0.35,2.84 0.96,4.06l3.49,-2.66c-0.18,-0.54 -0.28,-1.11 -0.28,-1.7Z" fill="#FBBC05" />
                <path d="M12,4.4c1.32,0 2.5,0.45 3.44,1.35l2.58,-2.58C16.46,1.7 14.43,0.8 12,0.8c-3.5,0 -6.55,1.88 -8.04,4.84l3.49,2.7C8.16,6 10.15,4.4 12,4.4Z" fill="#EA4335" />
              </svg>
            }
            iconPosition="right"
          >
            المتابعة باستخدام Google
          </Button>

          {/* Apple Login */}
          <Button
            variant="social-dark"
            className="w-full"
            onClick={() => alert("تسجيل الدخول عبر Apple")}
            icon={
              <svg className="h-5 w-5 fill-current ml-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.1,16.67C20.08,16.74 19.67,18.11 18.71,19.5M15.97,4.17C16.63,3.37 17.07,2.28 16.95,1C16,1.04 14.9,1.6 14.24,2.38C13.68,3.04 13.19,4.14 13.34,5.39C14.39,5.47 15.4,4.88 15.97,4.17Z" />
              </svg>
            }
            iconPosition="right"
          >
            المتابعة باستخدام Apple
          </Button>

        </div>

        {/* Footer Link */}
        <div className="mt-8 text-center text-sm font-semibold text-gray-500">
          لديك حساب بالفعل؟{" "}
          <Link to="/login" className="text-brand-brown hover:text-brand-orange underline underline-offset-4 transition-colors duration-200">
            تسجيل الدخول
          </Link>
        </div>

      </div>
    </div>
  );
}
