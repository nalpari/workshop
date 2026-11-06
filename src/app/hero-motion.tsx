"use client";

import { useEffect } from "react";
import { LOADER_MS } from "./sound-bars-loader";

// Entrance reveal, video fade-in and stat count-up from the design (docs/result/index.html).
export function HeroMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    // entrance starts as the loader fades out
    const reveal = setTimeout(() => root.classList.add("in"), LOADER_MS);

    const v = document.getElementById("bg") as HTMLVideoElement;
    const show = () => v.classList.add("on");
    if (!reduce) {
      v.addEventListener("loadeddata", show, { once: true });
      if (v.readyState >= 2) show();
      v.play().catch(() => {});
    }

    let timer: ReturnType<typeof setTimeout> | undefined;
    if (!reduce) {
      const els = document.querySelectorAll<HTMLElement>("[data-count]");
      const fmt = (n: number, d: number) =>
        n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
      const ease = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
      timer = setTimeout(() => {
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / 1600);
          els.forEach((el) => (el.textContent = fmt(+el.dataset.count! * ease(p), +(el.dataset.dec || 0))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      }, LOADER_MS + 1100);
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      clearTimeout(reveal);
      v.removeEventListener("loadeddata", show);
    };
  }, []);

  return null;
}
