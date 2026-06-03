import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import 'swiper/css';
import { useGetTopWorkersQuery } from "../../../../services/workerApi";
import WorkerCard from "./WorkerCard";

export default function BestWorkers() {
  const { data: response, isLoading, isError } = useGetTopWorkersQuery();

  if (isLoading)
    return <p className="text-center text-gray-500 py-10">جاري التحميل...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">
        حدث خطأ أثناء جلب البيانات.
      </p>
    );

  const topWorkers = response?.data || [];

  return (
    <section className="my-10 w-full overflow-hidden">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-right">
        أفضل الفنيين المتاحين حالياً
      </h2>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        dir="rtl"
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 1.2 },
          480: { slidesPerView: 1.5 },
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3.5 },
        }}
        className="w-full pb-12"
      >
        {topWorkers.map((worker) => (
          <SwiperSlide key={worker._id}>
            <WorkerCard worker={worker} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
