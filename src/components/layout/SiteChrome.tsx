"use client";

import { usePathname } from "next/navigation";
import { ProductHeader } from "@/components/marketing/ProductHeader";
import { ProductFooter } from "@/components/marketing/ProductFooter";
import { ContactModalProvider } from "@/components/contact/ContactModalProvider";
import { ProjectModalProvider } from "@/components/project/ProjectModalProvider";
import { ChatWidget } from "@/components/chat/ChatWidget";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <ContactModalProvider>
      <ProjectModalProvider>
        <ProductHeader />
        <main className="flex-1">{children}</main>
        <ProductFooter />
        <ChatWidget />
      </ProjectModalProvider>
    </ContactModalProvider>
  );
}
