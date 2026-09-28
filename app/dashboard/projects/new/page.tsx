import Link from 'next/link';
import type { Metadata } from 'next';

import { createProject } from '@/app/lib/actions';

export const metadata: Metadata = {
  title: 'Create Project',
  description: 'Create a new portfolio project from the dashboard.',
};

export default function NewProjectPage() {
  return (
    <main className="container mx-auto max-w-2xl px-4 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Create Project</h1>
        <Link href="/dashboard/projects" className="text-sm text-blue-700 hover:underline">
          Back to dashboard
        </Link>
      </div>

      <form action={createProject} className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">Title</label>
          <input id="title" name="title" required className="w-full rounded-md border border-gray-300 px-3 py-2 text-black" />
        </div>

        <div>
          <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" name="description" required rows={4} className="w-full rounded-md border border-gray-300 px-3 py-2 text-black" />
        </div>

        <div>
          <label htmlFor="technologies" className="mb-1 block text-sm font-medium text-gray-700">Technologies</label>
          <input
            id="technologies"
            name="technologies"
            required
            placeholder="Next.js, React, PostgreSQL"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-black"
          />
        </div>

        <div>
          <label htmlFor="type" className="mb-1 block text-sm font-medium text-gray-700">Type</label>
          <select id="type" name="type" required className="w-full rounded-md border border-gray-300 px-3 py-2 text-black">
            <option value="school">school</option>
            <option value="opensource">opensource</option>
          </select>
        </div>

        <div>
          <label htmlFor="link" className="mb-1 block text-sm font-medium text-gray-700">Project URL (optional)</label>
          <input id="link" name="link" type="url" className="w-full rounded-md border border-gray-300 px-3 py-2 text-black" />
        </div>

        <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
          Create Project
        </button>
      </form>
    </main>
  );
}
