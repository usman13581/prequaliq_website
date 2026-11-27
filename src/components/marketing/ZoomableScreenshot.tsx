"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Button label for screen readers, e.g. "Enlarge image". */
  enlargeLabel: string;
  closeLabel: string;
};

/**
 * A screenshot in a browser-style frame that opens full size when clicked.
 * Closes with the close button, a click outside the image, or Escape.
 */
export function ZoomableScreenshot({
  src,
  alt,
  width,
  height,
  enlargeLabel,
  closeLabel,
}: Props) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const opener = openerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${enlargeLabel}: ${alt}`}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-lg border border-border-strong bg-card text-left shadow-xl shadow-primary/10 transition-shadow hover:shadow-2xl hover:shadow-primary/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <span
          className="flex items-center gap-1.5 border-b border-border bg-surface px-3 py-2"
          aria-hidden
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[#f87171]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#34d399]" />
        </span>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="block h-auto w-full"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <span
          className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-[#0b1220]/85 px-3 py-1.5 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden
        >
          <ZoomIn className="h-4 w-4" />
          {enlargeLabel}
        </span>
      </button>

      {/* Rendered on <body>: the page sections are their own stacking layers and would trap it under the header. */}
      {open
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={alt}
              className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-[#050910]/90 p-3 sm:p-8"
              onClick={() => setOpen(false)}
            >
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label={closeLabel}
                className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:right-6 sm:top-6"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
              {/* The file itself at full size; the page only ever needs it once a visitor asks for it. */}
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                sizes="100vw"
                // As wide as the window allows while the whole screenshot stays visible.
                style={{
                  width: `min(100%, calc((100dvh - 4rem) * ${width} / ${height}))`,
                }}
                className="h-auto cursor-default rounded-md shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
