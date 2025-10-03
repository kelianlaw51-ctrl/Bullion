import React from "react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 bg-gray-50 dark:bg-neutral-900 border-r border-black/10 dark:border-white/10 p-4">
        <h2 className="font-semibold mb-4">Admin</h2>
        <nav className="flex flex-col gap-2 text-sm">
          <Link href="/admin" className="hover:text-[var(--brand-accent)]">Dashboard</Link>
          <Link href="/admin/shipments" className="hover:text-[var(--brand-accent)]">Shipments</Link>
          <Link href="/admin/rates" className="hover:text-[var(--brand-accent)]">Rates</Link>
          <Link href="/admin/logs" className="hover:text-[var(--brand-accent)]">Logs</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
