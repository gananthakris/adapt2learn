import { ReactNode } from "react";
import { AuthGuard } from "@/components/auth/auth-guard";

export default function InstructorLayout({ children }: { children: ReactNode }) {
  return <AuthGuard requiredRole="INSTRUCTOR">{children}</AuthGuard>;
}
