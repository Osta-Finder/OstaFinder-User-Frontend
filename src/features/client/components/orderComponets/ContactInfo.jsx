import { Phone, Calendar } from "lucide-react";

export default function ContactInfo({ phoneNumber, date, onPhoneNumberChange, onDateChange, minDate }) {
  return (
    <>
      <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-[var(--primary-color)] rounded-full"></span> معلومات التواصل
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
        <div>
          <label className="block text-xs text-gray-500 mb-2">رقم الجوال</label>
          <div className="relative">
            <input
              type="tel"
              placeholder="01XXXXXXXXX"
              value={phoneNumber} 
              onChange={(e) => onPhoneNumberChange(e.target.value)}
              className="w-full p-3 pr-10 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[var(--primary-color)] text-left"
              dir="ltr"
              required
            />
            <Phone className="absolute right-3 top-3.5 text-gray-300" size={16} />
          </div>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-2">وقت الزيارة المفضل</label>
          <div className="relative">
            <input
              type="datetime-local"
              value={date} 
              onChange={(e) => onDateChange(e.target.value)}
              min={minDate}
              className="w-full p-3 pr-10 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[var(--primary-color)] text-right text-gray-600"
              required
            />
            <Calendar className="absolute right-3 top-3.5 text-gray-300" size={16} />
          </div>
        </div>
      </div>
    </>
  );
}