"use client";

import { X } from "lucide-react";
import { useTranslations } from "@/i18n/LanguageProvider";
import { Modal } from "@/components/ui/Modal";
import { ContactForm } from "./ContactForm";

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

export function ContactModal({ open, onClose }: ContactModalProps) {
  const t = useTranslations();

  return (
    <Modal open={open} onClose={onClose} ariaLabelledBy="contact-modal-title" sheetOnMobile>
      <div
        className="relative w-full max-w-lg max-h-[min(92dvh,820px)] sm:max-h-[min(90vh,820px)] bg-card rounded-t-2xl sm:rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 border-b border-border bg-surface flex-shrink-0">
          <div className="min-w-0">
            <h2 id="contact-modal-title" className="text-lg sm:text-xl font-bold text-foreground">
              {t.contact.modal.title}
            </h2>
            <p className="text-sm text-muted mt-1">{t.contact.modal.subtitle}</p>
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
          <ContactForm variant="modal" onClose={onClose} />
        </div>
      </div>
    </Modal>
  );
}
