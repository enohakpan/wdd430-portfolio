import { LoginForm } from '@/components/login-form';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="mb-4 text-2xl font-bold">Sign In</h1>
        <p className="mb-6 text-sm text-gray-600">Sign in to manage portfolio projects.</p>
        <LoginForm />
      </div>
    </main>
  );
}
