import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WorkerCard({ worker }) {
  return (
    <div className="relative flex flex-col justify-between p-5 overflow-hidden transition-all duration-200 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md">
      <Link
        to={`/worker-profile/${worker._id}`}
        className="absolute inset-0 z-0"
      />

      <div className="relative z-10">
        <div className="absolute flex items-center gap-1 px-2 py-1 rounded-lg top-4 left-4 bg-amber-50">
          <span className="text-xs font-bold text-amber-600 md:text-sm">
            {worker.rating.toFixed(1)}
          </span>
          <Star size={14} className="fill-amber-500 text-amber-500" />
        </div>

        <div className="flex flex-col items-center mt-2 text-center">
          <div className="relative w-20 h-20 mb-3">
            <img
              src={worker.image}
              alt={worker.name}
              className="object-cover w-full h-full border-2 rounded-full border-gray-50"
            />

            <span
              className={`absolute bottom-0.5 right-1 w-3.5 h-3.5 border-2 border-white rounded-full 
            ${worker.isOnline ? 'bg-green-500' : 'bg-gray-300'}`}
            ></span>
          </div>

          <h3 className="mb-1 text-lg font-bold text-gray-900">
            {worker.name}
          </h3>

          <span className="px-3 py-1 text-xs font-bold text-orange-600 rounded-full bg-orange-50">
            {worker.category?.name}
          </span>
        </div>

        <div className="relative z-20 flex items-center justify-between w-full pt-4 mt-2 border-t border-gray-100">
          <Link
            to={`/create-order/${worker._id}`}
            state={{ worker }}
            className="bg-orange-500 hover:bg-orange-600 text-white text-xs md:text-sm font-bold px-5 py-2.5 rounded-xl transition duration-150 inline-block text-center"
          >
            طلب خدمة
          </Link>

          <div className="text-left">
            <p className="text-[10px] md:text-xs text-gray-400 font-light">
              تبدأ الخدمة من
            </p>
            <p className="text-sm font-black text-gray-800 md:text-base">
              {worker.price}{' '}
              <span className="text-xs font-normal text-gray-500">ج.م</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
