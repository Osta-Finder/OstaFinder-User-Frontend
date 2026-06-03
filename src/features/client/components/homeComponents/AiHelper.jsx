import { Sparkles, HelpCircle } from 'lucide-react';

export default function AiHelper() {
  return (
    <section className="my-10 w-full">
      <div className="w-full bg-[#111622] rounded-[2rem] p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl relative overflow-hidden">
        
        <div className="flex flex-col items-center md:items-start text-center md:text-right order-2 md:order-1 w-full md:w-auto">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition duration-200 flex items-center gap-2 shadow-lg shadow-orange-500/20 w-full justify-center md:w-auto">
            <HelpCircle size={20} />
            <span>هل تواجه مشكلة؟</span>
          </button>
          
          <span className="text-gray-500 text-xs mt-2 block font-light">
            أكثر من 5,000 تشخيص ناجح هذا الشهر
          </span>
        </div>

        <div className="flex flex-col items-center md:items-end text-center md:text-right order-1 md:order-2 max-w-2xl">
          
          <div className="flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold px-3 py-1 rounded-full mb-3">
            <Sparkles size={14} />
            <span>تقنية الذكاء الاصطناعي</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
            مساعد Osta الذكي
          </h2>

          <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
            هل تعاني من مشكلة ولا تعرف مصدرها؟ اسمح للذكاء الاصطناعي بتشخيص المشكلة في ثوانٍ واقتراح أفضل الخبراء لحلها فوراً.
          </p>
        </div>

      </div>
    </section>
  )
}
