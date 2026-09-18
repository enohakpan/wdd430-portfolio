import { Suspense } from 'react';

import ProjectList from '@/components/ProjectList';
import { ProjectGridSkeleton } from '@/components/ProjectSkeletons';
import { getProjectsByType } from '@/lib/projects-db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function SchoolProjectList() {
  const projects = await getProjectsByType('school');

  return <ProjectList projects={projects} />;
}

export default function SchoolPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">School Projects</h1>
        <p className="text-lg text-gray-700">
          Portfolio projects tagged as school assignments.
        </p>
      </section>

      <Suspense fallback={<ProjectGridSkeleton />}>
        <SchoolProjectList />
      </Suspense>
    </main>
  );
}