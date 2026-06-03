import React, { useState } from "react";
import { Phone, MessageSquare, MapPin, CreditCard, Clock, ChevronLeft } from "lucide-react";
import clientAvatar from "../../../assets/images/client_avatar.png";
import mapLocation from "../../../assets/images/map_location.png";

export default function RequestSidebar({
  onCall = () => {},
  onChat = () => {},
}) {
  const [calling, setCalling] = useState(false);
  const [chatting, setChatting] = useState(false);

  const handleCall = () => {
    setCalling(true);
    onCall();
    setTimeout(() => setCalling(false), 2000);
  };

  const handleChat = () => {
    setChatting(true);
    onChat();
    setTimeout(() => setChatting(false), 2000);
  };

  return (
    <aside className="w-full lg:w-[360px] space-y-6 flex-shrink-0" dir="rtl">
      {/* Client Information Card */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <h3 className="text-lg font-bold text-gray-900 mb-5 pb-2 border-b border-gray-50 flex items-center justify-between">
          <span>بيانات العميل</span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
        </h3>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-brand-orange/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img
              src={clientAvatar}
              alt="صورة العميل"
              className="w-14 h-14 rounded-full object-cover border-2 border-gray-100 shadow-sm relative z-10 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-base">أحمد محمود</h4>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-amber-500 font-bold text-sm">⭐ 4.8</span>
              <span className="text-gray-400 text-xs">(12 طلب سابق)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleCall}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-semibold text-sm transition-all duration-300 cursor-pointer ${
              calling
                ? "bg-emerald-50 text-emerald-600 scale-[0.98]"
                : "bg-gray-50 hover:bg-gray-100/80 text-gray-800 hover:text-brand-orange border border-transparent hover:border-brand-orange/10"
            }`}
          >
            <Phone className={`w-4 h-4 ${calling ? "animate-bounce" : ""}`} />
            <span>{calling ? "جاري الاتصال..." : "الاتصال بالعميل"}</span>
          </button>
          
          <button
            onClick={handleChat}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-semibold text-sm transition-all duration-300 cursor-pointer ${
              chatting
                ? "bg-brand-orange/10 text-brand-orange scale-[0.98]"
                : "bg-gray-50 hover:bg-gray-100/80 text-gray-800 hover:text-brand-orange border border-transparent hover:border-brand-orange/10"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>{chatting ? "جاري فتح المحادثة..." : "محادثة"}</span>
          </button>
        </div>
      </div>

      {/* Map Card */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-orange" />
            <span>موقع العميل</span>
          </h3>
          <span className="text-xs font-semibold px-2.5 py-1 bg-brand-orange/10 text-brand-orange rounded-full">
            يبعد 4.2 كلم
          </span>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-gray-100 h-44 group cursor-pointer shadow-inner">
          <img
            src={mapLocation}
            alt="خريطة الموقع"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Radar effect on center marker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
            <span className="absolute flex h-6 w-6 -left-3 -top-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-40"></span>
              <span className="relative inline-flex rounded-full h-6 w-6 bg-brand-orange/80"></span>
            </span>
          </div>

          <div className="absolute bottom-3 right-3 left-3 bg-white/95 backdrop-blur-md py-2 px-3 rounded-xl border border-white/20 shadow-sm flex items-center justify-between pointer-events-none">
            <span className="text-[11px] font-bold text-gray-800">حي النرجس، الرياض</span>
            <ChevronLeft className="w-3.5 h-3.5 text-gray-400 rotate-180" />
          </div>
        </div>
      </div>

      {/* Request Summary Card */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <h3 className="text-lg font-bold text-gray-900 mb-5 pb-2 border-b border-gray-50 flex items-center justify-between">
          <span>ملخص الطلب</span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-1">
            <span className="text-gray-400 text-sm font-medium">الخدمة</span>
            <span className="text-gray-900 text-sm font-bold bg-gray-50 px-3 py-1 rounded-xl">سباكة - تسرب مياه</span>
          </div>
          
          <div className="flex justify-between items-center py-1">
            <span className="text-gray-400 text-sm font-medium">وقت الطلب</span>
            <span className="text-gray-900 text-sm font-bold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-orange" />
              <span>اليوم، 10:15 ص</span>
            </span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-gray-400 text-sm font-medium">طريقة الدفع</span>
            <span className="text-gray-900 text-sm font-bold flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-xl">
              <CreditCard className="w-3.5 h-3.5 text-brand-orange" />
              <span>بطاقة ائتمان</span>
            </span>
          </div>

          <div className="pt-4 border-t border-dashed border-gray-100 flex flex-col gap-1.5">
            <span className="text-gray-400 text-xs font-semibold">القيمة التقديرية</span>
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-extrabold text-brand-orange">
                150 - 250
              </span>
              <span className="text-brand-orange font-bold text-sm mr-1">ر.س</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
