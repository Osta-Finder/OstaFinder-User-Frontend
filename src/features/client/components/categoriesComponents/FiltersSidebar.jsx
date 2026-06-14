import { Star } from "lucide-react";

export default function FiltersSidebar({
  categories,
  isLoadingCategories,
  searchParams,
  handleFilterChange,
}) {
  const currentCategory = searchParams.get("category") || "";
  const currentRating = searchParams.get("rating[gte]") || "";
  const currentStatus = searchParams.get("isOnline") || "";
  const priceGte = searchParams.get("price[gte]") || "";
  const priceLte = searchParams.get("price[lte]") || "";

  return (
    <div className="space-y-6 text-right">
      <div>
        <h4 className="font-bold text-gray-700 mb-3 text-sm">الخدمة / القسم</h4>
        {isLoadingCategories ? (
          <p className="text-xs text-gray-400">جاري تحميل الأقسام...</p>
        ) : (
          <ul className="space-y-1 max-h-48 overflow-y-auto pr-1">
            <li>
              <button
                onClick={() => handleFilterChange("category", "")}
                className={`w-full text-right text-xs px-3 py-2 cursor-pointer rounded-lg transition-colors ${
                  currentCategory === ""
                    ? "bg-orange-50 text-orange-600 font-bold"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                كل الخدمات
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.slug || cat._id}>
                <button
                  onClick={() => handleFilterChange("category", cat.slug)}
                  className={`w-full text-right text-xs px-3 cursor-pointer py-2 rounded-lg transition-colors ${
                    currentCategory === cat.slug
                      ? "bg-orange-50 text-orange-600 font-bold"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t pt-4">
        <h4 className="font-bold text-gray-700 mb-3 text-sm">
          نطاق السعر (ج.م)
        </h4>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="من"
            value={priceGte}
            onChange={(e) => handleFilterChange("price[gte]", e.target.value)}
            className="w-1/2 px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg text-center"
          />
          <input
            type="number"
            placeholder="إلى"
            value={priceLte}
            onChange={(e) => handleFilterChange("price[lte]", e.target.value)}
            className="w-1/2 px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg text-center"
          />
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-bold text-gray-700 mb-3 text-sm">التقييم</h4>
        <div className="space-y-1">
          {[4, 3, 2].map((stars) => (
            <button
              key={stars}
              onClick={() =>
                handleFilterChange("rating[gte]", stars.toString())
              }
              className={`w-full flex items-center justify-between text-xs px-3 py-1.5 rounded-lg transition ${
                currentRating === stars.toString()
                  ? "bg-orange-50 text-orange-600 font-bold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="flex items-center gap-1">
                {stars} نجوم وأعلى
              </span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={10}
                    className={`${i < stars ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t pt-4">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={currentStatus === "true"}
            onChange={(e) =>
              handleFilterChange("isOnline", e.target.checked ? "true" : "")
            }
            className="w-4 h-4 text-orange-500 accent-orange-500"
          />
          <span className="text-xs font-bold text-gray-700">
            المتاحين أونلاين فقط
          </span>
        </label>
      </div>
    </div>
  );
}
