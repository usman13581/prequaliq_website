"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FileText, LogOut, LayoutDashboard } from "lucide-react";

const NAV = [{ href: "/admin/blogs", label: "Blogs", icon: FileText }] as const;

export function AdminShell({ children, username }: { children: React.ReactNode; username: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-surface flex">
      <aside className="w-56 shrink-0 border-r border-border bg-card flex flex-col">
        <div className="px-4 py-5 border-b border-border">
          <Link href="/admin/blogs" className="flex items-center gap-2 font-bold text-primary">
            <LayoutDashboard className="w-5 h-5" />
            PrequaliQ Admin
          </Link>
          <p className="text-xs text-muted mt-2 truncate">{username}</p>
        </div>
        <nav className="p-3 flex-1 space-y-1">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active ? "bg-accent-subtle text-accent" : "text-muted hover:text-foreground hover:bg-surface"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border">
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-muted hover:text-foreground hover:bg-surface"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </aside>
      <main className="flex-1 min-w-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
