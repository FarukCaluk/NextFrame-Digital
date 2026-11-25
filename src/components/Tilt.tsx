"use client";

import type { PointerEvent, ReactNode } from "react";

/** Tilts its content towards the mouse, without changing any colour. Ignores touch. */
export default function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${((0.5 - y) * 8).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((x - 0.5) * 8).toFixed(2)}deg`);
  };
  const leave = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.removeProperty("--rx");
    e.currentTarget.style.removeProperty("--ry");
  };

  return (
    <div onPointerMove={move} onPointerLeave={leave} className={`tilt rounded-surface ${className}`}>
      {children}
    </div>
  );
}
