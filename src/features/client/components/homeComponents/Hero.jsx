import heroBgImg from '../../../../assets/heros.png'

export default function Hero() {
  return (
    <section className="relative w-full rounded-3xl overflow-hidden bg-gray-900 h-95 md:h-110 shadow-lg">
      
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${heroBgImg})` 
        }}
      >
        {/* Dark linear gradient overlay so text remains fully legible */}
        <div className="absolute inset-0 bg-linear-to-l from-black/80 via-black/50 to-transparent"></div>
      </div>

      <div className="relative h-full max-w-4xl mr-auto ml-0 md:mr-12 flex flex-col justify-center px-6 md:px-12 text-white z-10">

        <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-wide mb-4">
          رعاية منزلك <span className="text-orange-500">تستحق الأفضل</span>
        </h1>

        <p className="text-gray-300 text-base md:text-lg max-w-xl font-normal mb-8 leading-relaxed">
          اختبر التميز في خدمات صيانة المنزل مع محترفين معتمدين
          <br />
          وحلول ذكية تضمن لك الراحة والأمان.
        </p>

        <div className="flex flex-wrap gap-4">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition duration-200 text-sm md:text-base shadow-md shadow-orange-600/20">
            احجز خدمة الآن
          </button>
          
          <button className="bg-transparent hover:bg-white/10 text-white border border-white/60 font-medium px-8 py-3 rounded-xl transition duration-200 text-sm md:text-base">
            استكشف الخدمات
          </button>
        </div>

      </div>
    </section>
  )
}
