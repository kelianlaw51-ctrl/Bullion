"use client";

import { useRef, useState, useEffect } from "react";

export default function CollapsibleCard({
  frameClass,
  title,
  subtitle,
  detailLabel,
  detailValue,
}: {
  frameClass: string;
  title: string;
  subtitle: string;
  detailLabel: string;
  detailValue?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    // Set the height when the content is available
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [detailValue]); // Recalculate if detailValue changes

  return (
    <div className={`${frameClass} card-float`}>
      <div className="card-inner-simple">
        <button
          type="button"
          onClick={() => setOpen((isOpen) => !isOpen)}
          className="w-full p-3 flex items-center justify-between cursor-pointer select-none text-left"
          aria-expanded={open}
        >
          <div>
            <div className="text-xs uppercase tracking-wide text-gray-500">{title}</div>
            <div className="mt-0.5 text-sm font-semibold text-white">{subtitle}</div>
          </div>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.38a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          style={{ maxHeight: open ? contentHeight : 0, transition: "max-height 300ms ease-out" }}
          className="overflow-hidden"
        >
          <div ref={contentRef} className="px-3 pb-3 pt-0 text-xs text-gray-400 border-t border-white/10">
            {detailLabel}: {detailValue || "Not provided"}
          </div>
        </div>
      </div>
    </div>
  );
}
