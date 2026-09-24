import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseCard } from "@/components/Cards";
import { Cta } from "@/components/Sections";
import { Arrow, Eyebrow, Frame } from "@/components/ui";
import { caseStudies, formatDate, neighbours } from "@/lib/content";

export const dynamicParams = false;
export const generateStaticParams = () => caseStudies.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = caseStudies.find((x) => x.slug === slug);
  return s ? { title: `${s.title} | Case Study`, description: s.excerpt } : {};
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((x) => x.slug === slug);
  if (!study) notFound();
  const { newer, older } = neighbours(caseStudies, study.slug);
  const next = older ?? caseStudies[0];
  const more = caseStudies.filter((s) => s.slug !== study.slug).slice(0, 3);
  return <>
    <section className="page-head case-head" data-bg="navy">
      <div className="wrap">
        <p className="eyebrow" data-rise><a href="/case-studies">/ Case study</a></p>
        <h1 className="page-title" data-rise>{study.title}</h1>
        <dl className="article-meta" data-rise>
          {study.client && <div><dt>Client</dt><dd>{study.client}</dd></div>}
          {study.services.length > 0 && <div><dt>Services provided</dt><dd>{study.services.join(", ")}</dd></div>}
          <div><dt>Published</dt><dd><time dateTime={study.date}>{formatDate(study.date)}</time></dd></div>
        </dl>
      </div>
    </section>
    <section className="article" data-bg="white">
      <div className="wrap"><Frame src={study.hero} alt={study.heroAlt} className="article-hero" ratio={study.heroRatio} eager /></div>
      <div className="wrap article-grid">
        <aside className="article-aside">
          <a href="/case-studies" className="back"><Arrow className="arrow--back" />All case studies</a>
        </aside>
        <div className="prose" dangerouslySetInnerHTML={{ __html: study.html }} />
      </div>
      <nav className="wrap pager" aria-label="More case studies">
        {newer ? <a href={`/case-studies/${newer.slug}`} className="pager-link"><span>Previous</span>{newer.title}</a> : <span />}
        {next.slug !== study.slug && <a href={`/case-studies/${next.slug}`} className="pager-link pager-link--next"><span>Next</span>{next.title}</a>}
      </nav>
    </section>
    <section className="section cases" data-bg="navy">
      <div className="wrap">
        <Eyebrow>Explore more {study.type || "Principal Design"} projects</Eyebrow>
        <div className="case-grid case-grid--3">{more.map((s) => <CaseCard key={s.slug} study={s} />)}</div>
      </div>
    </section>
    <Cta />
  </>;
}
