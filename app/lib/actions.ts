'use server';

import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { auth, signIn } from '@/auth';
import { createProjectRecord, deleteProjectRecord, getProjectById, updateProjectRecord } from '@/lib/projects-db';

const projectSchema = z.object({
  title: z.string().trim().min(1, 'Title is required.'),
  description: z.string().trim().min(1, 'Description is required.'),
  technologies: z.string().trim().min(1, 'At least one technology is required.'),
  type: z.enum(['school', 'opensource']),
  link: z.union([z.string().trim().url('Link must be a valid URL.'), z.literal('')]).optional(),
});

function normalizeProjectData(formData: FormData) {
  const parsed = projectSchema.parse({
    title: formData.get('title'),
    description: formData.get('description'),
    technologies: formData.get('technologies'),
    type: formData.get('type'),
    link: formData.get('link') ?? '',
  });

  const technologies = parsed.technologies
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  return {
    title: parsed.title,
    description: parsed.description,
    technologies,
    type: parsed.type,
    link: parsed.link || null,
  };
}

async function requireOwnerSession() {
  const session = await auth();
  if (!session?.user) {
    throw new Error('Not authenticated');
  }

  const ownerEmail = process.env.AUTH_OWNER_EMAIL;
  if (!ownerEmail || session.user.email?.toLowerCase() !== ownerEmail.toLowerCase()) {
    throw new Error('Not authorized');
  }

  return session;
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid email or password.';
        default:
          return 'Something went wrong.';
      }
    }

    throw error;
  }

  return prevState;
}

export async function createProject(formData: FormData) {
  await requireOwnerSession();

  const data = normalizeProjectData(formData);
  await createProjectRecord(data);

  revalidatePath('/');
  revalidatePath('/projects');
  revalidatePath('/dashboard/projects');
  redirect('/dashboard/projects');
}

export async function updateProject(id: number, formData: FormData) {
  await requireOwnerSession();

  const existing = await getProjectById(id);
  if (!existing) {
    throw new Error('Project not found');
  }

  const data = normalizeProjectData(formData);
  await updateProjectRecord(id, data);

  revalidatePath('/');
  revalidatePath('/projects');
  revalidatePath('/dashboard/projects');
  redirect('/dashboard/projects');
}

export async function deleteProject(id: number) {
  await requireOwnerSession();

  await deleteProjectRecord(id);

  revalidatePath('/');
  revalidatePath('/projects');
  revalidatePath('/dashboard/projects');
}
