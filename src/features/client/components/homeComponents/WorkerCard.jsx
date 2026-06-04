import { Star } from 'lucide-react';

export default function WorkerCard({worker}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative overflow-hidden">
      
      <div className="absolute top-4 left-4 flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
        <span className="text-amber-600 font-bold text-xs md:text-sm">{worker.rating.toFixed(1)}</span>
        <Star size={14} className="fill-amber-500 text-amber-500" />
      </div>

      <div className="flex flex-col items-center text-center mt-2">
  
        <div className="relative w-20 h-20 mb-3">
          <img 
            src={worker.image} 
            alt={worker.name} 
            className="w-full h-full rounded-full object-cover border-2 border-gray-50"
          />
         
          <span className={`absolute bottom-0.5 right-1 w-3.5 h-3.5 border-2 border-white rounded-full 
          ${ worker.isOnline ? 'bg-green-500' : 'bg-gray-300'}`}>
          </span>
        </div>

        <h3 className="font-bold text-lg text-gray-900 mb-1">{worker.name}</h3>
        
        <span className="bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1 rounded-full">
          {worker.specialty}
        </span>
        
      </div>

      <div className="w-full border-t border-gray-100 pt-4 mt-2 flex items-center justify-between">

        <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs md:text-sm font-bold px-5 py-2.5 rounded-xl transition duration-150">
          عرض الملف
        </button>
        
        <div className="text-left">
          <p className="text-[10px] md:text-xs text-gray-400 font-light">تبدأ الخدمة من</p>
          <p className="text-sm md:text-base font-black text-gray-800">
            {worker.price} <span className="text-xs font-normal text-gray-500">ج.م</span>
          </p>
        </div>
      </div>

    </div>
  )
}
