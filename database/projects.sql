DROP TABLE IF EXISTS projects;

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] NOT NULL,
  link TEXT,
  type TEXT NOT NULL
);

INSERT INTO projects (title, description, technologies, link, type)
VALUES
  (
    'E-Commerce Dashboard',
    'A full-stack Next.js app for managing products.',
    ARRAY['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    'https://lovito.onrender.com',
    'school'
  ),
  (
    'Portfolio Site',
    'A personal portfolio built with Next.js and PostgreSQL.',
    ARRAY['Next.js', 'PostgreSQL', 'Vercel'],
    'https://mr-system.vercel.app/',
    'school'
  ),
  (
    'Doc Voice Document Reader',
    'A document reader application that helps turn written content into spoken audio.',
    ARRAY['React', 'Node.js', 'PostgreSQL'],
    'https://docvoice-rosy.vercel.app/',
    'opensource'
  );