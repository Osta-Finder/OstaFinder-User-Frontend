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
        <h2 className="text-center text-2xl md:text-3xl font-extrabold text-gray-900">إيه الخدمة اللي محتاجها؟</h2>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {categories.slice(0, 8).map((c) => (
            <Link
              key={c._id}
              to={`/categories?category=${c._id}`}
              className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-100 hover:shadow-md transition"
            >
              <div className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl bg-[var(--primary-light)]" style={{ color: 'var(--primary-color)' }}>
                <DynamicIcon iconString={c.icon} className="w-8 h-8" />
              </div>
              <div className="mt-4 text-center font-medium text-gray-900">{c.name}</div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link to="/categories" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-50">
            شوف كل الخدمات →
          </Link>
        </div>
      </div>
    </section>
  );
}
