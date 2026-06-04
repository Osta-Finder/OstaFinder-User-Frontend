import { MapPin } from "lucide-react";

export default function LocationSection({ address, onAddressChange }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
        <span className="w-2 h-2 bg-amber-700 rounded-full"></span> موقع العمل
      </h3>
      
      <div>
        <label className="block text-xs text-gray-500 mb-2">العنوان بالتفصيل</label>
        <div className="relative">
          <input
            type="text"
            placeholder="اسم الشارع، رقم العمارة، الشقة، المنطقة..."
            value={address}
            onChange={(e) => onAddressChange(e.target.value)}
            className="w-full p-3 pr-10 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-amber-700 text-right"
            required
          />
          <MapPin className="absolute right-3 top-3.5 text-gray-300" size={16} />
        </div>
      </div>
    </div>
  );
}