"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabelledBy?: string;
  /** Mobile: bottom sheet. Desktop: centered dialog. */
  sheetOnMobile?: boolean;
};

export function Modal({
  open,
  onClose,
  children,
  ariaLabelledBy,
  sheetOnMobile = false,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-[400] flex bg-primary/60 max-sm:bg-primary/70 max-sm:backdrop-blur-none sm:backdrop-blur-sm ${
        sheetOnMobile
          ? "items-end justify-center p-0 sm:items-center sm:p-4 md:p-6"
          : "items-center justify-center p-4 sm:p-6"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledBy}
      onClick={(event) => {
        if (event.target === overlayRef.current) onClose();
      }}
    >
      {children}
    </div>,
    document.body,
  );
}
