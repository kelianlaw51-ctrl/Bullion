import { login } from "./actions";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-950">
      <div className="w-full max-w-sm p-6 bg-white dark:bg-neutral-900 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
        <form action={login}>
          <label htmlFor="key" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Admin Key</label>
          <input
            id="key"
            name="key"
            type="password"
            required
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-accent focus:border-brand-accent"
          />
          <button
            type="submit"
            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-brand-accent hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
