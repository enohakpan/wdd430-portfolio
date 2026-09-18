import { getAllProjects, getProjectsByType } from '@/lib/projects-db';
import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get('type');
  const projects = type ? await getProjectsByType(type) : await getAllProjects();

  return Response.json(projects);
}