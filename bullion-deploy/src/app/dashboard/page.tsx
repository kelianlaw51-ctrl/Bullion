export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-sm text-gray-600 dark:text-gray-300">Sign in and manage shipments, quotes, and invoices. (Coming soon)</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg ring-1 ring-black/10 dark:ring-white/10 p-4">Recent shipments</div>
        <div className="rounded-lg ring-1 ring-black/10 dark:ring-white/10 p-4">Open quotes</div>
        <div className="rounded-lg ring-1 ring-black/10 dark:ring-white/10 p-4">Notifications</div>
      </div>
    </div>
  );
}
