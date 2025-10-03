"use client";

import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("nav");
  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-black/40 backdrop-blur border-b border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 focus:outline-none focus:ring-0 outline-none ring-0">
            <img src="/logo black bg.png" alt="Bullion Courier" className="h-10 w-10 rounded-full" />
            <span className="text-xl md:text-2xl font-bold">Bullion Courier</span>
          </a>
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <a href="/" className="hover:text-[var(--brand-accent)]">{t("home")}</a>
            <a href="/tracking" className="hover:text-[var(--brand-accent)]">{t("tracking")}</a>
            <a href="/quote" className="hover:text-[var(--brand-accent)]">{t("quote")}</a>
            <a href="/schedule" className="hover:text-[var(--brand-accent)]">{t("schedule")}</a>
            <a href="/about" className="hover:text-[var(--brand-accent)]">{t("about")}</a>
            <a href="/contact" className="hover:text-[var(--brand-accent)]">{t("contact")}</a>
            <a href="/coverage" className="hover:text-[var(--brand-accent)]">{t("coverage")}</a>
            <a href="/privacy" className="hover:text-[var(--brand-accent)]">{t("privacy")}</a>
            <a href="/dashboard" className="hover:text-[var(--brand-accent)]">{t("dashboard")}</a>
          </nav>
          {/* Mobile menu */}
          <details className="md:hidden relative">
            <summary className="list-none cursor-pointer select-none rounded-md ring-1 ring-black/10 dark:ring-white/10 px-3 py-2">
              Menu
            </summary>
            <div className="absolute right-0 mt-2 w-56 rounded-md border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 shadow-lg p-2 flex flex-col text-sm font-semibold">
              <a href="/" className="rounded px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10 font-bold">{t("home")}</a>
              <a href="/tracking" className="rounded px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10 font-bold">{t("tracking")}</a>
              <a href="/quote" className="rounded px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10 font-bold">{t("quote")}</a>
              <a href="/schedule" className="rounded px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10 font-bold">{t("schedule")}</a>
              <a href="/about" className="rounded px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10 font-bold">{t("about")}</a>
              <a href="/contact" className="rounded px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10 font-bold">{t("contact")}</a>
              <a href="/coverage" className="rounded px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10 font-bold">{t("coverage")}</a>
              <a href="/privacy" className="rounded px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10 font-bold">{t("privacy")}</a>
              <a href="/dashboard" className="rounded px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10 font-bold">{t("dashboard")}</a>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
