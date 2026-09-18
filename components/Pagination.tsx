'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  if (totalPages <= 1) {
    return null;
  }

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  };

  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-between gap-4">
      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>

      <div className="flex items-center gap-2">
        {currentPage > 1 ? (
          <Link
            href={createPageURL(previousPage)}
            className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-600 hover:text-blue-600"
          >
            Previous
          </Link>
        ) : (
          <span className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-400">
            Previous
          </span>
        )}

        {currentPage < totalPages ? (
          <Link
            href={createPageURL(nextPage)}
            className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-600 hover:text-blue-600"
          >
            Next
          </Link>
        ) : (
          <span className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-400">
            Next
          </span>
        )}
      </div>
    </nav>
  );
}