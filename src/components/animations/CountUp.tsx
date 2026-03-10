"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

const CountUp = ({
  end,
  start = 0,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: CountUpProps) => {
  const [displayValue, setDisplayValue] = useState<string>(
    `${prefix}${start.toFixed(decimals)}${suffix}`
  );
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = performance.now();
    const totalChange = end - start;
    const durationMs = duration * 1000;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const easedProgress = easeOutCubic(progress);
      const currentValue = start + totalChange * easedProgress;

      setDisplayValue(
        `${prefix}${currentValue.toFixed(decimals)}${suffix}`
      );

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(`${prefix}${end.toFixed(decimals)}${suffix}`);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [hasStarted, end, start, duration, prefix, suffix, decimals]);

  return (
    <span
      ref={elementRef}
      className={cn("tabular-nums", className)}
      aria-live="polite"
      aria-label={`${prefix}${end.toFixed(decimals)}${suffix}`}
    >
      {displayValue}
    </span>
  );
};

export { CountUp };
export type { CountUpProps };
