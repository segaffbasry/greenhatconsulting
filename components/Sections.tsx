import type { ReactNode } from "react";
import { Btn, Eyebrow } from "@/components/ui";
import { contact, cta } from "@/lib/site";

/* Closing call to action on every page: the one other place the pixel face appears. */
export function Cta() {
  return <section className="section cta" data-bg="navy">
    <div className="wrap cta-inner">
      <Eyebrow>{cta.title}</Eyebrow>
      <h2 className="cta-title" data-rise><span className="pixel">No daft</span> questions</h2>
      <p className="lede" data-rise>{cta.body}</p>
      <div className="cta-actions" data-rise>
        <Btn href={contact.href}>{cta.button}</Btn>
        <a className="hero-phone" href={contact.phoneHref}>T: {contact.phone}</a>
      </div>
    </div>
  </section>;
}

/* Navy page head for the rebuilt archive and detail pages. */
export function PageHead({ eyebrow, title, children, pixel = false }: { eyebrow: string; title: string; children?: ReactNode; pixel?: boolean }) {
  return <section className="page-head" data-bg="navy">
    <div className="wrap">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className={pixel ? "page-title pixel" : "page-title"} data-rise>{title}</h1>
      {children}
    </div>
  </section>;
}
