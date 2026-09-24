import { ArticleCard, CaseCard, UpdateRow } from "@/components/Cards";
import { Hero } from "@/components/Hero";
import { Cta } from "@/components/Sections";
import { Testimonials } from "@/components/Testimonials";
import { Arrow, Btn, Eyebrow, Frame, TextLink } from "@/components/ui";
import { blog, caseStudies, hse } from "@/lib/content";
import { clients, intro, services, stats, story, values, why } from "@/lib/site";

/* Who Green Hat are, in their own words: the About page statement, the story behind the name, and their values. */
function Story() {
  return <section className="section story" data-bg="white">
    <div className="wrap">
      <Eyebrow>About us</Eyebrow>
      <p className="statement" data-rise>
        We are a consultancy dedicated to <em className="serif">health, safety and compliance</em> within the construction industry. {intro.split("construction industry. ")[1]}
      </p>
      <div className="story-grid">
        <figure className="story-person">
          <Frame src={story.photo} alt={`${story.person.name}, ${story.person.role}`} className="story-photo" />
          <figcaption data-rise><a href={story.person.href}>{story.person.name}</a><span>{story.person.role}</span></figcaption>
        </figure>
        <div className="story-copy">
          <h2 className="h-md" data-rise>{story.title}</h2>
          {story.body.map((p) => <p key={p.slice(0, 20)} data-rise>{p}</p>)}
          <blockquote className="story-quote" data-rise><p>{story.quote}</p></blockquote>
          <div className="story-links" data-rise>
            <Btn href="/meet-the-team" variant="dark">Meet the team</Btn>
            <TextLink href="https://www.greenhat-consulting.co.uk/about-us/">About Green Hat</TextLink>
          </div>
        </div>
      </div>
      <div className="values">
        <h3 className="values-title" data-rise>Our <em className="serif">values</em></h3>
        <ol className="values-list">
          {values.map((v, i) => <li key={v.name} data-rise>
            <span className="more-index">{String(i + 1).padStart(2, "0")}</span>
            <h4>{v.name}</h4>
            <p>{v.body}</p>
          </li>)}
        </ol>
      </div>
    </div>
  </section>;
}

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
    <div className="wrap">
      <div className="split-head">
        <div>
          <Eyebrow>Resources</Eyebrow>
          <h2 className="h-xl" data-rise><em className="serif">Case</em> studies</h2>
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
    <Story />
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
