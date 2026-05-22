import React from "react";

const RoleToggle = ({formData , handleRoleChange}) => {
  return (
    <div className="mb-6 relative">
      <div className="bg-[#E5E3E4] rounded-full p-1 flex items-center h-12 relative select-none">
        {/* Sliding white background indicator */}
        <div
          className={`absolute top-1 bottom-1 w-[48%] bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out ${
            formData.role === "client" ? "right-1" : "right-[51%]"
          }`}
        />

        {/* Client (عميل) Option */}
        <button
          type="button"
          onClick={() => handleRoleChange("client")}
          className={`flex-1 text-center font-bold text-sm relative z-10 transition-colors duration-300 cursor-pointer ${
            formData.role === "client" ? "text-brand-orange" : "text-[#71717A]"
          }`}
        >
          عميل
        </button>

        {/* Technician (فني) Option */}
        <button
          type="button"
          onClick={() => handleRoleChange("worker")}
          className={`flex-1 text-center font-bold text-sm relative z-10 transition-colors duration-300 cursor-pointer ${
            formData.role === "worker" ? "text-brand-orange" : "text-[#71717A]"
          }`}
        >
          فني
        </button>
      </div>
    </div>
  );
};

export default RoleToggle;
