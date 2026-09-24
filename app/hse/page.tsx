import type { Metadata } from "next";
import { Archive } from "@/components/Archive";
import { Cta, PageHead } from "@/components/Sections";
import { hse } from "@/lib/content";

export const metadata: Metadata = { title: "HSE Updates" };

export default function HseIndex() {
  return <>
    <PageHead eyebrow="Resources" title="HSE updates" pixel>
      <p className="page-lede" data-rise>{hse.length} updates on HSE guidance, prosecutions and enforcement.</p>
    </PageHead>
    <section className="section archive" data-bg="white">
      <div className="wrap"><Archive items={hse} categories={[]} /></div>
    </section>
    <Cta />
  </>;
}
