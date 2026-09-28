import { sql } from '@vercel/postgres';

const ITEMS_PER_PAGE = 2;

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  type: string;
}

export interface ProjectMutationInput {
  title: string;
  description: string;
  technologies: string[];
  link: string | null;
  type: 'school' | 'opensource';
}

type ProjectRow = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link: string | null;
  type: string;
};

function mapProject(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    technologies: row.technologies,
    link: row.link ?? undefined,
    type: row.type,
  };
}

function escapeLikePattern(value: string) {
  return value.replaceAll('\\', '\\\\').replaceAll('%', '\\%').replaceAll('_', '\\_');
}

function buildSearchPattern(query: string) {
  return `%${escapeLikePattern(query.trim())}%`;
}

export async function getAllProjects(): Promise<Project[]> {
  const result = await sql<ProjectRow>`
    SELECT id, title, description, technologies, link, type
    FROM projects
    ORDER BY id;
  `;

  return result.rows.map(mapProject);
}

export async function getProjectsByType(type: string): Promise<Project[]> {
  const result = await sql<ProjectRow>`
    SELECT id, title, description, technologies, link, type
    FROM projects
    WHERE type = ${type}
    ORDER BY id;
  `;

  return result.rows.map(mapProject);
}

export async function getProjectById(id: number): Promise<Project | null> {
  const result = await sql<ProjectRow>`
    SELECT id, title, description, technologies, link, type
    FROM projects
    WHERE id = ${id}
    LIMIT 1;
  `;

  const row = result.rows[0];

  return row ? mapProject(row) : null;
}

export async function fetchFilteredProjects(
  query: string,
  currentPage: number
): Promise<Project[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    const result = await sql<ProjectRow>`
      SELECT id, title, description, technologies, link, type
      FROM projects
      ORDER BY id
      LIMIT ${ITEMS_PER_PAGE}
      OFFSET ${offset};
    `;

    return result.rows.map(mapProject);
  }

  const pattern = buildSearchPattern(normalizedQuery);

  const result = await sql<ProjectRow>`
    SELECT id, title, description, technologies, link, type
    FROM projects
    WHERE title ILIKE ${pattern} ESCAPE '\\'
      OR description ILIKE ${pattern} ESCAPE '\\'
      OR EXISTS (
        SELECT 1
        FROM unnest(technologies) AS technology
        WHERE technology ILIKE ${pattern} ESCAPE '\\'
      )
    ORDER BY id
    LIMIT ${ITEMS_PER_PAGE}
    OFFSET ${offset};
  `;

  return result.rows.map(mapProject);
}

export async function fetchProjectsPages(query: string): Promise<number> {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    const result = await sql<{ count: number }>`
      SELECT COUNT(*)::int AS count
      FROM projects;
    `;

    return Math.ceil(result.rows[0].count / ITEMS_PER_PAGE);
  }

  const pattern = buildSearchPattern(normalizedQuery);

  const result = await sql<{ count: number }>`
    SELECT COUNT(*)::int AS count
    FROM projects
    WHERE title ILIKE ${pattern} ESCAPE '\\'
      OR description ILIKE ${pattern} ESCAPE '\\'
      OR EXISTS (
        SELECT 1
        FROM unnest(technologies) AS technology
        WHERE technology ILIKE ${pattern} ESCAPE '\\'
      );
  `;

  return Math.ceil(result.rows[0].count / ITEMS_PER_PAGE);
}

export async function createProjectRecord(data: ProjectMutationInput): Promise<void> {
  await sql`
    INSERT INTO projects (title, description, technologies, link, type)
    VALUES (${data.title}, ${data.description}, ${data.technologies}, ${data.link}, ${data.type});
  `;
}

export async function updateProjectRecord(id: number, data: ProjectMutationInput): Promise<void> {
  await sql`
    UPDATE projects
    SET title = ${data.title},
        description = ${data.description},
        technologies = ${data.technologies},
        link = ${data.link},
        type = ${data.type}
    WHERE id = ${id};
  `;
}

export async function deleteProjectRecord(id: number): Promise<void> {
  await sql`
    DELETE FROM projects
    WHERE id = ${id};
  `;
}