import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getProjectById } from '@/lib/projects-db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (!Number.isInteger(id) || id < 1) {
    return {
      title: 'Project Not Found',
      description: 'The requested portfolio project could not be found.',
    };
  }

  const project = await getProjectById(id);

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested portfolio project could not be found.',
    };
  }

  const description = project.description;

  return {
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      images: ['/opengraph-image.png'],
    },
    twitter: {
      title: project.title,
      description,
      images: ['/opengraph-image.png'],
    },
  };
}

export default async function ProjectPage(props: Props) {
  const params = await props.params;
  const id = Number(params.id);

  if (!Number.isInteger(id) || id < 1) {
    notFound();
  }

  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <main className="container mx-auto max-w-3xl px-4 py-12">
      <article className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <p className="mb-3 text-sm uppercase tracking-wide text-gray-500">{project.type}</p>
        <h1 className="mb-4 text-3xl font-bold">{project.title}</h1>
        <p className="mb-6 text-gray-700">{project.description}</p>
        <p className="mb-6 text-sm text-gray-700">
          <strong>Technologies:</strong> {project.technologies.join(', ')}
        </p>

        <div className="flex flex-wrap gap-3">
          <Link href="/projects" className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            Back to Projects
          </Link>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            >
              Visit Live Project
            </a>
          )}
        </div>
      </article>
    </main>
  );
}
