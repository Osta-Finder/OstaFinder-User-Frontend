import { useNavigate } from "react-router-dom";
import aboutHero from "../../../assets/images/about_hero.png";

export default function AboutHero() {
  const navigate = useNavigate();
  return (
    <section className="relative w-full h-125 md:h-150 flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${aboutHero})` }}
      />

      {/* Dark & Orange Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-l from-black/85 via-black/50 to-transparent" />

      {/* Content Container */}
      <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 z-10 text-right">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white mb-6">
            نسعى لتبسيط صيانة المنازل عبر التكنولوجيا والثقة
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed font-light">
            نحن في أوسطى فايندر نجمع بين الخبرة المحلية والحلول التقنية المبتكرة
            لضمان راحة بالك وجودة الخدمة في منزلك.
          </p>
          <div className="flex flex-wrap gap-4 justify-start">
            <button
              onClick={() => navigate("/categories")}
              className="px-8 py-3 cursor-pointer bg-[#eb6a2d] hover:bg-[#d6571b] text-white font-semibold rounded-full shadow-lg transition duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              اكتشف خدماتنا
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
