"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { focusOverlay, reducedMotion, useMotion } from "@/components/Motion";
import { Arrow, BrandIcon, Btn, Logo, Social } from "@/components/ui";
import { contact, footerColumns, menu, socials, tagline } from "@/lib/site";

const external = (href: string) => /^https?:/.test(href);

/* Full-screen menu. A navy sheet swells open from the top-right corner (the same ellipse the buttons use),
   a green rule draws across, then the chosen section's title and links rise in. Switching tabs replays
   only the links. */
function Menu({ open, tab, setTab, close }: { open: boolean; tab: number; setTab: (tab: number) => void; close: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const wasOpen = useRef(false);
  const group = menu[tab];

  useEffect(() => {
    const el = root.current; if (!el) return;
    const tl = gsap.timeline({ paused: true, onReverseComplete: () => { el.style.visibility = "hidden"; } });
    tl.fromTo(el, { clipPath: "ellipse(0% 0% at 100% 0%)" }, { clipPath: "ellipse(150% 150% at 100% 0%)", duration: 1.1, ease: "power3.inOut" }, 0)
      .fromTo(el.querySelector(".menu-rule"), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power3.inOut" }, .4)
      .fromTo(el.querySelectorAll(".menu-top > *, .menu-tabs, .menu-foot > *"), { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: .6, ease: "power2.out", stagger: .04 }, .55);
    timeline.current = tl;
    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    const el = root.current, tl = timeline.current; if (!el || !tl) return;
    if (open) {
      el.style.visibility = "visible";
      tl.timeScale(reducedMotion() ? 20 : 1).play();
      return focusOverlay(el, close);
    }
    if (wasOpen.current) tl.timeScale(reducedMotion() ? 20 : 1.5).reverse();
    wasOpen.current = false;
  }, [open, close]);

  useEffect(() => {
    const el = root.current; if (!el || !open) return;
    const fresh = !wasOpen.current;
    wasOpen.current = true;
    const items = el.querySelectorAll("[data-m]");
    if (reducedMotion()) { gsap.set(items, { opacity: 1, yPercent: 0 }); return; }
    gsap.fromTo(items, { opacity: 0, yPercent: 60 }, { opacity: 1, yPercent: 0, duration: .8, ease: "power3.out", stagger: .04, delay: fresh ? .7 : 0, overwrite: true });
  }, [open, tab]);

  return <div className="menu" id="site-menu" ref={root} role="dialog" aria-modal="true" aria-label="Site menu" aria-hidden={!open} inert={!open} data-lenis-prevent>
    <div className="menu-top wrap">
      <a href="/" className="brand" aria-label="Green Hat Consulting home" onClick={close}><Logo tone="light" /></a>
      <button className="menu-close" onClick={close}>Close <span aria-hidden="true" /></button>
    </div>
    <div className="menu-rule" aria-hidden="true" />
    <div className="menu-body wrap">
      <nav className="menu-tabs" aria-label="Menu sections">
        {menu.map((entry, index) => <button key={entry.id} className="menu-tab" aria-current={tab === index} onClick={() => setTab(index)}>
          <span className="menu-tab-index">0{index + 1}</span>{entry.label}
        </button>)}
      </nav>
      <div className="menu-panel" key={group.id}>
        <div className="menu-intro">
          <h2 data-m>{group.title}</h2>
          <p data-m>{group.blurb}</p>
          {group.id === "contact" && <p data-m className="menu-phone"><a href={contact.phoneHref}>{contact.phone}</a></p>}
        </div>
        <ul className="menu-links" data-many={group.links.length > 6 || undefined}>
          {group.links.map((link) => <li key={link.name}>
            <a data-m href={link.href} {...(external(link.href) ? { target: "_blank", rel: "noopener" } : { onClick: close })}>{link.name}<Arrow /></a>
          </li>)}
        </ul>
      </div>
    </div>
    <div className="menu-foot wrap">
      <p className="menu-tagline">{tagline.join(" • ")}</p>
      <div className="socials">{socials.map((s) => <Social key={s.name} {...s} />)}</div>
    </div>
  </div>;
}

/* Frameless header: no bar or box. The logo and items take the tone of whatever is under them, reading
   an explicit data-tone where a section has one (photos, video) and the live page colour otherwise.
   It hides on scroll down and comes back on scroll up. */
function Header() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const header = useRef<HTMLElement>(null);
  const close = useCallback(() => setOpen(false), []);
  const pathname = usePathname();

  useEffect(() => {
    const bar = header.current; if (!bar) return;
    let last = window.scrollY, frame = 0;
    const tone = () => {
      frame = 0;
      const y = bar.getBoundingClientRect().height / 2;
      const under = document.elementsFromPoint(window.innerWidth / 2, Math.max(y, 1)).find((el) => !bar.contains(el));
      const marked = under?.closest<HTMLElement>("[data-tone]")?.dataset.tone;
      if (marked) { bar.dataset.tone = marked; return; }
      // --bg is a hex when set directly and rgba() while GSAP is blending it.
      const bg = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
      const [r, g, b] = bg.startsWith("#") ? [1, 3, 5].map((i) => parseInt(bg.slice(i, i + 2), 16)) : (bg.match(/[\d.]+/g) ?? ["255", "255", "255"]).map(Number);
      bar.dataset.tone = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > .5 ? "light" : "dark";
    };
    const onScroll = () => {
      const y = window.scrollY, delta = y - last;
      if (!frame) frame = requestAnimationFrame(tone);
      if (y < 80) { bar.classList.remove("is-hidden"); last = y; return; }
      if (Math.abs(delta) < 6) return;
      bar.classList.toggle("is-hidden", delta > 0); last = y;
    };
    const reveal = () => bar.classList.remove("is-hidden");
    tone();
    const settle = setTimeout(tone, 400);
    bar.addEventListener("focusin", reveal);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { clearTimeout(settle); cancelAnimationFrame(frame); bar.removeEventListener("focusin", reveal); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [pathname]);

  const show = (index: number) => { setTab(index); setOpen(true); };
  return <>
    <header className="site-header" ref={header} data-tone="dark">
      <div className="header-inner">
        <a href="/" className="brand" aria-label="Green Hat Consulting home"><Logo tone="auto" /></a>
        <nav className="header-nav" aria-label="Main">
          {menu.map((entry, index) => <button key={entry.id} aria-haspopup="dialog" aria-expanded={open && tab === index} aria-controls="site-menu" onClick={() => show(index)}>{entry.label}</button>)}
        </nav>
        <button className="burger" aria-label="Open menu" aria-expanded={open} aria-controls="site-menu" onClick={() => show(0)}><span /><span /></button>
        <Btn href={contact.href} className="header-cta">Get a free consultation</Btn>
      </div>
    </header>
    <Menu open={open} tab={tab} setTab={setTab} close={close} />
  </>;
}

function Footer() {
  return <footer className="site-footer" data-bg="navy">
    <div className="wrap footer-grid">
      <div className="footer-brand">
        <a href="/" className="brand" aria-label="Green Hat Consulting home"><Logo tone="light" /></a>
        <p className="footer-tagline">{tagline.join(" • ")}</p>
      </div>
      {footerColumns.map((col) => <div key={col.title}>
        <h3>{col.title}</h3>
        <ul>{col.links.map((l) => <li key={l.name}><a href={l.href} {...(external(l.href) ? { target: "_blank", rel: "noopener" } : {})}>{l.name}</a></li>)}</ul>
      </div>)}
      <div>
        <h3>Contact Us</h3>
        <address>{contact.address.map((line) => <span key={line}>{line}<br /></span>)}</address>
        <p className="footer-phone">T: <a href={contact.phoneHref}>{contact.phone}</a></p>
        <h3 className="footer-follow">Follow Us</h3>
        <ul className="footer-social">{socials.map((s) => <li key={s.name}><a href={s.href} target="_blank" rel="noopener"><BrandIcon icon={s.icon} />{s.name}</a></li>)}</ul>
      </div>
    </div>
    <div className="wrap footer-bar">
      <p>© 2026 Green Hat Consulting. All rights reserved.</p>
      <p className="footer-word" aria-hidden="true">green hat</p>
    </div>
  </footer>;
}

export function Shell({ children }: { children: ReactNode }) {
  useMotion();
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Header />
    <main id="main">{children}</main>
    <Footer />
  </>;
}
