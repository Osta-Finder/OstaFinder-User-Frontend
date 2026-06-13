import aboutStory from "../../../assets/images/about_story.png";

export default function AboutStory() {
  return (
    <section className="w-full py-16 md:py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Content Column */}
          <div className="lg:col-span-5 text-right order-2 lg:order-1">
            <span className="text-sm font-semibold tracking-wider text-[#eb6a2d] uppercase block mb-2">
              قصتنا
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
              من فكرة صغيرة إلى منصة رائدة
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-base md:text-lg">
              <p>
                بدأ "أوسطى فايندر" كحل لمشكلة بسيطة: صعوبة الوصول إلى فنيين
                موثوقين في مصر. بدأنا كفريق صغير من المهندسين المهتمين
                بالتكنولوجيا وتطوير المجتمع المحلي.
              </p>
              <p>
                اليوم، نفخر بكوننا المنصة المفضلة للآلاف من الأسر المصرية، حيث
                نوفر نظاماً متكاملاً يربط أصحاب المنازل بأفضل الكوادر الفنية
                المعتمدة مع ضمان الشفافية والجودة في كل خطوة.
              </p>
            </div>
          </div>

          {/* Image Column */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative">
              {/* Subtle background decoration card/frame */}
              <div className="absolute -inset-4 bg-orange-100 rounded-3xl -rotate-2 scale-98" />
              <img
                src={aboutStory}
                alt="فريق عمل أوسطى فايندر"
                className="relative z-10 w-full h-87.5 md:h-112.5 object-cover rounded-3xl shadow-lg border border-gray-100"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
