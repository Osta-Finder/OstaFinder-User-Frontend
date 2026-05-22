import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import {
  Wrench,
  Zap,
  Snowflake,
  Hammer,
  Paintbrush,
  ShieldCheck,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
export default function CategoriesSlider() {
  const categories = [
    {
      id: 1,
      name: "سباكة",
      icon: <Wrench size={28} className="text-orange-500" />,
    },
    {
      id: 2,
      name: "كهرباء",
      icon: <Zap size={28} className="text-orange-500" />,
    },
    {
      id: 3,
      name: "تكييف",
      icon: <Snowflake size={28} className="text-orange-500" />,
    },
    {
      id: 4,
      name: "نجارة",
      icon: <Hammer size={28} className="text-orange-500" />,
    },
    {
      id: 5,
      name: "نقاشة",
      icon: <Paintbrush size={28} className="text-orange-500" />,
    },
    {
      id: 6,
      name: "تنظيف",
      icon: <ShieldCheck size={28} className="text-orange-500" />,
    },
    {
      id: 7,
      name: "سباكة",
      icon: <Wrench size={28} className="text-orange-500" />,
    },
    {
      id: 8,
      name: "كهرباء",
      icon: <Zap size={28} className="text-orange-500" />,
    },
  ];
  return (
    <section className="my-10 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          تصنيفات الخدمات
        </h2>
        <button className="text-sm font-bold text-orange-600 hover:text-orange-700 transition">
          عرض الكل
        </button>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={2}
        navigation
        breakpoints={{
          480: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        className="categories-swiper"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <div className="bg-orange-50/40 border border-transparent hover:border-orange-200 rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 group h-36">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform duration-200">
                {category.icon}
              </div>

              <span className="text-gray-800 font-bold text-sm md:text-base group-hover:text-orange-600 transition-colors">
                {category.name}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
