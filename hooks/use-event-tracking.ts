"use client";

import { useEffect } from "react";

export function useEventTracking(eventName: string, metadata: Record<string, string | number>) {
  useEffect(() => {
    void fetch("/api/recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventName, metadata })
    });
  }, [eventName, metadata]);
}
