"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useTranslations } from "@/i18n/LanguageProvider";
import { ContactForm } from "./ContactForm";

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

export function ContactModal({ open, onClose }: ContactModalProps) {
  const t = useTranslations();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="legal-dialog fixed inset-0 z-[100] m-0 max-h-none max-w-none w-full h-full bg-transparent p-0 backdrop:bg-primary/60 backdrop:backdrop-blur-sm hidden open:flex items-center justify-center p-4 sm:p-6"
      aria-labelledby="contact-modal-title"
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      {open && (
        <div
          className="relative w-full max-w-lg max-h-[min(90vh,820px)] bg-card rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-border bg-surface flex-shrink-0">
            <div>
              <h2 id="contact-modal-title" className="text-xl font-bold text-foreground">
                {t.contact.modal.title}
              </h2>
              <p className="text-sm text-muted mt-1">{t.contact.modal.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="h-9 w-9 flex items-center justify-center rounded-lg border border-border text-muted hover:text-foreground hover:bg-background transition-colors flex-shrink-0"
              aria-label={t.common.close}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-y-auto px-6 py-6 flex-1">
            <ContactForm variant="modal" />
          </div>
        </div>
      )}
    </dialog>
  );
}
