"use client";

import { useEffect, useRef, useState, RefObject } from "react";

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
  triggerOnce?: boolean;
}

/**
 * Advanced Intersection Observer Hook
 * Used for lazy loading, scroll animations, and performance optimization
 * Senior engineers use this for efficient viewport detection
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T>, boolean, IntersectionObserverEntry | undefined] {
  const {
    threshold = 0,
    root = null,
    rootMargin = "0px",
    freezeOnceVisible = false,
    triggerOnce = false,
  } = options;

  const elementRef = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const frozen = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Don't observe if already frozen
    if (frozen.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        setEntry(entry);

        // Update state if not frozen
        if (!frozen.current) {
          setIsIntersecting(isElementIntersecting);

          // Freeze if configured and element is visible
          if (freezeOnceVisible && isElementIntersecting) {
            frozen.current = true;
          }

          // Disconnect if trigger once and element became visible
          if (triggerOnce && isElementIntersecting && observer) {
            observer.disconnect();
          }
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, freezeOnceVisible, triggerOnce]);

  return [elementRef, isIntersecting, entry];
}

/**
 * Hook for lazy loading images
 */
export function useLazyImage(src: string, placeholder?: string) {
  const [imageSrc, setImageSrc] = useState(placeholder || "");
  const [imageRef, isVisible] = useIntersectionObserver<HTMLImageElement>({
    triggerOnce: true,
    rootMargin: "50px", // Start loading 50px before visible
  });

  useEffect(() => {
    if (isVisible && src) {
      // Preload image
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
      };
    }
  }, [isVisible, src]);

  return { ref: imageRef, src: imageSrc, isLoaded: imageSrc === src };
}

/**
 * Hook for scroll-triggered animations
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  animationClass: string = "animate-fade-in-up",
  options: UseIntersectionObserverOptions = {}
) {
  const [ref, isVisible] = useIntersectionObserver<T>({
    threshold: 0.1,
    triggerOnce: true,
    ...options,
  });

  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Small delay for smoother animation
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return {
    ref,
    className: shouldAnimate ? animationClass : "opacity-0",
    isVisible,
  };
}

/**
 * Hook for infinite scroll / pagination
 */
export function useInfiniteScroll<T extends HTMLElement = HTMLDivElement>(
  onLoadMore: () => void,
  options: { hasMore: boolean; isLoading: boolean } = {
    hasMore: true,
    isLoading: false,
  }
) {
  const [sentinelRef, isVisible] = useIntersectionObserver<T>({
    threshold: 0,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (isVisible && options.hasMore && !options.isLoading) {
      onLoadMore();
    }
  }, [isVisible, options.hasMore, options.isLoading, onLoadMore]);

  return { sentinelRef, isVisible };
}

/**
 * Hook to track element visibility percentage
 */
export function useVisibilityPercentage<T extends HTMLElement = HTMLDivElement>() {
  const elementRef = useRef<T>(null);
  const [visibilityPercentage, setVisibilityPercentage] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Create observer with multiple thresholds
    const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisibilityPercentage(Math.round(entry.intersectionRatio * 100));
      },
      { threshold: thresholds }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return [elementRef, visibilityPercentage] as const;
}

/**
 * Hook to pause/resume video based on visibility
 */
export function useVideoPlayback() {
  const [videoRef, isVisible] = useIntersectionObserver<HTMLVideoElement>({
    threshold: 0.5, // Play when 50% visible
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible) {
      video.play().catch((e) => {
        // Autoplay might be blocked
        console.log("Video autoplay prevented:", e);
      });
    } else {
      video.pause();
    }
  }, [isVisible, videoRef]);

  return videoRef;
}
