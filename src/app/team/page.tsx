import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CTA } from "@/components/home/CTA";
import { team, teamIntro } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Our Team",
  description: teamIntro.description,
};

function getInitials(name: string) {
  return name
    .replace(/^Mr\.\s*|^Ms\.\s*/i, "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TeamPage() {
  return (
    <>
      <PageHero
        title={teamIntro.title}
        description={teamIntro.subtitle}
        breadcrumb={[{ label: "Who We Are" }]}
      />
      <section className="py-16 border-b border-border bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted leading-relaxed">{teamIntro.description}</p>
        </div>
      </section>
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground text-center mb-12">
            Our Team Members
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="group bg-card rounded-2xl p-6 border border-border hover:border-accent/20 hover:shadow-lg transition-all text-center"
              >
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xl font-bold mx-auto mb-4 group-hover:scale-105 transition-transform">
                  {getInitials(member.name)}
                </div>
                <h3 className="text-base font-bold text-foreground">{member.name}</h3>
                <p className="text-accent text-sm font-medium mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
