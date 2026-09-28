import type { Project } from '@/lib/projects-db';
import Link from 'next/link';

type ProjectCardProps = Project;

export default function ProjectCard({ id, title, description, technologies, link }: ProjectCardProps) {
  return (
    <article className="rounded border-l-4 border-blue-600 bg-gray-50 p-4">
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="mb-3 text-gray-700">{description}</p>
      <p className="text-sm text-gray-600">
        <strong>Technologies:</strong> {technologies.join(', ')}
      </p>
      <p className="mt-2">
        <Link href={`/projects/${id}`} className="text-blue-600 hover:underline">
          View Details
        </Link>
      </p>
      {link && (
        <p className="mt-2">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Project
          </a>
        </p>
      )}
    </article>
  );
}