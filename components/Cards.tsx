import { Arrow } from "@/components/ui";
import type { Article, CaseStudy, Person } from "@/lib/content";
import { articleHref, formatDate } from "@/lib/content";

/* HSE updates without a featured image get a quiet LED-style tile instead of a stock photo. */
function Placeholder({ label }: { label: string }) {
  return <div className="card-fallback" aria-hidden="true"><span>{label}</span></div>;
}

export function ArticleCard({ article, compact = false }: { article: Article; compact?: boolean }) {
  return <a href={articleHref(article)} className={`card ${compact ? "card--compact" : ""}`}>
    <div className="card-media">
      {article.hero ? <img src={article.hero} alt={article.heroAlt} loading="lazy" decoding="async" /> : <Placeholder label={article.kind === "hse" ? "HSE" : "Blog"} />}
    </div>
    <div className="card-body">
      <p className="card-meta"><time dateTime={article.date}>{formatDate(article.date, "short")}</time>{article.categories[0] && <span>{article.categories[0]}</span>}</p>
      <h3>{article.title}</h3>
      {!compact && <p className="card-excerpt">{article.excerpt}</p>}
    </div>
  </a>;
}

export function CaseCard({ study, index }: { study: CaseStudy; index?: number }) {
  return <a href={`/case-studies/${study.slug}`} className="case-card">
    <div className="case-media frame" data-clip>
      <img src={study.hero} alt={study.heroAlt} loading="lazy" decoding="async" data-parallax />
    </div>
    <div className="case-body">
      {index !== undefined && <span className="case-index">{String(index + 1).padStart(2, "0")}</span>}
      <div>
        <p className="case-client">{study.client || study.type || "Case study"}</p>
        <h3>{study.title}</h3>
      </div>
      <Arrow />
    </div>
  </a>;
}

export function PersonCard({ person }: { person: Person }) {
  return <a href={`/meet-the-team/${person.slug}`} className="person">
    <div className="person-media"><img src={person.photo} alt={person.name} loading="lazy" decoding="async" /></div>
    <h3>{person.name}</h3>
    <p>{person.role}</p>
  </a>;
}

export function UpdateRow({ article }: { article: Article }) {
  return <a href={articleHref(article)} className="row-link">
    <time dateTime={article.date}>{formatDate(article.date, "short")}</time>
    <span>{article.title}</span>
    <Arrow />
  </a>;
}
