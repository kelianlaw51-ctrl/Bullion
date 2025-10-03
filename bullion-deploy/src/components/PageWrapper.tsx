"use client";

import { usePathname } from 'next/navigation';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  if (isHomepage) {
    return <>{children}</>;
  }

  return (
    <div className="relative text-white min-h-screen bg-neutral-900">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: "url('/background-optimized.jpg')" }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-75"></div>
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
