import { useState } from "react";

const getIcon = (iconName, error) => {
  const iconColorClass = error ? "text-red-400" : "text-gray-400";

  switch (iconName) {
    case "user":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${iconColorClass}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      );
    case "email":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${iconColorClass}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      );
    case "phone":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${iconColorClass}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      );
    case "lock":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${iconColorClass}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      );
    default:
      return null;
  }
};

export default function InputField({
  label,
  headerAction,
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  icon,
  className = "",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";
  const inputType = isPasswordType
    ? showPassword
      ? "text"
      : "password"
    : type;

  const resolvedIcon = icon || (isPasswordType ? "lock" : null);

  let renderedIcon = null;
  if (typeof resolvedIcon === "string") {
    renderedIcon = getIcon(resolvedIcon, !!error);
  } else if (typeof resolvedIcon === "function") {
    renderedIcon = resolvedIcon(!!error);
  } else if (resolvedIcon) {
    renderedIcon = resolvedIcon;
  }

  const hasLeftElement = isPasswordType;
  const paddingLeftClass = hasLeftElement ? "pl-12" : "pl-4";

  return (
    <div className={`flex flex-col text-right ${className}`}>
      {headerAction ? (
        <div className="flex justify-between items-center mb-1.5 px-2">
          {label && (
            <label htmlFor={id} className="text-xs font-semibold text-gray-500">
              {label}
            </label>
          )}
          {headerAction}
        </div>
      ) : (
        label && (
          <label
            htmlFor={id}
            className="text-xs font-semibold text-gray-500 mb-1.5 mr-2"
          >
            {label}
          </label>
        )
      )}

      <div className="relative">
        <input
          id={id}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-white border ${
            error
              ? "border-red-500 focus:ring-red-100"
              : "border-[#E5E3E4] focus:ring-brand-orange/10 focus:border-brand-orange"
          } rounded-full py-3.5 pr-12 ${paddingLeftClass} text-right text-sm font-medium placeholder-gray-300 text-gray-800 transition-all duration-200 outline-none focus:ring-4`}
          {...props}
        />

        {/* Right Icon */}
        {renderedIcon && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
            {renderedIcon}
          </span>
        )}

        {/* Left Toggle Button (For password fields) */}
        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center cursor-pointer text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.025 10.025 0 014.132-5.4M9.9 4.24a9.124 9.124 0 011.66-.18c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-2.24 4.053m-3.136-3.136L12 12m0 0l-1.5-1.5m1.5 1.5l2.5 2.5M21 21l-2-2m-13.8-13.8L3 3"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        )}
      </div>

      {error && (
        <span className="text-red-500 text-xs mt-1 mr-2 flex items-center gap-1 transition-all duration-200">
          <span>⚠</span> {error}
        </span>
      )}
    </div>
  );
}
