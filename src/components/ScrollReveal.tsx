"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  direction?: "up" | "left" | "right" | "down";
  /** 0–1, how much of the element must be visible before revealing */
  threshold?: number;
  as?: ElementType;
  style?: CSSProperties;
};

export function ScrollReveal({
  children,
  className = "",
  delayMs = 0,
  direction = "up",
  threshold = 0.12,
  as: Tag = "div",
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref as never}
      className={`sig-scroll-reveal sig-scroll-reveal--${direction} ${visible ? "sig-scroll-reveal--visible" : ""} ${className}`.trim()}
      style={
        {
          ...style,
          transitionDelay: visible ? `${delayMs}ms` : "0ms",
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
