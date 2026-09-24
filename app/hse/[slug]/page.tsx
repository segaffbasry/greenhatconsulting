import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/Article";
import { hse } from "@/lib/content";

export const dynamicParams = false;
export const generateStaticParams = () => hse.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = hse.find((x) => x.slug === slug);
  return a ? { title: a.title, description: a.excerpt } : {};
}

export default async function HseUpdate({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = hse.find((x) => x.slug === slug);
  if (!article) notFound();
  return <ArticlePage article={article} list={hse} section={{ name: "HSE updates", href: "/hse" }} />;
}
