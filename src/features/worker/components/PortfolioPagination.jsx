import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PortfolioPagination({ pagination, currentPage, onPageChange }) {
  const totalPages = pagination.numberOfPages;

  if (totalPages <= 1) return null;

  const generatePages = () => {
    const pages = [];
    pages.push(1);

    const startPage = Math.max(currentPage - 1, 2);
    const endPage = Math.min(currentPage + 1, totalPages - 1);

    if (startPage > 2) {
      pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10 border-t border-gray-100 pt-6" dir="rtl">
      {/* Page Info */}
      <div className="text-sm text-gray-500 font-medium">
        عرض الصفحة <span className="font-bold text-gray-900">{currentPage}</span> من <span className="font-bold text-gray-900">{totalPages}</span> صفحات
      </div>

      <div className="flex items-center gap-2">
        {/* Previous Button (RTL: arrow pointing right) */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-orange-50/50 hover:text-[#eb6a2d] hover:border-orange-100 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-700 disabled:hover:border-gray-200 disabled:cursor-not-allowed transition-all duration-200 shadow-sm cursor-pointer"
        >
          <ChevronRight size={16} className="shrink-0" />
          <span>السابق</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {pages.map((page, index) =>
            page === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-400 font-semibold select-none"
              >
                ...
              </span>
            ) : (
              <button
                key={`page-${page}`}
                onClick={() => onPageChange(page)}
                className={`w-8 h-8 sm:w-10 sm:h-10 border font-bold rounded-xl text-xs sm:text-sm transition-all duration-200 shadow-sm cursor-pointer ${
                  currentPage === page
                    ? "bg-[#eb6a2d] border-[#eb6a2d] text-white shadow-md shadow-orange-500/20"
                    : "text-gray-600 border-gray-200 bg-white hover:bg-orange-50 hover:text-[#eb6a2d] hover:border-orange-100"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Next Button (RTL: arrow pointing left) */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-orange-50/50 hover:text-[#eb6a2d] hover:border-orange-100 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-700 disabled:hover:border-gray-200 disabled:cursor-not-allowed transition-all duration-200 shadow-sm cursor-pointer"
        >
          <span>التالي</span>
          <ChevronLeft size={16} className="shrink-0" />
        </button>
      </div>
    </div>
  );
}
