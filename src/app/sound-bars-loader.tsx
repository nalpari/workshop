"use client";

import { useEffect, useState } from "react";

export const LOADER_MS = 2000;

const N = 5; // 5×5 dot matrix
const SPEED = 0.0096; // rad per ms, ≈ dotmatrix "Sound Bars" (dotm-square-18) default speed

// Equalizer bars: each column's height follows its own sine wave, lit from the bottom up.
function dotOpacity(t: number, row: number, col: number) {
  const level = Math.round(3 + 2 * Math.sin(t * SPEED + col * 1.15)); // 1..5
  const top = N - level;
  return row === top ? 1 : row > top ? 0.94 : 0.08;
}

export function SoundBarsLoader() {
  const [t, setT] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      setT(now - t0);
      raf = requestAnimationFrame(tick);
    };
    if (!reduce) raf = requestAnimationFrame(tick);
    const timer = setTimeout(() => {
      setDone(true);
      cancelAnimationFrame(raf);
    }, LOADER_MS);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={done ? "loader done" : "loader"} role="status" aria-label="로딩 중" aria-hidden={done}>
      <div className="dots">
        {Array.from({ length: N * N }, (_, i) => (
          <i key={i} style={{ opacity: dotOpacity(t, Math.floor(i / N), i % N) }} />
        ))}
      </div>
    </div>
  );
}
