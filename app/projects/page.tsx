import ProjectList from '@/components/ProjectList';
import Pagination from '@/components/Pagination';
import ProjectSearch from '@/components/ProjectSearch';
import type { Metadata } from 'next';
import { fetchFilteredProjects, fetchProjectsPages } from '@/lib/projects-db';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Browse all portfolio projects, search by keywords, and explore technologies used in each project.',
};

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export default async function ProjectsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query?.toString() ?? '';
  const currentPage = Math.max(Number(searchParams?.page) || 1, 1);

  const projects = await fetchFilteredProjects(query, currentPage);
  const totalPages = await fetchProjectsPages(query);

  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Projects</h1>
        <p className="text-lg text-gray-700">
          All portfolio projects stored in PostgreSQL.
        </p>
      </section>

      <div className="mb-10 flex flex-col items-start gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <ProjectSearch />
        <p className="text-sm text-gray-500">
          Search updates the URL, filters results on the server, and resets the page to 1.
        </p>
      </div>

      <ProjectList projects={projects} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}