'use client';

import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function ProjectSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');

    const trimmedTerm = term.trim();

    if (trimmedTerm) {
      params.set('query', trimmedTerm);
    } else {
      params.delete('query');
    }

    const queryString = params.toString();
    replace(queryString ? `${pathname}?${queryString}` : pathname);
  }, 300);

  return (
    <label className="block w-full max-w-xl">
      <span className="mb-2 block text-sm font-medium text-gray-700">Search projects</span>
      <input
        type="search"
        placeholder="Search by title, description, or technology..."
        defaultValue={searchParams.get('query')?.toString() ?? ''}
        onChange={(event) => handleSearch(event.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
      />
    </label>
  );
}