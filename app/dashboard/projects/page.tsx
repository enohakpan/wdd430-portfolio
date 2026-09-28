import Link from 'next/link';

import { auth } from '@/auth';
import { ProjectActions } from '@/components/project-actions';
import { getAllProjects } from '@/lib/projects-db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export default async function DashboardProjectsPage() {
  const session = await auth();
  const projects = await getAllProjects();

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Projects</h1>
          <p className="text-gray-600">Signed in as {session?.user?.email}</p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          New Project
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Technologies</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="px-4 py-3 text-sm text-gray-900">{project.title}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{project.type}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{project.technologies.join(', ')}</td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  <ProjectActions id={project.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
