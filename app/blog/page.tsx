import type { Metadata } from "next";
import { Archive } from "@/components/Archive";
import { Cta, PageHead } from "@/components/Sections";
import { blog, categoriesOf } from "@/lib/content";

export const metadata: Metadata = { title: "Health and Safety Blog" };

export default function BlogIndex() {
  return <>
    <PageHead eyebrow="Resources" title={<>The <em className="serif">blog</em></>}>
      <p className="page-lede" data-rise>{blog.length} articles on health and safety, compliance, Principal Design and company news.</p>
    </PageHead>
    <section className="section archive" data-bg="white">
      <div className="wrap"><Archive items={blog} categories={categoriesOf(blog)} /></div>
    </section>
    <Cta />
  </>;
}
