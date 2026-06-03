import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import 'swiper/css';
import { Link } from "react-router-dom";

import { useGetCategoriesQuery } from "../../../../services/categoryApi";
import DynamicIcon from "../../../../utils/DynamicIcon";

export default function CategoriesSlider() {
  const { data: response, isLoading, isError } = useGetCategoriesQuery();

  if (isLoading)
    return (
      <p className="text-center text-gray-500 py-10">جاري تحميل الأقسام...</p>
    );
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">
        حدث خطأ أثناء جلب الأقسام.
      </p>
    );

  // Assuming your backend returns data inside a 'data' array
  const categories = response?.data || [];

  return (
    <section className="my-10 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          تصنيفات الخدمات
        </h2>
      </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={15}
        dir="rtl"
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 2.5 },
          480: { slidesPerView: 3.5 },
          768: { slidesPerView: 5.5 },
          1024: { slidesPerView: 7.5 },
        }}
        className="w-full"
      >
        {categories.map((category) => (
          <SwiperSlide key={category._id}>
            <Link 
              to={`/categories?category=${category._id}`} 
              className="flex flex-col items-center justify-center p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group h-full"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 mb-3 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                <DynamicIcon 
                  iconString={category.icon} 
                  className="w-8 h-8 md:w-10 md:h-10 text-orange-500" 
                />
              </div>
              <h3 className="text-sm md:text-base font-bold text-gray-800 text-center">
                {category.name}
              </h3>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
