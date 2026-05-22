import React from "react";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  icon = null,
  iconPosition = "right",
  loading = false,
  ...props
}) {
  const baseStyles =
    "relative flex items-center justify-center font-semibold text-center transition-all duration-300 ease-in-out focus:outline-none select-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]";

  const variants = {
    primary:
      "bg-brand-orange hover:bg-[#d9550b] text-white shadow-md hover:shadow-lg rounded-full py-3.5 px-8",
    secondary:
      "bg-brand-brown hover:bg-[#833304] text-white shadow-md hover:shadow-lg rounded-full py-3.5 px-8",
    outline:
      "bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-full py-3.5 px-6",
    social:
      "w-full flex items-center justify-center gap-3 border border-gray-200 hover:border-gray-300 rounded-full py-3.5 px-6 font-medium transition-colors duration-200 text-gray-800",
    "social-dark":
      "w-full flex items-center justify-center gap-3 bg-black hover:bg-zinc-900 text-white rounded-full py-3.5 px-6 font-medium transition-colors duration-200",
  };

  const selectedVariant = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${selectedVariant} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          جاري التحميل...
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          {icon && iconPosition === "left" && <span className="flex">{icon}</span>}
          {children}
          {icon && iconPosition === "right" && <span className="flex">{icon}</span>}
        </span>
      )}
    </button>
  );
}
