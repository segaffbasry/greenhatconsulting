"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { reducedMotion } from "@/components/Motion";
import { Btn } from "@/components/ui";
import { contact, hero, services, tagline } from "@/lib/site";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* A ring of dots in the manner of an LED matrix, brightest along one arc. Built once, drawn as SVG. */
const ring = (() => {
  const dots: { x: number; y: number; r: number; o: number }[] = [];
  const size = 44, c = size / 2;
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const dx = x - c + .5, dy = y - c + .5, d = Math.hypot(dx, dy);
    if (d < 11 || d > 21.5) continue;
    const angle = (Math.atan2(dy, dx) + Math.PI) / (Math.PI * 2);
    const band = 1 - Math.abs(d - 16.25) / 5.25;
    const o = Math.max(.08, Math.pow(angle, 1.6) * band);
    dots.push({ x: x * 10 + 5, y: y * 10 + 5, r: Math.round((1.2 + 2.6 * o) * 100) / 100, o: Math.round(o * 100) / 100 });
  }
  return dots;
})();

/* The opening moment, and the one place heavy motion is earned: the pixel headline switches on letter by
   letter like a site LED board, with a few characters flickering before they hold. */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current; if (!el) return;
    const chars = el.querySelectorAll<HTMLElement>(".hero-char");
    const ctx = gsap.context(() => {
      if (reducedMotion()) { gsap.set(chars, { opacity: 1 }); return; }
      const tl = gsap.timeline({ delay: .25 });
      tl.fromTo(chars, { opacity: 0 }, { opacity: 1, duration: .01, stagger: { each: .028, from: "random" } })
        .to(gsap.utils.shuffle([...chars]).slice(0, 7), { keyframes: { opacity: [1, .15, 1, .3, 1] }, duration: .45, stagger: .06, ease: "steps(4)" }, .5)
        .fromTo(el.querySelectorAll(".hero-in"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: .08 }, .7)
        .fromTo(el.querySelector(".hero-ring"), { opacity: 0, scale: .92 }, { opacity: 1, scale: 1, duration: 1.8, ease: "power3.out" }, .3);
      gsap.to(el.querySelector(".hero-ring svg"), { rotate: 90, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
    }, el);
    return () => ctx.revert();
  }, []);

  const words = hero.lead.split(" ");
  return <section className="hero" ref={root} data-bg="navy">
    <div className="hero-ring" aria-hidden="true">
      <svg viewBox="0 0 440 440">{ring.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={d.r} opacity={d.o} />)}</svg>
    </div>
    <div className="hero-grid wrap">
      <h1 className="hero-title">
        <span className="hero-pixel" aria-hidden="true">
          {words.map((word, w) => <span className="hero-word" key={w}>{[...word].map((ch, i) => <span className="hero-char" key={i}>{ch}</span>)}</span>)}
        </span>
        <span className="sr-only">{hero.lead} </span>
        <span className="hero-rest hero-in">{hero.rest}</span>
      </h1>
      <div className="hero-side hero-in" aria-hidden="true">
        <span className="hero-year">2013</span>
        <span className="hero-line" />
        <span className="hero-vert">./ {tagline.join(" • ")}</span>
      </div>
      <div className="hero-copy">
        <p className="hero-in">{hero.body}</p>
        <div className="hero-actions hero-in">
          <Btn href={services.all}>Explore our services</Btn>
          <a className="hero-phone" href={contact.phoneHref}>T: {contact.phone}</a>
        </div>
      </div>
    </div>
  </section>;
}

/* Full-bleed band on Green Hat's own site film. The frame opens from an inset card to the full screen, then
   the three words of the strapline take turns in the middle as the page scrolls past. */
export function VideoBand() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current; if (!el) return;
    const video = el.querySelector("video");
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".band-word");
      if (reducedMotion()) { gsap.set(words.slice(1), { opacity: 0 }); video?.pause(); return; }
      gsap.fromTo(".band-frame", { clipPath: "inset(10% 6% 10% 6% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "top top", scrub: true } });
      gsap.set(words, { opacity: 0, yPercent: 30 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: .6 } });
      words.forEach((word, i) => {
        tl.to(word, { opacity: 1, yPercent: 0, duration: 1, ease: "power2.out" }, i * 2);
        if (i < words.length - 1) tl.to(word, { opacity: 0, yPercent: -30, duration: .8, ease: "power2.in" }, i * 2 + 1.1);
      });
    }, el);
    const io = new IntersectionObserver(([entry]) => { if (!video) return; if (entry.isIntersecting && !reducedMotion()) video.play().catch(() => {}); else video.pause(); });
    io.observe(el);
    return () => { io.disconnect(); ctx.revert(); };
  }, []);

  return <section className="band" ref={root} data-tone="dark" aria-label="Support, inspire, protect">
    <div className="band-sticky">
      <div className="band-frame">
        <video src={hero.video} poster={hero.poster} muted loop playsInline preload="metadata" aria-hidden="true" />
        <div className="band-shade" />
        <p className="band-corner band-tl">Health &amp; Safety</p>
        <p className="band-corner band-tr">Principal Design</p>
        <p className="band-corner band-bl">Safety Schemes in Procurement</p>
        <p className="band-corner band-br">Wales &amp; the Southwest</p>
        <div className="band-words">{tagline.map((word) => <span className="band-word" key={word}>{word}</span>)}</div>
      </div>
    </div>
  </section>;
}
