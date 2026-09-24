import type { Metadata } from "next";
import { CaseCard } from "@/components/Cards";
import { Cta, PageHead } from "@/components/Sections";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = { title: "Case Studies" };

export default function CaseIndex() {
  return <>
    <PageHead eyebrow="Resources" title="Case studies" pixel>
      <p className="page-lede" data-rise>We work in partnership with housing associations, local authorities and major contractors.</p>
    </PageHead>
    <section className="section cases cases--index" data-bg="navy">
      <div className="wrap case-grid">{caseStudies.map((s, i) => <CaseCard key={s.slug} study={s} index={i} />)}</div>
    </section>
    <Cta />
  </>;
}
