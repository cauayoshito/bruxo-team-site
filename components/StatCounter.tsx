// components/StatCounter.tsx
"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  to: number;
  duration?: number; // ms
};

export default function StatCounter({ to, duration = 1000 }: Props) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        if (visible && !started.current) {
          started.current = true;
          animate();
        }
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => io.disconnect();

    function animate() {
      const t0 = performance.now();
      const from = 0;

      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setValue(Math.round(from + (to - from) * eased));
        if (p < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    }
  }, [to, duration]);

  return <span ref={ref}>{value}</span>;
}
