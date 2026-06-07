"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useTranslations } from "@/i18n/LanguageProvider";
import type { LegalDocumentType } from "@/lib/legal-content";

type LegalModalProps = {
  type: LegalDocumentType | null;
  onClose: () => void;
};

export function LegalModal({ type, onClose }: LegalModalProps) {
  const t = useTranslations();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const document = type ? t.legal[type] : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (type) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [type]);

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
      aria-labelledby={document ? "legal-modal-title" : undefined}
      aria-hidden={!document}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      {document && (
        <div
          className="relative w-full max-w-2xl max-h-[min(85vh,720px)] bg-card rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-border bg-surface flex-shrink-0">
            <div>
              <h2 id="legal-modal-title" className="text-xl font-bold text-foreground">
                {document.title}
              </h2>
              <p className="text-xs text-muted mt-1">
                {t.legal.lastUpdatedLabel} {document.lastUpdated}
              </p>
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
            <p className="text-sm text-muted leading-relaxed mb-8">{document.intro}</p>
            <div className="space-y-8">
              {document.sections.map((section) => (
                <section key={section.title}>
                  <h3 className="text-sm font-bold text-foreground mb-3">{section.title}</h3>
                  <div className="space-y-3">
                    {section.paragraphs.map((paragraph, i) => (
                      <p key={i} className="text-sm text-muted leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <div className="px-6 py-4 border-t border-border bg-surface flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-mid transition-colors"
            >
              {t.common.close}
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
