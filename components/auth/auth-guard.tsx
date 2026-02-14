"use client";

import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";

type RequiredRole = "LEARNER" | "INSTRUCTOR" | "ADMIN";

export function AuthGuard({ children, requiredRole }: { children: ReactNode; requiredRole?: RequiredRole }) {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (auth.status === "guest" && !auth.isDemoMode && pathname !== "/login") {
      router.replace("/login");
    }

    if (
      auth.status === "authenticated" &&
      requiredRole &&
      !auth.isDemoMode &&
      auth.role !== requiredRole &&
      auth.role !== "ADMIN"
    ) {
      router.replace("/dashboard");
    }
  }, [auth.status, auth.isDemoMode, auth.role, pathname, requiredRole, router]);

  if (auth.status === "loading") {
    return <div className="rounded-lg border border-[var(--border)] bg-white p-4">Loading authentication...</div>;
  }

  if (auth.status === "guest" && !auth.isDemoMode) {
    return <div className="rounded-lg border border-[var(--border)] bg-white p-4">Redirecting to login...</div>;
  }

  if (
    auth.status === "authenticated" &&
    requiredRole &&
    !auth.isDemoMode &&
    auth.role !== requiredRole &&
    auth.role !== "ADMIN"
  ) {
    return <div className="rounded-lg border border-[var(--border)] bg-white p-4">Redirecting to authorized section...</div>;
  }

  return <>{children}</>;
}
