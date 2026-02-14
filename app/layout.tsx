import "./globals.css";
import { ReactNode } from "react";
import { MainNav } from "@/components/layout/main-nav";
import { AppProviders } from "@/components/providers/app-providers";

export const metadata = {
  title: "Adapt2Learn",
  description: "AI-native adaptive learning platform"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <MainNav />
          <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
