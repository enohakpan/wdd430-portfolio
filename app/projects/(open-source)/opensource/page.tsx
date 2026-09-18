import ProjectList from '@/components/ProjectList';
import { getProjectsByType } from '@/lib/projects-db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function OpenSourceProjects() {
  const projects = await getProjectsByType('opensource');

  return <ProjectList projects={projects} />;
}

export default async function OpenSourcePage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Open Source Projects</h1>
        <p className="text-lg text-gray-700">
          Portfolio projects tagged as open source.
        </p>
      </section>

      <OpenSourceProjects />
    </main>
  );
}
