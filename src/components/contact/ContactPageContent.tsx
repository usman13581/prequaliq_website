"use client";

import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/site-data";
import { Mail, Phone, MapPin } from "lucide-react";
import { useTranslations } from "@/i18n/LanguageProvider";
import { backgroundImages } from "@/lib/static-images";

export function ContactPageContent() {
  const t = useTranslations();

  return (
    <>
      <PageHero
        title={t.contact.page.title}
        description={t.contact.page.subtitle}
        breadcrumb={[{ label: t.contact.page.breadcrumb }]}
        backgroundImage={backgroundImages.contact}
        homeLabel={t.nav.home}
      />
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.contact.page.getInTouch}</h2>
              <div className="space-y-4">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-surface border border-border hover:border-accent/30 transition-colors"
                >
                  <div className="h-10 w-10 rounded-xl bg-accent-subtle text-accent flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-light">
                      {t.common.email}
                    </p>
                    <p className="text-sm text-foreground mt-0.5">{siteConfig.email}</p>
                  </div>
                </a>
                {siteConfig.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="flex items-start gap-4 p-4 rounded-xl bg-surface border border-border hover:border-accent/30 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-xl bg-accent-subtle text-accent flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-light">
                        {t.common.phone}
                      </p>
                      <p className="text-sm text-foreground mt-0.5">{phone}</p>
                    </div>
                  </a>
                ))}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-surface border border-border">
                  <div className="h-10 w-10 rounded-xl bg-accent-subtle text-accent flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-light">
                      {t.common.office}
                    </p>
                    <p className="text-sm text-foreground mt-0.5 leading-relaxed">{siteConfig.address}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
