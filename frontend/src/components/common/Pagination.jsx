import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex items-center justify-center gap-1.5 my-8" aria-label="Pagination">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
          currentPage === 1
            ? 'border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50'
            : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* First Page if needed */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="w-9 h-9 text-sm font-medium rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          >
            1
          </button>
          {startPage > 2 && <span className="px-1 text-slate-400">...</span>}
        </>
      )}

      {/* Page Numbers */}
      {pages.map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 text-sm font-semibold rounded-lg transition-colors ${
              isActive
                ? 'bg-zoho-red text-white shadow-sm'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Last Page if needed */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-1 text-slate-400">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="w-9 h-9 text-sm font-medium rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
          currentPage === totalPages
            ? 'border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50'
            : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300'
        }`}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
};

export default Pagination;
