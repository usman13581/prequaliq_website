"use client";

import {
  BadgeCheck, Handshake, LayoutDashboard, ListChecks, Lock, MessagesSquare, Scale, Send, UserRoundPen,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ZoomableScreenshot } from "@/components/marketing/ZoomableScreenshot";
import { Button } from "@/components/ui/Button";
import { useContactModal } from "@/components/contact/ContactModalProvider";
import { useLanguage } from "@/i18n/LanguageProvider";
import { getProductSite } from "@/i18n/product-site";
import { prequaliqAppsImages } from "@/lib/static-images";
import { PLATFORM_REGISTER_URL } from "@/lib/platform-urls";

type AudienceKey = "buyersPage" | "suppliersPage";

export function AudiencePage({ kind }: { kind: AudienceKey }) {
  const { locale } = useLanguage();
  const site = getProductSite(locale);
  const content = site[kind];
  const { openContactModal } = useContactModal();
  const isSuppliers = kind === "suppliersPage";
  const signupLabel = locale === "sv" ? "Skapa gratis konto" : "Create free account";
  const stepLabel = locale === "sv" ? "Steg" : "Step";
  const screenLabel = locale === "sv" ? "Skärmbild från Prequaliq" : "Prequaliq screen";
  const enlargeLabel = locale === "sv" ? "Förstora" : "Enlarge";
  const closeLabel = locale === "sv" ? "Stäng" : "Close";
  // One screenshot and one icon per step, in the order of the sections.
  const imagePrefix = isSuppliers ? "supplier" : "buyer";
  // The Swedish pages show the application in Swedish.
  const imageFolder = locale === "sv" ? "sv/" : "";
  const imageNames = isSuppliers
    ? ["profile", "approved", "home", "questions", "bid", "contract"]
    : ["home", "questionnaire", "publish", "questions", "evaluate", "contract"];
  const icons: LucideIcon[] = isSuppliers
    ? [UserRoundPen, BadgeCheck, LayoutDashboard, MessagesSquare, Lock, Handshake]
    : [LayoutDashboard, ListChecks, Send, MessagesSquare, Scale, Handshake];

  return (
    <>
      <PageHero
        title={content.title}
        description={content.description}
        backgroundImage={prequaliqAppsImages.hero}
        breadcrumb={[{ label: content.breadcrumb }]}
        homeLabel={locale === "sv" ? "Startsida" : "Home"}
        action={
          isSuppliers ? (
            <Button href={PLATFORM_REGISTER_URL} variant="white" size="md" icon>
              {signupLabel}
            </Button>
          ) : (
            <Button variant="white" size="md" icon onClick={() => openContactModal()}>
              {site.nav.contactSales}
            </Button>
          )
        }
      />

      <section className="section-light pattern-dots py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="space-y-16 lg:space-y-24">
            {content.sections.map((section, i) => {
              const Icon = icons[i] ?? icons[0];
              return (
                <li key={section.title} className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white">
                        <Icon className="w-5 h-5" aria-hidden />
                      </span>
                      <span className="text-sm font-bold tabular-nums tracking-widest text-accent">
                        {stepLabel} {String(i + 1).padStart(2, "0")} / {String(content.sections.length).padStart(2, "0")}
                      </span>
                    </div>
                    <h2 className="mt-5 font-display text-2xl sm:text-3xl font-semibold text-foreground leading-snug">
                      {section.title}
                    </h2>
                    <p className="mt-4 text-muted leading-relaxed text-base max-w-xl">{section.body}</p>
                  </div>

                  {/* The real screen for this step, framed like a browser window; click to enlarge. */}
                  <figure className={`min-w-0 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <ZoomableScreenshot
                      src={`/images/platform/${imageFolder}${imagePrefix}-${i + 1}-${imageNames[i]}.jpg`}
                      alt={`${screenLabel}: ${section.title}`}
                      width={1440}
                      height={900}
                      enlargeLabel={enlargeLabel}
                      closeLabel={closeLabel}
                    />
                  </figure>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="section-dark pattern-rings py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-semibold text-foreground">{site.cta.title}</h2>
          <p className="mt-3 text-muted">{site.cta.description}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {isSuppliers ? (
              <Button href={PLATFORM_REGISTER_URL} size="lg" variant="white" icon>
                {signupLabel}
              </Button>
            ) : (
              <Button size="lg" variant="white" icon onClick={() => openContactModal()}>
                {site.cta.button}
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
