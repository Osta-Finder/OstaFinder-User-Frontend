import React, { useState } from "react";
import {
  Phone,
  MessageSquare,
  MapPin,
  CreditCard,
  Clock,
  ChevronLeft,
} from "lucide-react";
import clientAvatar from "../../../assets/images/client_avatar.png";
import mapLocation from "../../../assets/images/map_location.png";

export default function RequestSidebar({
  requestData,
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

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("ar-EG", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };
  console.log("Request Data in Sidebar:", requestData);
  return (
    <aside className="w-full lg:w-90 space-y-6 shrink-0" dir="rtl">
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
              src={requestData?.user?.profilePic || clientAvatar}
              alt="صورة العميل"
              className="w-14 h-14 rounded-full object-cover border-2 border-gray-100 shadow-sm relative z-10 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-base">
              {requestData?.user?.name || "عميل غير معروف"}
            </h4>
          </div>
        </div>
        <div className="flex justify-between items-center py-1">
          <span className="text-gray-400 text-sm font-medium">
            رقم تليفون العميل
          </span>
          <span className="text-gray-900 text-sm font-bold bg-gray-50 px-3 py-1 rounded-xl">
            {requestData?.user?.phoneNumber || "لا يوجد"}
          </span>
        </div>{" "}
      </div>

      {/* Map Card */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-orange" />
            <span>موقع العميل</span>
          </h3>
          <span className="text-xs font-semibold px-2.5 py-1 bg-brand-orange/10 text-brand-orange rounded-full">
            غير محدد
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
            <span className="text-[11px] font-bold text-gray-800">
              {requestData?.address || "عنوان غير محدد"}
            </span>
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
            <span className="text-gray-900 text-sm font-bold bg-gray-50 px-3 py-1 rounded-xl">
              {requestData?.service || "غير محددة"}
            </span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-gray-400 text-sm font-medium">وقت الطلب</span>
            <span className="text-gray-900 text-sm font-bold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-orange" />
              <span>
                {requestData?.date
                  ? formatDate(requestData.date)
                  : "اليوم، 10:15 ص"}
              </span>
            </span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-gray-400 text-sm font-medium">
              طريقة الدفع
            </span>
            <span className="text-gray-900 text-sm font-bold flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-xl">
              <CreditCard className="w-3.5 h-3.5 text-brand-orange" />
              <span>كاش</span>
            </span>
          </div>

          <div className="pt-4 border-t border-dashed border-gray-100 flex flex-col gap-1.5">
            <span className="text-gray-400 text-xs font-semibold">
              القيمة التقديرية
            </span>
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-extrabold text-brand-orange">
                {requestData?.amount !== undefined
                  ? requestData.amount
                  : "150 - 250"}
              </span>
              <span className="text-brand-orange font-bold text-sm mr-1">
                ج.م
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
