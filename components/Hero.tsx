"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { reducedMotion } from "@/components/Motion";
import { Btn } from "@/components/ui";
import { contact, hero, services } from "@/lib/site";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const facts = [
  { value: "2013", label: "Established in Swansea" },
  { value: "3,933", label: "H&S inspections completed" },
  { value: "Wales & the Southwest", label: "Construction specialists" },
];

/* Opening on Green Hat's own site film: consultants on live construction sites. The headline rises in line
   by line from behind a mask while the film settles from a slight zoom; that is the one heavier moment. */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current; if (!el) return;
    const video = el.querySelector("video");
    const ctx = gsap.context(() => {
      const lines = el.querySelectorAll(".hero-line-inner");
      const rest = el.querySelectorAll(".hero-in");
      if (reducedMotion()) { gsap.set([lines, rest], { opacity: 1, yPercent: 0, y: 0 }); video?.pause(); return; }
      gsap.timeline({ delay: .15 })
        .fromTo(".hero-media", { scale: 1.12 }, { scale: 1, duration: 2.6, ease: "power3.out" }, 0)
        .fromTo(lines, { yPercent: 110 }, { yPercent: 0, duration: 1.3, ease: "power4.out", stagger: .12 }, .2)
        .fromTo(rest, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: .08 }, .8);
      gsap.to(".hero-media video", { yPercent: 12, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
    }, el);
    return () => ctx.revert();
  }, []);

  return <section className="hero" ref={root} data-bg="navy" data-tone="dark">
    <div className="hero-media" aria-hidden="true">
      <video src={hero.video} poster={hero.poster} autoPlay muted loop playsInline preload="auto" />
    </div>
    <div className="hero-shade" aria-hidden="true" />
    <div className="hero-grid wrap">
      <p className="hero-eyebrow hero-in">Health &amp; Safety · Principal Design · Safety Schemes in Procurement</p>
      <h1 className="hero-title">
        <span className="hero-line"><span className="hero-line-inner">Protecting your</span></span>
        <span className="hero-line"><span className="hero-line-inner"><em className="serif">people</em> and business</span></span>
        <span className="hero-rest hero-in">{hero.rest}</span>
      </h1>
      <div className="hero-copy">
        <p className="hero-in">{hero.body}</p>
        <div className="hero-actions hero-in">
          <Btn href={contact.href}>Get a free consultation</Btn>
          <a className="hero-phone" href={services.all} target="_blank" rel="noopener">Explore our services</a>
        </div>
      </div>
      <dl className="hero-facts hero-in">
        {facts.map((f) => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}
      </dl>
    </div>
  </section>;
}
