import type { CSSProperties, ReactNode } from "react";

const isExternal = (href: string) => /^https?:|^tel:|^mailto:/.test(href);
const linkProps = (href: string) => (/^https?:/.test(href) ? { target: "_blank", rel: "noopener" } : {});

// Green Hat's own vector marks: navy + green for light grounds, white for dark ones. "auto" leaves the choice to CSS.
export function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light" | "auto"; className?: string }) {
  return <span className={`logo ${className}`}>
    <img src="/brand/logo-dark.svg" alt="Green Hat Consulting" width={201} height={46} className="logo-dark" data-hidden={tone === "light" || undefined} />
    <img src="/brand/logo-white.svg" alt="" aria-hidden="true" width={201} height={46} className="logo-light" data-hidden={tone === "dark" || undefined} />
  </span>;
}

export const Arrow = ({ className = "" }: { className?: string }) =>
  <svg className={`arrow ${className}`} viewBox="0 0 16 16" aria-hidden="true"><path d="M3 13 13 3M5 3h8v8" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>;

/* The Antidote "Contact" button hover, rebuilt from values sampled frame by frame off antidote.team:
   a dark ellipse swells up from below the button while the label rolls up one line and turns white.
   Both directions run the same Framer spring (settles in ~700ms), replayed as --spring in globals.css. */
export function Btn({ href, children, variant = "light", className = "" }: { href: string; children: ReactNode; variant?: "light" | "dark"; className?: string }) {
  return <a href={href} className={`btn btn--${variant} ${className}`} {...linkProps(href)}>
    <span className="btn-blob" aria-hidden="true" />
    <span className="btn-roll">
      <span className="btn-label">{children}</span>
      <span className="btn-label" aria-hidden="true">{children}</span>
    </span>
  </a>;
}

export const Eyebrow = ({ children, className = "" }: { children: ReactNode; className?: string }) =>
  <p className={`eyebrow ${className}`} data-rise>/ {children}</p>;

export const BrandIcon = ({ icon }: { icon: string }) =>
  <svg viewBox="0 0 24 24" className="brand-icon" aria-hidden="true"><path d={icon} fill="currentColor" /></svg>;

export const Social = ({ name, href, icon }: { name: string; href: string; icon: string }) =>
  <a href={href} className="social" target="_blank" rel="noopener" aria-label={name}><BrandIcon icon={icon} /></a>;

export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} className={`text-link ${className}`} {...(isExternal(href) ? linkProps(href) : {})}>{children}<Arrow /></a>;
}

/* Image frame with the clip-open reveal and ~10% parallax on the image inside it. */
export function Frame({ src, alt, className = "", eager = false, ratio }: { src: string; alt: string; className?: string; eager?: boolean; ratio?: number | null }) {
  return <div className={`frame ${className}`} data-clip style={ratio ? ({ aspectRatio: String(ratio), "--r": ratio } as CSSProperties) : undefined}>
    <img src={src} alt={alt} data-parallax loading={eager ? "eager" : "lazy"} decoding="async" />
  </div>;
}
