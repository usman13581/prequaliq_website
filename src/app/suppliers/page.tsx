import type { Metadata } from "next";
import { AudiencePage } from "@/components/marketing/AudiencePage";
import { getLocale } from "@/i18n/server";
import { getProductSite } from "@/i18n/product-site";

export async function generateMetadata(): Promise<Metadata> {
  const page = getProductSite(await getLocale()).suppliersPage;
  return { title: page.breadcrumb, description: page.description };
}

export default function SuppliersPage() {
  return <AudiencePage kind="suppliersPage" />;
}
