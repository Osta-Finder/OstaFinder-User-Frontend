import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../services/categoryApi";
import DynamicIcon from "../../../utils/DynamicIcon";

export default function PopularCategories() {
  const { data: response, isLoading, isError } = useGetCategoriesQuery();

  if (isLoading)
    return (
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          جاري التحميل...
        </div>
      </section>
    );

  if (isError)
    return (
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center text-red-500">
          حدث خطأ أثناء جلب البيانات.
        </div>
      </section>
    );

  const categories = response?.data || [];

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-normal">
            إيه <span className="relative inline-block" style={{ color: 'var(--primary-color)' }}>
              الخدمة
              <span className="absolute -bottom-3 left-0 w-full h-1.5 rounded-full opacity-80" style={{ backgroundColor: 'var(--primary-color)' }}></span>
            </span> اللي محتاجها؟
          </h2>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.slice(0, 8).map((c) => (
            <Link
              key={c._id}
              to={`/categories?category=${c.slug}`}
              className="relative overflow-hidden flex items-center justify-center p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group min-h-[160px]"
              style={{ backgroundColor: 'var(--primary-color)' }}
            >
              {/* Background Angled Darker Icon */}
              <div className="absolute -left-6 -bottom-6 w-32 h-32 opacity-20 transform -rotate-12 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 pointer-events-none text-black">
                <DynamicIcon iconString={c.icon} className="w-full h-full" />
              </div>

              {/* Foreground Category Name */}
              <div className="relative z-10 text-center font-extrabold text-white text-3xl md:text-4xl drop-shadow-md">
                {c.name}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link 
            to="/categories" 
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-bold text-lg border-2 transition-all duration-300 hover:shadow-[0_8px_20px_-6px_var(--primary-color)]"
            style={{ 
              borderColor: 'var(--primary-color)', 
              color: 'var(--primary-color)' 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--primary-color)';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--primary-color)';
            }}
          >
            شوف كل الخدمات
            <span className="transform group-hover:-translate-x-2 transition-transform duration-300">←</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
