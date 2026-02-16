"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Advanced Performance Monitoring Hook
 * Tracks Web Vitals and custom performance metrics
 * Used by senior engineers to optimize user experience
 */

interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
  custom?: Record<string, number>;
}

interface PerformanceConfig {
  enableWebVitals?: boolean;
  enableCustomMetrics?: boolean;
  reportCallback?: (metrics: PerformanceMetrics) => void;
}

export function usePerformance(config: PerformanceConfig = {}) {
  const {
    enableWebVitals = true,
    enableCustomMetrics = true,
    reportCallback,
  } = config;

  const metricsRef = useRef<PerformanceMetrics>({});
  const observerRef = useRef<PerformanceObserver | null>(null);

  // Report metrics to analytics service
  const reportMetrics = useCallback((name: string, value: number) => {
    metricsRef.current = {
      ...metricsRef.current,
      [name.toLowerCase().replace(/\s/g, "")]: value,
    };

    // Call custom report callback
    if (reportCallback) {
      reportCallback(metricsRef.current);
    }

    // Log in development
    if (process.env.NODE_ENV === "development") {
      console.log(`[Performance] ${name}:`, value);
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === "production") {
      // window.gtag?.('event', name, { value, metric_id: name });
    }
  }, [reportCallback]);

  // Measure Largest Contentful Paint (LCP)
  const measureLCP = useCallback(() => {
    if (!enableWebVitals || typeof window === "undefined") return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        reportMetrics("LCP", lastEntry.startTime);
      });

      observer.observe({ type: "largest-contentful-paint", buffered: true });
      observerRef.current = observer;
    } catch (e) {
      // PerformanceObserver not supported
    }
  }, [enableWebVitals, reportMetrics]);

  // Measure First Input Delay (FID)
  const measureFID = useCallback(() => {
    if (!enableWebVitals || typeof window === "undefined") return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === "first-input") {
            const fidEntry = entry as PerformanceEventTiming;
            const fid = fidEntry.processingStart - fidEntry.startTime;
            reportMetrics("FID", fid);
          }
        });
      });

      observer.observe({ type: "first-input", buffered: true });
    } catch (e) {
      // PerformanceObserver not supported
    }
  }, [enableWebVitals, reportMetrics]);

  // Measure Cumulative Layout Shift (CLS)
  const measureCLS = useCallback(() => {
    if (!enableWebVitals || typeof window === "undefined") return;

    try {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "layout-shift") {
            const layoutShiftEntry = entry as LayoutShift;
            if (!layoutShiftEntry.hadRecentInput) {
              clsValue += layoutShiftEntry.value;
            }
          }
        }
        reportMetrics("CLS", clsValue);
      });

      observer.observe({ type: "layout-shift", buffered: true });
    } catch (e) {
      // PerformanceObserver not supported
    }
  }, [enableWebVitals, reportMetrics]);

  // Measure First Contentful Paint (FCP)
  const measureFCP = useCallback(() => {
    if (!enableWebVitals || typeof window === "undefined") return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === "first-contentful-paint") {
            reportMetrics("FCP", entry.startTime);
          }
        });
      });

      observer.observe({ type: "paint", buffered: true });
    } catch (e) {
      // PerformanceObserver not supported
    }
  }, [enableWebVitals, reportMetrics]);

  // Measure Time to First Byte (TTFB)
  const measureTTFB = useCallback(() => {
    if (!enableWebVitals || typeof window === "undefined") return;

    try {
      const navigationEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        reportMetrics("TTFB", ttfb);
      }
    } catch (e) {
      // Navigation timing not supported
    }
  }, [enableWebVitals, reportMetrics]);

  // Custom performance mark
  const mark = useCallback((name: string) => {
    if (!enableCustomMetrics || typeof window === "undefined") return;

    try {
      performance.mark(name);
    } catch (e) {
      // Performance API not supported
    }
  }, [enableCustomMetrics]);

  // Measure time between two marks
  const measure = useCallback((name: string, startMark: string, endMark: string) => {
    if (!enableCustomMetrics || typeof window === "undefined") return;

    try {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name)[0];
      reportMetrics(name, measure.duration);
    } catch (e) {
      // Performance API not supported
    }
  }, [enableCustomMetrics, reportMetrics]);

  // Initialize performance monitoring
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Measure Web Vitals
    measureLCP();
    measureFID();
    measureCLS();
    measureFCP();
    measureTTFB();

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [measureLCP, measureFID, measureCLS, measureFCP, measureTTFB]);

  return {
    metrics: metricsRef.current,
    mark,
    measure,
  };
}

/**
 * Hook to measure component render time
 */
export function useRenderTime(componentName: string) {
  const startTime = useRef(performance.now());

  useEffect(() => {
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;

    if (process.env.NODE_ENV === "development") {
      console.log(`[Render Time] ${componentName}:`, `${renderTime.toFixed(2)}ms`);
    }

    // Track slow renders (>16ms = 1 frame at 60fps)
    if (renderTime > 16) {
      console.warn(`[Slow Render] ${componentName} took ${renderTime.toFixed(2)}ms`);
    }
  });
}

/**
 * Hook to detect memory leaks
 */
export function useMemoryMonitor(componentName: string) {
  useEffect(() => {
    if (typeof window === "undefined" || !("memory" in performance)) return;

    const checkMemory = () => {
      const memory = (performance as any).memory;
      if (memory) {
        const usedMB = memory.usedJSHeapSize / 1048576;
        const totalMB = memory.totalJSHeapSize / 1048576;
        const percentage = (usedMB / totalMB) * 100;

        if (process.env.NODE_ENV === "development") {
          console.log(
            `[Memory] ${componentName}:`,
            `${usedMB.toFixed(2)}MB / ${totalMB.toFixed(2)}MB (${percentage.toFixed(1)}%)`
          );
        }

        // Warn if memory usage is high
        if (percentage > 90) {
          console.warn(`[Memory Warning] ${componentName} using ${percentage.toFixed(1)}% of heap`);
        }
      }
    };

    // Check memory on mount and unmount
    checkMemory();
    return () => {
      checkMemory();
    };
  }, [componentName]);
}

// Type definitions for PerformanceObserver entries
interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}
