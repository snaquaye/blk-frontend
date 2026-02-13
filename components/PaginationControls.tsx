'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  onPageChange?: (page: number) => void;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  basePath,
  onPageChange,
}: PaginationControlsProps) {
  const router = useRouter();

  // Handle page change with window location for proper Server Component re-render
  const handlePageChange = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    } else {
      // Use window.location.href to force a full page reload
      // This ensures the Server Component re-renders with the new searchParams
      window.location.href = `${basePath}?page=${newPage}`;
    }
  };
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5; // Show max 5 page numbers at a time

    if (totalPages <= showPages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show current page and neighbors
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-2 py-8">
{/* Previous Button */}
      {currentPage > 1 ? (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-1 text-sm border border-black hover:bg-black hover:text-white transition-colors"
        >
          Previous
        </button>
      ) : (
        <span className="px-3 py-1 text-sm border border-gray-300 text-gray-300 cursor-not-allowed">
          Previous
        </span>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
              ...
            </span>
          );
        }

        const pageNum = page as number;
        const isActive = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`w-8 h-8 flex items-center justify-center text-sm font-medium transition-colors
              ${isActive
                ? 'bg-black text-white'
                : 'border border-black hover:bg-black hover:text-white'
              }`}
          >
            {pageNum}
          </button>
        );
      })}

      {/* Next Button */}
      {currentPage < totalPages ? (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-1 text-sm border border-black hover:bg-black hover:text-white transition-colors"
        >
          Next
        </button>
      ) : (
        <span className="px-3 py-1 text-sm border border-gray-300 text-gray-300 cursor-not-allowed">
          Next
        </span>
      )}
    </div>
  );
}