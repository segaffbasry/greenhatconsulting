import { brandIcons } from "@/lib/brand-icons";

// Every page Green Hat still owns lives on the live site. Only the sections rebuilt here stay local.
export const LIVE = "https://www.greenhat-consulting.co.uk";
export const live = (path: string) => `${LIVE}${path}`;

export const contact = {
  phone: "01792 797833",
  phoneHref: "tel:+441792797833",
  address: ["First Floor, Schooner House", "Quay West, Quay Parade", "Swansea SA1 1SR"],
  href: live("/contact-us/"),
  book: live("/book-an-appointment/"),
};

export const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/green-hat-consulting", icon: brandIcons.linkedin },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61592937851118", icon: brandIcons.facebook },
  { name: "Trustpilot", href: "https://uk.trustpilot.com/review/greenhat-consulting.co.uk", icon: brandIcons.trustpilot },
];

export type Link = { name: string; href: string };
export type MenuGroup = { id: string; label: string; title: string; blurb: string; links: Link[] };

// The header items, each of which opens the full-screen menu on its own tab. Structure mirrors the live site's menu.
export const menu: MenuGroup[] = [
  {
    id: "services", label: "Services", title: "Health & Safety and Principal Design",
    blurb: "Providing expert health and safety services for construction projects across the UK.",
    links: [
      { name: "Health & Safety", href: live("/health-and-safety-services-for-construction/") },
      { name: "Safety Schemes in Procurement", href: live("/health-and-safety-services-for-construction/ssip-accreditation-support/") },
      { name: "Inspections", href: live("/health-and-safety-services-for-construction/health-and-safety-inspections-services/") },
      { name: "Minimum Standards", href: live("/health-and-safety-services-for-construction/minimum-health-and-safety-standards/") },
      { name: "Competent Person", href: live("/health-and-safety-services-for-construction/competent-person-services/") },
      { name: "Risk Assessments and Method Statements", href: live("/health-and-safety-services-for-construction/risk-assessments-and-method-statements/") },
      { name: "Accident Investigations", href: live("/health-and-safety-services-for-construction/accident-investigations/") },
      { name: "Campaigns and SMART objectives", href: live("/health-and-safety-services-for-construction/health-and-safety-campaigns/") },
      { name: "Principal Design", href: live("/principal-design/") },
      { name: "Building Regulations", href: live("/principal-design/building-regulations-compliance-services/") },
      { name: "Construction Design and Management", href: live("/principal-design/cdm-compliance/") },
    ],
  },
  {
    id: "resources", label: "Resources", title: "Resources",
    blurb: "Case studies, the Green Hat blog and HSE updates.",
    links: [
      { name: "Case Studies", href: "/case-studies" },
      { name: "Blog", href: "/blog" },
      { name: "HSE Updates", href: "/hse" },
      { name: "Resources", href: live("/resources/") },
    ],
  },
  {
    id: "about", label: "About", title: "About us",
    blurb: "We are a consultancy dedicated to health, safety and compliance within the construction industry.",
    links: [
      { name: "About Us", href: live("/about-us/") },
      { name: "Meet the Team", href: "/meet-the-team" },
      { name: "Our Partners", href: live("/our-partners/") },
      { name: "Consultancy Fees", href: live("/health-and-safety-services-for-construction/health-and-safety-consultancy-fees/") },
    ],
  },
  {
    id: "contact", label: "Contact", title: "Get a consultation",
    blurb: "Believe us, there are no daft questions! Grab yourself a coffee and give us a call to see how we can help your business.",
    links: [
      { name: "Contact Us", href: contact.href },
      { name: "Book an Appointment", href: contact.book },
    ],
  },
];

export const footerColumns: { title: string; links: Link[] }[] = [
  { title: "Home", links: [{ name: "About us", href: live("/about-us/") }, { name: "Meet the Team", href: "/meet-the-team" }, { name: "Our Partners", href: live("/our-partners/") }, { name: "Contact us", href: contact.href }] },
  { title: "Services", links: [{ name: "Health and Safety", href: live("/health-and-safety-services-for-construction/") }, { name: "Principal Design", href: live("/principal-design/") }] },
  { title: "Resources", links: [{ name: "Case Studies", href: "/case-studies" }, { name: "Blog", href: "/blog" }, { name: "HSE Updates", href: "/hse" }] },
  { title: "Policies", links: [{ name: "Terms and Conditions", href: live("/terms-and-conditions/") }, { name: "Cookie Policy", href: live("/cookie-policy/") }, { name: "Website Privacy Notice", href: live("/privacy-policy/") }] },
];

/* ---- Home page copy, verbatim from greenhat-consulting.co.uk ---- */

export const hero = {
  lead: "Protecting your people and business",
  rest: "through leading Health and Safety Consulting Services",
  body: "We deliver a range of Health and Safety solutions in many industries across Wales and the Southwest with expertise in the construction sector.",
  video: "/media/2025/02/Greenhat_Video.mp4",
  poster: "/media/2024/12/housing-estate.jpg",
};

export const stats = [
  { value: 2013, label: "Year established", plain: true },
  { value: 3933, label: "H&S inspections completed" },
  { value: 4771, label: "Projects completed" },
  { value: 114, label: "Clients" },
];

export const services = {
  eyebrow: "Services",
  title: "Serious about finding solutions?",
  body: "Providing expert health and safety services for construction projects across the UK. Our consultancy covers CDM compliance, SSIP support, and wellbeing strategies; designed to save your business time, reduce risk, and ensure your projects meet industry standards.",
  main: [
    { name: "Health and Safety Services", href: live("/health-and-safety-services-for-construction/"), img: "/media/2024/12/health-and-safety.jpg" },
    { name: "Principal Design Services", href: live("/principal-design/"), img: "/media/2024/12/Mask-group-4.jpg" },
    { name: "Safety Schemes In Procurement", href: live("/health-and-safety-services-for-construction/ssip-accreditation-support/"), img: "/media/2024/12/Mask-group-5.jpg" },
  ],
  moreTitle: "Wait! There’s more...",
  moreBody: "We are proud to offer a wide range of services to our clients, from site inspections to mentoring. Rest assured, we are experts in construction consultancy.",
  more: [
    { name: "Competent persons", body: "We provide comprehensive competent person packages to ensure continuous compliance and safety.", href: live("/health-and-safety-services-for-construction/competent-person-services/") },
    { name: "Site inspection", body: "We offer thorough site and premises inspections to ensure compliance and safety.", href: live("/health-and-safety-services-for-construction/health-and-safety-inspections-services/") },
    { name: "Risk assessments and method statements", body: "Identifying, evaluating and mitigating hazards ensuring safety and legal compliance.", href: live("/health-and-safety-services-for-construction/risk-assessments-and-method-statements/") },
    { name: "Construction phase plans", body: "Support in creating Health and Safety management measures for project execution.", href: live("/health-and-safety-services-for-construction/") },
    { name: "Site presentations", body: "Bespoke tailored site presentations based upon our SMART objective campaign.", href: live("/health-and-safety-services-for-construction/health-and-safety-campaigns/") },
    { name: "Mentoring", body: "Our knowledgeable staff help upskill, support and enhance your current team.", href: live("/health-and-safety-services-for-construction/") },
  ],
  all: live("/health-and-safety-services-for-construction/"),
};

export const why = {
  title: "We save you time, money and resources",
  body: "Our services aim to save your business time, money, and resources, allowing you to focus on your core activities and drive profits.",
  img: "/media/2024/12/Construction-Planning.jpg",
  points: [
    { name: "Client-centric approach", body: "Solutions tailored to your unique needs and priorities." },
    { name: "Time and cost efficiency", body: "Helping you save time, money and resources." },
    { name: "Proven track record", body: "Over 12 years of successful projects and satisfied customers." },
    { name: "Commitment to excellence", body: "Dedicated to providing high-quality and effective solutions." },
  ],
};

// Logos are shown white on navy via a CSS filter. Bouygues and J2R sit on solid blocks, so they have hand-made
// single-colour versions instead.
const logo = (file: string, name: string) => ({ src: `/media/2024/12/${file}`, name, mono: false });
const mono = (file: string, name: string) => ({ src: `/brand/clients/${file}`, name, mono: true });
export const clients = [
  mono("bouygues.png", "Bouygues UK"),
  logo("kier.png", "Kier"),
  logo("Galliford-Try.png", "Galliford Try"),
  logo("Goldbeck-removebg-preview.png", "Goldbeck"),
  logo("swansea-university.png", "Swansea University"),
  logo("Caredig-Logo.png", "Caredig"),
  logo("FREDS-Timberframe-Logo-White-Backgroundless.png", "Freds Timberframe"),
  logo("Martin-Taffetsauffer-Builders-Logo-1024x573-1-768x430.png", "Martin Taffetsauffer Builders"),
  logo("Raven-Delta-Limited-1-768x432.png", "Raven Delta"),
  logo("Evan-Pritchard-Logo.png", "Evan Pritchard Contractors"),
  mono("j2r.png", "J2R Demolition"),
  logo("Blues-Electrical-Logo.png", "Blues Electrical"),
  logo("TW-Group-Logo-1.png", "TW Group"),
  logo("Envisage-Logo.png", "Envisage"),
  logo("QDL-Contractors-Ltd-1024x1024.png", "QDL Contractors"),
  logo("SBUH-Logo.png", "Swansea Bay University Health Board"),
  logo("new-loco-GL-2-768x739.png", "GL"),
  logo("SAM_Drylining__5_-removebg-preview.png", "SAM Drylining"),
  logo("Pipeworx-Group-GB-Logo-_Square-White-Background_-01-removebg-preview-1.png", "Pipeworx Group"),
  logo("sharp-fibre-logo-removebg-preview.png", "Sharpfibre"),
];

// From the live About page ("Supporting the construction industry").
export const testimonials = [
  { quote: "Your expertise in delivering Principal Designer Services and guiding our teams through the BSA and the complex, evolving gateway regime is greatly appreciated.", name: "Adam Ball", role: "Quality Director, Bouygues" },
  { quote: "Sharpfibre works closely with GreenHat to manage health and safety across multiple projects, both as a subcontractor and Principal Contractor. Their support makes the process seamless, from documentation and site setup through to ongoing compliance. Stuart provides consistent, hands‑on site support, backed by clear and detailed reports that help drive continuous improvement. His approachable yet highly effective style makes GreenHat a reliable, professional, and proactive partner we would highly recommend.", name: "Russell Coopey", role: "Regional Director, Sharpfibre" },
  { quote: "Bouygues UK have liaised with Green Hat for a few years now and they have been a very supportive entity. We have appointed them on several of our current projects as Principal Design advisor to assist with the submission of the Gateways, providing awareness and guidance for the design team on requirements of the BSR and coordinating the relevant information. Dan and his team are always just a phone call away to answer any queries and assist where they can.", name: "Stephanie De Castillo", role: "Design Manager, Bouygues" },
  { quote: "Green hat, have supported us as a business over the previous 12 months, by undertaking independent site safety inspections, and updating our workforce on the incoming Building Safety Act requirements. It’s been a positive experience, and I look forward to maintaining a positive working relationship with them.", name: "David Williams", role: "Health, Safety & Environmental Director, CMB Engineering" },
  { quote: "As our business has grown, Green Hat Consulting have been a trusted Health & Safety partner. They help us produce practical, site‑specific RAMS and Construction Phase Plans, provide clear and constructive audits, and are always accessible for advice and CDM support. They feel like an extension of our team, strengthening our systems, improving our safety culture, and helping us maintain high standards as we continue to grow. We would confidently recommend their services.", name: "Jonathan Picton", role: "Operations Director, Sealability" },
  { quote: "The Green Hat Consulting team have worked many times for John Weaver Contractors and I have always found them to be very approachable, innovative and professional with their approach to all appointed duties. They have never failed to deliver upon our expectations and I will have no hesitation in appointing them to assist with our business needs in the future, their can-do attitude is a credit to the industry.", name: "Terry Edwards", role: "Managing Director, John Weaver Contractors" },
  { quote: "In our business compliance is king. Compliance is becoming more onerous and complex as time goes on. We chose to partner with Green Hat Consulting for our business compliance requirements. This has freed up considerable time and resources for us. From basic management systems to ISO Standards, Audits and Inspections – they had a suite of compliance services for us to choose from.", name: "Marc Gunter", role: "Managing Director, Blues Electrical" },
  { quote: "Appointing Green Hat as our Principal Designer early in the RIBA stage process allowed all stakeholders to be on the same page. No one can say they were ‘unaware’. There are inevitably changes in design that occur in a project. Early PD appointment provides flexibility for changes but not at the cost of delays or unforeseen problems along the line.", name: "Andrew Davies", role: "Project Manager, Lovell" },
  { quote: "Clear communication to all stakeholders from architects and designers to specifiers and engineers is key to a successful project. Noticing potential improvements in proposed designs and the actual building work is key to delivering a project on time and on budget. It is so refreshing to work with a professional design team who share these values.", name: "Steve Knapton", role: "Project Manager - Ty Hafan" },
  { quote: "I strive for excellence in my own building and design business and have been delighted in our partnership with Green Hat Consulting who reflect the same excellent standards. They are constantly trying to raise the bar in health and safety compliance.", name: "Russell Everett", role: "Managing Director, Excel Homes" },
  { quote: "Working with Green Hat has given us enhanced status in our bids and tenders and has allowed us to now work with Tier one providers. We now a first class compliance regime to match the rest of our business.", name: "Jason Quinn", role: "Managing Director, AMROC Heating Services" },
  { quote: "Andrew and the team are experts in their field and so easy to work with. Our retainer agreement means we have all our compliance needs met with one monthly payment.", name: "Mathew Pritchard", role: "Managing Director, Evan Pritchard Contractors" },
];

export const cta = {
  title: "Get a consultation",
  body: "Believe us, there are no daft questions! Grab yourself a coffee and give us a call to see how we can help your business.",
  button: "Get a free consultation",
};

export const tagline = ["Support", "Inspire", "Protect"];
