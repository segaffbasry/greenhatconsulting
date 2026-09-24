import type { Metadata } from "next";
import { PersonCard } from "@/components/Cards";
import { Cta, PageHead } from "@/components/Sections";
import { Btn } from "@/components/ui";
import { team } from "@/lib/content";
import { contact } from "@/lib/site";

export const metadata: Metadata = { title: "Meet the Team" };

export default function TeamIndex() {
  return <>
    <PageHead eyebrow="About us" title="Meet the team" pixel>
      <p className="page-lede" data-rise>Let us introduce you to the Green Hat team.</p>
    </PageHead>
    <section className="section" data-bg="white">
      <div className="wrap team-grid">{team.map((p) => <PersonCard key={p.slug} person={p} />)}</div>
    </section>
    <section className="section join" data-bg="forest">
      <div className="wrap split-head">
        <h2 className="h-lg" data-rise>Join the team?</h2>
        <div>
          <p className="lede" data-rise>If you feel like you’d be the perfect fit for the Green Hat team, please get in touch to see what vacancies are available.</p>
          <div data-rise><Btn href={contact.href}>Contact us</Btn></div>
        </div>
      </div>
    </section>
    <Cta />
  </>;
}
