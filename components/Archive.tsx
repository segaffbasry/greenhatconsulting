"use client";

import { useMemo, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArticleCard } from "@/components/Cards";
import type { Article } from "@/lib/content";

const PAGE = 24;

/* The full archive is in the page; chips filter it by the live site's own categories and it pages in 24 at a time. */
export function Archive({ items, categories }: { items: Article[]; categories: string[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [shown, setShown] = useState(PAGE);
  const list = useMemo(() => (active ? items.filter((a) => a.categories.includes(active)) : items), [items, active]);

  const pick = (name: string | null) => { setActive(name); setShown(PAGE); requestAnimationFrame(() => ScrollTrigger.refresh()); };
  const more = () => { setShown((n) => n + PAGE); requestAnimationFrame(() => ScrollTrigger.refresh()); };

  return <>
    {categories.length > 1 && <div className="chips" role="group" aria-label="Filter by category">
      <button className="chip" aria-pressed={active === null} onClick={() => pick(null)}>All <span>{items.length}</span></button>
      {categories.map((c) => <button key={c} className="chip" aria-pressed={active === c} onClick={() => pick(c)}>
        {c} <span>{items.filter((a) => a.categories.includes(c)).length}</span>
      </button>)}
    </div>}
    <div className="card-grid">
      {list.slice(0, shown).map((a) => <ArticleCard key={a.slug} article={a} />)}
    </div>
    {shown < list.length && <div className="archive-more">
      <button className="chip chip--lg" onClick={more}>Show more <span>{list.length - shown} left</span></button>
    </div>}
  </>;
}
