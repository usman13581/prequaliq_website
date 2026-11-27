import type { Metadata } from "next";
import { PlatformPage } from "@/components/marketing/PlatformPage";
import { getLocale } from "@/i18n/server";
import { getProductSite } from "@/i18n/product-site";

export async function generateMetadata(): Promise<Metadata> {
  const page = getProductSite(await getLocale()).platformPage;
  return { title: page.breadcrumb, description: page.description };
}

export default function PlatformFeaturesPage() {
  return <PlatformPage />;
}
