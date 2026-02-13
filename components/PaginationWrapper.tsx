'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import PaginationControls from './PaginationControls';

interface PaginationWrapperProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function PaginationWrapper({ 
  currentPage, 
  totalPages, 
  basePath 
}: PaginationWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    // Force a hard navigation to ensure the page re-renders with new data
    window.location.href = `${basePath}?page=${newPage}`;
  };

  return (
    <PaginationControls
      currentPage={currentPage}
      totalPages={totalPages}
      basePath={basePath}
      onPageChange={handlePageChange}
    />
  );
}
