import DynamicIcon from "../../../../utils/DynamicIcon"; 

export default function CategorySelector({ categories, isLoading, selectedCategory, onSelect }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-amber-800 rounded-full"></span> اختر فئة الخدمة
      </h3>
      
      {isLoading ? (
        <p className="text-xs text-gray-400 text-center py-4">جاري تحميل الفئات...</p>
      ) : (
        // عرض الأقسام كـ Grid ثابت ومريح جداً في الفورم
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat._id;
            
            return (
              <button
                key={cat._id}
                type="button"
                onClick={() => onSelect(cat._id)} 
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 ${
                  isSelected
                    ? "border-amber-800 bg-amber-50/30 text-amber-900 font-bold scale-[1.02]"
                    : "border-gray-100 hover:border-gray-200 text-gray-500"
                }`}
              >

                <DynamicIcon 
                  iconString={cat.icon} 
                  className={`w-6 h-6 ${isSelected ? "text-amber-800" : "text-gray-400"}`} 
                />
                
                <span className="text-xs mt-2">{cat.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}