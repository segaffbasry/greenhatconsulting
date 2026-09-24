import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PersonCard } from "@/components/Cards";
import { Cta } from "@/components/Sections";
import { Arrow, Eyebrow, Frame } from "@/components/ui";
import { team } from "@/lib/content";

export const dynamicParams = false;
export const generateStaticParams = () => team.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = team.find((x) => x.slug === slug);
  return p ? { title: `${p.name}, ${p.role}` } : {};
}

export default async function PersonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = team.find((x) => x.slug === slug);
  if (!person) notFound();
  const i = team.indexOf(person);
  const others = [...team.slice(i + 1), ...team.slice(0, i)].slice(0, 4);
  return <>
    <section className="profile" data-bg="navy">
      <div className="wrap profile-grid">
        <Frame src={person.photo} alt={person.name} className="profile-photo" eager />
        <div className="profile-copy">
          <p className="eyebrow" data-rise><a href="/meet-the-team">/ Meet the team</a></p>
          <h1 className="page-title" data-rise>{person.name}</h1>
          <p className="profile-role" data-rise>{person.role}</p>
          <div className="prose prose--dark" data-rise dangerouslySetInnerHTML={{ __html: person.html }} />
          <a href="/meet-the-team" className="back" data-rise><Arrow className="arrow--back" />The whole team</a>
        </div>
      </div>
    </section>
    <section className="section" data-bg="white">
      <div className="wrap">
        <Eyebrow>More of the team</Eyebrow>
        <div className="team-grid">{others.map((p) => <PersonCard key={p.slug} person={p} />)}</div>
      </div>
    </section>
    <Cta />
  </>;
}
