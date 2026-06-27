import { redirect } from "next/navigation";
import { getSessionFromCookies } from "@/lib/auth";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminBlogsLayout({ children }: { children: React.ReactNode }) {
  const session = await getSessionFromCookies();
  if (!session) redirect("/admin/login");

  return <AdminShell username={session.username}>{children}</AdminShell>;
}
