import { ArticleCard } from "@/components/Cards";
import { Cta } from "@/components/Sections";
import { Arrow, Eyebrow, Frame } from "@/components/ui";
import type { Article } from "@/lib/content";
import { articleHref, formatDate, neighbours, readingTime } from "@/lib/content";

/* Shared detail page for blog posts and HSE updates. */
export function ArticlePage({ article, list, section }: { article: Article; list: Article[]; section: { name: string; href: string } }) {
  const { newer, older } = neighbours(list, article.slug);
  const related = list.filter((a) => a.slug !== article.slug && a.categories.some((c) => article.categories.includes(c))).slice(0, 3);
  const more = related.length === 3 ? related : list.filter((a) => a.slug !== article.slug).slice(0, 3);
  return <>
    <section className="page-head article-head" data-bg="navy">
      <div className="wrap">
        <p className="eyebrow" data-rise><a href={section.href}>/ {section.name}</a></p>
        <h1 className="article-title" data-rise>{article.title}</h1>
        <dl className="article-meta" data-rise>
          <div><dt>Published</dt><dd><time dateTime={article.date}>{formatDate(article.date)}</time></dd></div>
          <div><dt>Author</dt><dd>{article.author}</dd></div>
          {article.categories.length > 0 && <div><dt>Filed under</dt><dd>{article.categories.join(", ")}</dd></div>}
          <div><dt>Read</dt><dd>{readingTime(article.html)} min</dd></div>
        </dl>
      </div>
    </section>
    <section className="article" data-bg="white">
      {article.hero && <div className="wrap"><Frame src={article.hero} alt={article.heroAlt || article.title} className="article-hero" ratio={article.heroRatio} eager /></div>}
      <div className="wrap article-grid">
        <aside className="article-aside">
          <a href={section.href} className="back"><Arrow className="arrow--back" />All {section.name.toLowerCase()}</a>
        </aside>
        <div className="prose" dangerouslySetInnerHTML={{ __html: article.html }} />
      </div>
      <nav className="wrap pager" aria-label="More articles">
        {older ? <a href={articleHref(older)} className="pager-link"><span>Previous</span>{older.title}</a> : <span />}
        {newer ? <a href={articleHref(newer)} className="pager-link pager-link--next"><span>Next</span>{newer.title}</a> : <span />}
      </nav>
    </section>
    <section className="section related" data-bg="white">
      <div className="wrap">
        <Eyebrow>Keep reading</Eyebrow>
        <div className="card-grid card-grid--3">{more.map((a) => <ArticleCard key={a.slug} article={a} />)}</div>
      </div>
    </section>
    <Cta />
  </>;
}
