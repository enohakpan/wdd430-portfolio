import Link from 'next/link';

import { deleteProject } from '@/app/lib/actions';

interface ProjectActionsProps {
  id: number;
}

export function ProjectActions({ id }: ProjectActionsProps) {
  const deleteProjectWithId = deleteProject.bind(null, id);

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/dashboard/projects/${id}/edit`}
        className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
      >
        Edit
      </Link>
      <form action={deleteProjectWithId}>
        <button
          type="submit"
          className="rounded border border-red-200 bg-red-50 px-3 py-1 text-sm text-red-700 hover:bg-red-100"
        >
          Delete
        </button>
      </form>
    </div>
  );
}
