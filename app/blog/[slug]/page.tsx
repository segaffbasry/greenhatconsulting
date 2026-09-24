import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/Article";
import { blog } from "@/lib/content";

export const dynamicParams = false;
export const generateStaticParams = () => blog.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = blog.find((x) => x.slug === slug);
  return a ? { title: a.title, description: a.excerpt } : {};
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = blog.find((x) => x.slug === slug);
  if (!article) notFound();
  return <ArticlePage article={article} list={blog} section={{ name: "Blog", href: "/blog" }} />;
}
