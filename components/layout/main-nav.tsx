"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

const routes: { href: Route; label: string }[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/skill-graph", label: "Skill Graph" },
  { href: "/tutor", label: "AI Tutor" },
  { href: "/analytics", label: "Analytics" },
  { href: "/class-analytics", label: "Instructor" }
];

export function MainNav() {
  const pathname = usePathname();
  const auth = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[rgba(246,244,239,0.92)] backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-3">
        <Link href="/" className="mr-4 text-lg font-bold">Adapt2Learn</Link>
        {routes.map((route) => {
          const active = pathname === route.href;
          return (
            <Link
              key={route.href}
              href={route.href}
              className={active ? "rounded-md bg-[var(--accent)] px-3 py-1.5 text-white" : "rounded-md px-3 py-1.5 text-[var(--muted)] hover:bg-white"}
            >
              {route.label}
            </Link>
          );
        })}
        <div className="ml-auto flex items-center gap-2 text-sm">
          {auth.status === "loading" && <span className="text-[var(--muted)]">Checking auth...</span>}
          {auth.status !== "loading" && (
            <>
              <span className="rounded-md border border-[var(--border)] px-2 py-1">
                {auth.isDemoMode ? "Demo Mode" : "Live Auth"}
              </span>
              <span className="text-[var(--muted)]">{auth.username ?? "Guest"}</span>
            </>
          )}
          {auth.status === "guest" && (
            <Link href="/login" className="rounded-md bg-[var(--accent)] px-3 py-1.5 text-white">
              Login
            </Link>
          )}
          {auth.status === "authenticated" && (
            <button onClick={() => void auth.signOut()} className="rounded-md border border-[var(--border)] px-3 py-1.5">
              Sign out
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
