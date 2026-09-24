"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getLenis, setLenis } from "@/lib/scroll";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// The only three grounds the site uses. Ink is the text colour that sits on each.
export const themes = {
  navy: { bg: "#1B2032", ink: "#FFFFFF" },
  forest: { bg: "#1B633F", ink: "#FFFFFF" },
  white: { bg: "#FFFFFF", ink: "#1B2032" },
} as const;
export type Theme = keyof typeof themes;

/* Lenis owns the scroll for the whole session and drives ScrollTrigger. */
function useSmoothScroll() {
  useEffect(() => {
    if (reducedMotion()) return;
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link || event.defaultPrevented) return;
      const id = link.getAttribute("href") ?? "";
      const target = id.length > 1 ? document.querySelector<HTMLElement>(id) : null;
      if (id.length > 1 && !target) return;
      event.preventDefault();
      lenis.scrollTo(target ?? 0, { duration: 1.6 });
    };
    document.addEventListener("click", onClick);
    return () => { document.removeEventListener("click", onClick); gsap.ticker.remove(tick); lenis.destroy(); setLenis(null); };
  }, []);
}

/* Per-page motion, rebuilt on every route change.
   - [data-bg]        sections name their ground; the page colour blends from one to the next as they arrive,
                      so there are no hard section edges.
   - [data-rise]      headings and copy: one calm fade and rise, once.
   - [data-clip]      image frames: open from an inset clip as they arrive.
   - [data-parallax]  images inside a frame: drift about 10% against the scroll.
   - [data-slide]     the few oversized pixel headlines: travel sideways with the scroll.
   - [data-count]     figures count up once when they come into view. */
function usePageMotion(pathname: string) {
  useEffect(() => {
    getLenis()?.scrollTo(0, { immediate: true });
    const reduced = reducedMotion();
    const root = document.documentElement;
    const cleanups: (() => void)[] = [];

    /* Reveals are checked against the viewport on load and on every scroll frame rather than through
       ScrollTrigger once-triggers, so anything already in view plays straight away. */
    const reveal = (els: HTMLElement[], play: (batch: HTMLElement[]) => void, fold = .92) => {
      let pending = els, frame = 0;
      const check = () => {
        frame = 0;
        const edge = window.innerHeight * fold;
        const now = pending.filter((el) => { const r = el.getBoundingClientRect(); return r.top < edge && r.bottom > 0; });
        if (!now.length) return;
        pending = pending.filter((el) => !now.includes(el));
        play(now);
        if (!pending.length) stop();
      };
      const onScroll = () => { if (!frame) frame = requestAnimationFrame(check); };
      const stop = () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(frame); };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      check();
      cleanups.push(stop);
    };

    const ctx = gsap.context(() => {
      const grounds = gsap.utils.toArray<HTMLElement>("[data-bg]");
      const themeOf = (el: HTMLElement) => themes[(el.dataset.bg as Theme) ?? "white"] ?? themes.white;
      if (grounds.length) {
        const first = themeOf(grounds[0]);
        gsap.set(root, { "--bg": first.bg, "--ink": first.ink });
        grounds.slice(1).forEach((el, i) => {
          const from = themeOf(grounds[i]), to = themeOf(el);
          if (from === to) return;
          gsap.fromTo(root, { "--bg": from.bg, "--ink": from.ink }, {
            "--bg": to.bg, "--ink": to.ink, ease: "none", immediateRender: false,
            scrollTrigger: { trigger: el, start: "top 60%", end: "top 30%", scrub: true },
          });
        });
      }

      const rise = gsap.utils.toArray<HTMLElement>("[data-rise]");
      const clip = gsap.utils.toArray<HTMLElement>("[data-clip]");
      [...rise, ...clip].forEach((el) => el.setAttribute("data-ready", ""));

      const counts = gsap.utils.toArray<HTMLElement>("[data-count]");
      const format = (el: HTMLElement, n: number) => { el.textContent = el.dataset.plain ? String(Math.round(n)) : Math.round(n).toLocaleString("en-GB"); };
      if (reduced) { counts.forEach((el) => format(el, Number(el.dataset.count))); return; }
      counts.forEach((el) => format(el, el.dataset.plain ? Number(el.dataset.count) - 40 : 0));
      reveal(counts, (batch) => batch.forEach((el) => {
        const target = Number(el.dataset.count), state = { n: el.dataset.plain ? target - 40 : 0 };
        gsap.to(state, { n: target, duration: 2.2, ease: "power3.out", onUpdate: () => format(el, state.n) });
      }), .85);

      gsap.set(rise, { opacity: 0, y: 28 });
      reveal(rise, (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: .08, clearProps: "transform" }));
      gsap.set(clip, { clipPath: "inset(12% 8% 12% 8%)" });
      reveal(clip, (batch) => gsap.to(batch, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power3.inOut", stagger: .1 }));
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(el, { yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: { trigger: el.parentElement, scrub: true, start: "top bottom", end: "bottom top" } });
      });
      gsap.utils.toArray<HTMLElement>("[data-slide]").forEach((el) => {
        const dir = el.dataset.slide === "right" ? 1 : -1;
        gsap.fromTo(el, { xPercent: dir * -8 }, { xPercent: dir * 8, ease: "none", scrollTrigger: { trigger: el, scrub: true, start: "top bottom", end: "bottom top" } });
      });
    });
    const refresh = () => ScrollTrigger.refresh();
    const settle = setTimeout(refresh, 300);
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => { clearTimeout(settle); window.removeEventListener("load", refresh); cleanups.forEach((fn) => fn()); ctx.revert(); };
  }, [pathname]);
}

export function useMotion() {
  const pathname = usePathname();
  useSmoothScroll();
  usePageMotion(pathname);
  return pathname;
}

/* Traps focus inside an overlay, pauses smooth scroll and locks the page while it is open. */
export function focusOverlay(container: HTMLElement, close: () => void) {
  const previous = document.activeElement as HTMLElement | null;
  const overflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  getLenis()?.stop();
  const focusable = () => Array.from(container.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
  focusable()[0]?.focus({ preventScroll: true });
  const onKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") close();
    if (event.key !== "Tab") return;
    const items = focusable(), first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  };
  document.addEventListener("keydown", onKey);
  return () => { document.body.style.overflow = overflow; getLenis()?.start(); document.removeEventListener("keydown", onKey); previous?.focus({ preventScroll: true }); };
}
