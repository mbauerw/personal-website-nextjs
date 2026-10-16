'use client'
import { useEffect, useRef, useState } from "react";

// Subtle fade-up the first time an element scrolls into view. Uses a CSS transition
// gated behind `motion-safe:`, so visitors who prefer reduced motion get the content
// immediately with no movement, and nothing stays hidden if the observer never fires.
export default function Reveal({ className = "", delay = 0, children }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      className={`${className} motion-safe:transition-[opacity,translate] motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown ? "opacity-100 translate-y-0" : "motion-safe:opacity-0 motion-safe:translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}
