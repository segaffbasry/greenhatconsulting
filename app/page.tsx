import { ArticleCard, CaseCard, UpdateRow } from "@/components/Cards";
import { Hero, VideoBand } from "@/components/Hero";
import { Cta } from "@/components/Sections";
import { Testimonials } from "@/components/Testimonials";
import { Arrow, Btn, Eyebrow, Frame, TextLink } from "@/components/ui";
import { blog, caseStudies, hse } from "@/lib/content";
import { clients, services, stats, why } from "@/lib/site";

function Stats() {
  return <section className="section stats" data-bg="forest">
    <div className="wrap">
      <Eyebrow>In numbers</Eyebrow>
      <h2 className="h-lg" data-rise>Over 12 years of successful projects and satisfied customers.</h2>
      <div className="stat-grid">
        {stats.map((s) => <div className="stat" key={s.label} data-rise>
          <p className="stat-label">{s.label}</p>
          <p className="stat-value" data-count={s.value} data-plain={s.plain || undefined}>{s.plain ? s.value : s.value.toLocaleString("en-GB")}</p>
        </div>)}
      </div>
    </div>
  </section>;
}

function Services() {
  return <section className="section services" data-bg="white" id="services">
    <div className="wrap">
      <div className="split-head">
        <div>
          <Eyebrow>{services.eyebrow}</Eyebrow>
          <h2 className="h-xl" data-rise>{services.title}</h2>
        </div>
        <p className="lede" data-rise>{services.body}</p>
      </div>
      <div className="service-cards">
        {services.main.map((s) => <a key={s.name} href={s.href} target="_blank" rel="noopener" className="service-card">
          <Frame src={s.img} alt="" />
          <div className="service-card-label" data-tone="dark"><h3>{s.name}</h3><Arrow /></div>
        </a>)}
      </div>
      <div className="more">
        <div className="more-head">
          <h3 className="h-md" data-rise>{services.moreTitle}</h3>
          <p data-rise>{services.moreBody}</p>
          <div data-rise><Btn href={services.all} variant="dark">View all services</Btn></div>
        </div>
        <ol className="more-list">
          {services.more.map((s, i) => <li key={s.name} data-rise>
            <a href={s.href} target="_blank" rel="noopener">
              <span className="more-index">{String(i + 1).padStart(2, "0")} —</span>
              <span className="more-name">{s.name}</span>
              <span className="more-body">{s.body}</span>
              <Arrow />
            </a>
          </li>)}
        </ol>
      </div>
    </div>
  </section>;
}

function Why() {
  return <section className="why" data-bg="white">
    <div className="why-copy">
      <Eyebrow>Why Green Hat</Eyebrow>
      <h2 className="h-lg" data-rise>{why.title}</h2>
      <p className="lede" data-rise>{why.body}</p>
      <ol className="why-list">
        {why.points.map((p, i) => <li key={p.name} data-rise>
          <span className="more-index">{String(i + 1).padStart(2, "0")} —</span>
          <h3>{p.name}</h3>
          <p>{p.body}</p>
        </li>)}
      </ol>
    </div>
    <div className="why-media" data-tone="dark"><Frame src={why.img} alt="Construction planning on site" className="why-frame" /></div>
  </section>;
}

function Clients() {
  const half = Math.ceil(clients.length / 2);
  const rows = [clients.slice(0, half), clients.slice(half)];
  return <section className="section clients" data-bg="navy">
    <div className="wrap"><Eyebrow>Proud to be working with</Eyebrow></div>
    <div className="marquees" aria-label="Clients">
      {rows.map((row, r) => <div className={`marquee ${r ? "marquee--rev" : ""}`} key={r}>
        <div className="marquee-track">
          {[...row, ...row].map((c, i) => <img key={i} src={c.src} data-mono={c.mono || undefined} alt={i < row.length ? c.name : ""} aria-hidden={i >= row.length || undefined} loading="lazy" />)}
        </div>
      </div>)}
    </div>
  </section>;
}

function Cases() {
  return <section className="section cases" data-bg="navy">
    <p className="pixel-slide" data-slide aria-hidden="true">Case studies · Case studies ·</p>
    <div className="wrap">
      <div className="split-head">
        <div>
          <Eyebrow>Case studies</Eyebrow>
          <h2 className="h-lg" data-rise>We work in partnership with housing associations, local authorities and major contractors.</h2>
        </div>
        <div data-rise><TextLink href="/case-studies">View all {caseStudies.length} case studies</TextLink></div>
      </div>
      <div className="case-grid">{caseStudies.slice(0, 6).map((s, i) => <CaseCard key={s.slug} study={s} index={i} />)}</div>
    </div>
  </section>;
}

function Reviews() {
  return <section className="section reviews-section" data-bg="forest">
    <div className="wrap">
      <Eyebrow>Reviews</Eyebrow>
      <h2 className="h-lg" data-rise>Supporting the construction industry</h2>
      <Testimonials />
    </div>
  </section>;
}

function Latest() {
  return <section className="section latest" data-bg="white">
    <div className="wrap latest-grid">
      <div>
        <div className="latest-head">
          <Eyebrow>Blog</Eyebrow>
          <h2 className="h-md" data-rise>Latest from our blog</h2>
          <TextLink href="/blog">All {blog.length} articles</TextLink>
        </div>
        <div className="latest-cards">{blog.slice(0, 3).map((a) => <ArticleCard key={a.slug} article={a} compact />)}</div>
      </div>
      <div>
        <div className="latest-head">
          <Eyebrow>HSE updates</Eyebrow>
          <h2 className="h-md" data-rise>HSE updates</h2>
          <TextLink href="/hse">All {hse.length} updates</TextLink>
        </div>
        <div className="rows">{hse.slice(0, 6).map((a) => <UpdateRow key={a.slug} article={a} />)}</div>
      </div>
    </div>
  </section>;
}

export default function Home() {
  return <>
    <Hero />
    <VideoBand />
    <Stats />
    <Services />
    <Why />
    <Clients />
    <Cases />
    <Reviews />
    <Latest />
    <Cta />
  </>;
}
