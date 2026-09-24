"use client";

import gsap from "gsap";
import { useRef, useState } from "react";
import { reducedMotion } from "@/components/Motion";
import { testimonials } from "@/lib/site";

const initials = (name: string) => name.split(" ").map((p) => p[0]).slice(0, 2).join("");

/* Antidote's review carousel: one card at a time, arrows either side, the quote cross-fading on change. */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const card = useRef<HTMLDivElement>(null);
  const item = testimonials[index];

  const go = (step: number) => {
    const next = (index + step + testimonials.length) % testimonials.length;
    const el = card.current;
    if (!el || reducedMotion()) { setIndex(next); return; }
    gsap.to(el, { opacity: 0, x: -24 * step, duration: .3, ease: "power2.in", onComplete: () => {
      setIndex(next);
      gsap.fromTo(el, { opacity: 0, x: 24 * step }, { opacity: 1, x: 0, duration: .5, ease: "power3.out" });
    } });
  };

  return <div className="reviews" aria-roledescription="carousel" aria-label="Client testimonials">
    <button className="reviews-arrow" onClick={() => go(-1)} aria-label="Previous testimonial">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7" /></svg>
    </button>
    <div className="reviews-card" ref={card} aria-live="polite">
      <blockquote><p>“{item.quote}”</p></blockquote>
      <div className="reviews-who">
        <span className="reviews-badge" aria-hidden="true">{initials(item.name)}</span>
        <p><strong>{item.name}</strong><span>{item.role}</span></p>
      </div>
    </div>
    <button className="reviews-arrow" onClick={() => go(1)} aria-label="Next testimonial">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
    </button>
    <p className="reviews-count" aria-hidden="true">{String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</p>
  </div>;
}
