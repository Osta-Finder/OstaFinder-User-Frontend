import Rating from "./Rating";

export default function MarqueeCard({ item }) {
  return (
    <div
      className="flex-none p-4 rounded-lg mx-2 shadow-sm hover:shadow-lg hover:-translate-y-1 transform transition-all duration-200 w-72 bg-white border border-slate-100"
      dir="rtl"
    >
      <div className="flex items-start gap-3">
        <img
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          src={item.image}
          alt={item.name}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="font-semibold text-sm truncate">{item.name}</p>
              <span className="text-xs text-slate-500">{item.role}</span>
            </div>
            <div className="flex items-center ml-2"></div>
          </div>
          <Rating rating={5} size="sm" />
        </div>
      </div>

      <p className="text-sm pt-3 text-gray-800 line-clamp-3 leading-relaxed">
        <span className="inline-block align-top mr-2 text-indigo-500">“</span>
        {item.text || ""}
      </p>
    </div>
  );
}
