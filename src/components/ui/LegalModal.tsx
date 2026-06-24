"use client";

import { X } from "lucide-react";
import { useTranslations } from "@/i18n/LanguageProvider";
import type { LegalDocumentType } from "@/lib/legal-content";
import { Modal } from "@/components/ui/Modal";

type LegalModalProps = {
  type: LegalDocumentType | null;
  onClose: () => void;
};

export function LegalModal({ type, onClose }: LegalModalProps) {
  const t = useTranslations();
  const document = type ? t.legal[type] : null;

  return (
    <Modal open={!!document} onClose={onClose} ariaLabelledBy="legal-modal-title" sheetOnMobile>
      {document && (
        <div
          className="relative w-full max-w-2xl max-h-[min(92dvh,720px)] sm:max-h-[min(85vh,720px)] bg-card rounded-t-2xl sm:rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 border-b border-border bg-surface flex-shrink-0">
            <div className="min-w-0">
              <h2 id="legal-modal-title" className="text-lg sm:text-xl font-bold text-foreground">
                {document.title}
              </h2>
              <p className="text-xs text-muted mt-1">
                {t.legal.lastUpdatedLabel} {document.lastUpdated}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="h-11 w-11 flex items-center justify-center rounded-lg border border-border text-muted hover:text-foreground hover:bg-background transition-colors flex-shrink-0 touch-manipulation"
              aria-label={t.common.close}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-y-auto overscroll-contain px-5 sm:px-6 py-5 sm:py-6 flex-1">
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

          <div className="px-5 sm:px-6 py-4 border-t border-border bg-surface flex-shrink-0 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto min-h-11 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-mid transition-colors touch-manipulation"
            >
              {t.common.close}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
