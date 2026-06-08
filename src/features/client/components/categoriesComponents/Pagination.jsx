import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ pagination, currentPage, onPageChange }) {
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
    <div className="flex justify-center items-center gap-2 mt-12 border-t pt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 border rounded-xl hover:bg-gray-50 disabled:opacity-40 transition"
      >
        <ChevronRight size={18} />
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={index}
            className="w-10 h-10 flex items-center justify-center text-gray-400"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 border font-bold rounded-xl text-sm transition ${
              currentPage === page
                ? "bg-orange-500 border-orange-500 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 border rounded-xl hover:bg-gray-50 disabled:opacity-40 transition"
      >
        <ChevronLeft size={18} />
      </button>
    </div>
  );
}