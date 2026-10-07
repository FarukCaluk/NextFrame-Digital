"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  image = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  image?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style = { "--d": `${delay}ms` } as React.CSSProperties;

  // The clip-path variant is split in two because a clipped target never intersects the observer.
  if (image) {
    return (
      <div ref={ref} className={className}>
        <div className={`reveal-img h-full w-full ${visible ? "is-visible" : ""}`} style={style}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={style}>
      {children}
    </div>
  );
}
