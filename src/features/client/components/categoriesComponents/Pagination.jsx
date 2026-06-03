import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ pagination, currentPage, onPageChange }) {
  if (pagination.numberOfPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-12 border-t pt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 border rounded-xl hover:bg-gray-50 disabled:opacity-40 transition"
      >
        <ChevronRight size={18} />
      </button>

      {[...Array(pagination.numberOfPages)].map((_, index) => {
        const pageNum = index + 1;
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-10 h-10 font-bold rounded-xl text-sm transition ${
              currentPage === pageNum ? 'bg-orange-500 text-white' : 'border text-gray-600 hover:bg-gray-50'
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pagination.numberOfPages}
        className="p-2 border rounded-xl hover:bg-gray-50 disabled:opacity-40 transition"
      >
        <ChevronLeft size={18} />
      </button>
    </div>
  );
}