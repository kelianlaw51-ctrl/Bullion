"use client";

export default function StaticCard({
  frameClass,
  title,
  children,
}: {
  frameClass: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={frameClass}>
      <div className="card-inner-simple p-3" style={{ background: "rgba(11,61,145,0.50)" }}>
        <div className="text-xs uppercase tracking-wide text-blue-200">{title}</div>
        {children}
      </div>
    </div>
  );
}
