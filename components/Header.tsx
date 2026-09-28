import Link from 'next/link';
import { auth } from '@/auth';
import { SignOutButton } from '@/components/sign-out-button';

export default async function Header() {
  const session = await auth();

  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div id="header-title" className="text-2xl font-bold">Enoh Akpan</div>
      <nav className="max-w-4xl mx-auto px-4 flex justify-between items-center">
        <ul className="flex gap-6">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/about">About</Link></li>
          {session?.user && <li><Link href="/dashboard/projects">Dashboard</Link></li>}
        </ul>
        {session?.user ? (
          <SignOutButton />
        ) : (
          <Link href="/login" className="rounded border border-white/40 px-3 py-1 text-sm hover:bg-white/10">
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
}