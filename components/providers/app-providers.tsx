"use client";

import { ReactNode, useEffect } from "react";
import { configureAmplifyClient } from "@/lib/amplify-client";

export function AppProviders({ children }: { children: ReactNode }) {
  useEffect(() => {
    configureAmplifyClient();
  }, []);

  return <>{children}</>;
}
