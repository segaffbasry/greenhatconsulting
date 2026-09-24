import blogData from "@/content/blog.json";
import caseData from "@/content/case-studies.json";
import hseData from "@/content/hse.json";
import teamData from "@/content/team.json";

// Generated from the live WordPress site (REST API for posts, HSE updates and team; rendered pages for case studies).
export type Article = {
  slug: string;
  kind: "blog" | "hse";
  title: string;
  date: string;
  author: string;
  categories: string[];
  hero: string | null;
  heroAlt: string;
  heroRatio: number | null;
  excerpt: string;
  html: string;
  link: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  date: string;
  hero: string;
  heroAlt: string;
  heroRatio: number | null;
  services: string[];
  type: string;
  html: string;
  excerpt: string;
  link: string;
};

export type Person = { slug: string; name: string; role: string; photo: string; html: string; link: string };

// "Waters" is the web agency's WordPress account that migrated the archive, not a byline, so those posts are credited to Green Hat.
const byline = (a: Article) => (a.author === "Waters" ? { ...a, author: "Green Hat Consulting" } : a);

export const blog = (blogData as Article[]).map(byline);
export const hse = (hseData as Article[]).map(byline);
export const caseStudies = caseData as CaseStudy[];
export const team = teamData as Person[];

export const articleHref = (a: Pick<Article, "kind" | "slug">) => `/${a.kind === "blog" ? "blog" : "hse"}/${a.slug}`;

export const formatDate = (iso: string, style: "long" | "short" = "long") =>
  new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: style === "long" ? "long" : "short", year: "numeric", timeZone: "Europe/London" });

export const categoriesOf = (list: Article[]) => {
  const counts = new Map<string, number>();
  list.forEach((a) => a.categories.forEach((c) => counts.set(c, (counts.get(c) ?? 0) + 1)));
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([name]) => name);
};

export function neighbours<T extends { slug: string }>(list: T[], slug: string) {
  const i = list.findIndex((item) => item.slug === slug);
  return { newer: i > 0 ? list[i - 1] : null, older: i >= 0 && i < list.length - 1 ? list[i + 1] : null };
}

export const readingTime = (html: string) => Math.max(1, Math.round(html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 220));
