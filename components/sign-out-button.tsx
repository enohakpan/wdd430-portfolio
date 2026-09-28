import { signOut } from '@/auth';

export function SignOutButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/' });
      }}
    >
      <button type="submit" className="rounded border border-white/40 px-3 py-1 text-sm hover:bg-white/10">
        Sign Out
      </button>
    </form>
  );
}
