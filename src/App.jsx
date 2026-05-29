import React, { useEffect, useMemo, useState } from "react";
import ceoImg from "../assets/mark-j-yadav-ceo.png
";
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Check,
  ChevronRight,
  Code2,
  Crown,
  Gauge,
  LayoutDashboard,
  Megaphone,
  MousePointerClick,
  Quote,
  Rocket,
  Search,
  ShoppingBag,
  Sparkles,
  Store,
  Target,
  Workflow,
} from "lucide-react";

const services = [
  {
    slug: "wordpress",
    title: "WordPress Authority Sites",
    short: "WP",
    icon: LayoutDashboard,
    copy: "Premium business websites, landing pages, and SEO-ready pages that make your offer feel instantly trustworthy.",
    points: ["Elementor and custom themes", "Speed and SEO structure", "Lead-focused page flow"],
    price: "$199",
    priceNote: "Starting website plan",
    audience: "Best for coaches, local businesses, agencies, consultants, and service brands that need a sharp website they can edit easily.",
    outcome: "A polished WordPress website with conversion sections, SEO-ready structure, mobile-first pages, and a lead capture path.",
    deliverables: ["Homepage and service pages", "Landing page sections", "Lead form and WhatsApp CTA", "Basic SEO setup", "Speed and mobile QA", "Launch support"],
    roadmap: ["Offer and page strategy", "Premium UI direction", "WordPress build", "Speed, SEO, and launch testing"],
  },
  {
    slug: "shopify",
    title: "Shopify Sales Stores",
    short: "SF",
    icon: ShoppingBag,
    copy: "Conversion-first stores with polished product pages, trust sections, analytics, and checkout-friendly journeys.",
    points: ["Storefront design", "Product page optimization", "Apps and tracking setup"],
    price: "$299",
    priceNote: "Starting store setup",
    audience: "Best for ecommerce founders, D2C brands, fashion stores, product sellers, and businesses moving from social selling to a real store.",
    outcome: "A premium Shopify store built around product trust, clean browsing, stronger product pages, and checkout confidence.",
    deliverables: ["Homepage and collection layout", "Product page optimization", "Cart and checkout flow review", "Trust badges and reviews", "Analytics and pixel setup", "App recommendations"],
    roadmap: ["Product and buyer audit", "Storefront design", "Shopify setup", "Tracking and conversion QA"],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing Funnels",
    short: "DM",
    icon: Megaphone,
    copy: "Ad-ready landing pages, campaign strategy, lead magnets, and reporting that turn attention into inquiries.",
    points: ["Meta and Google funnels", "Creative direction", "Performance reporting"],
    price: "$149/mo",
    priceNote: "Campaign management",
    audience: "Best for brands that already have an offer and want more qualified leads, booked calls, store traffic, or campaign clarity.",
    outcome: "A performance funnel with landing pages, campaign structure, tracking, creative direction, and weekly improvement signals.",
    deliverables: ["Campaign strategy", "Landing page wireframe", "Meta or Google funnel plan", "Tracking events", "Creative angles", "Reporting dashboard direction"],
    roadmap: ["Audience and offer mapping", "Funnel architecture", "Creative and landing page setup", "Measure and optimize"],
  },
  {
    slug: "mern-stack",
    title: "MERN Stack Products",
    short: "MR",
    icon: Code2,
    copy: "Custom dashboards, booking systems, portals, SaaS MVPs, and internal tools with scalable foundations.",
    points: ["MongoDB, Express, React, Node", "Auth and admin panels", "API-first architecture"],
    price: "$599",
    priceNote: "MVP build starts",
    audience: "Best for startups and businesses that need custom portals, dashboards, booking systems, internal tools, or SaaS MVPs.",
    outcome: "A custom full-stack product with clear user flows, secure data handling, admin controls, and scalable code architecture.",
    deliverables: ["React frontend", "Node and Express APIs", "MongoDB schema", "Authentication", "Admin dashboard", "Deployment guidance"],
    roadmap: ["Product scope", "UX and data model", "MERN development", "Testing and deployment"],
  },
  {
    slug: "nextjs",
    title: "Next.js Growth Platforms",
    short: "NX",
    icon: Rocket,
    copy: "Fast, modern websites and apps with smooth UI, SEO structure, server rendering, and premium frontend polish.",
    points: ["App Router builds", "SaaS and agency sites", "Performance optimization"],
    price: "$449",
    priceNote: "Premium web build",
    audience: "Best for SaaS brands, premium agencies, creators, and companies that need performance, SEO, and modern app-like experiences.",
    outcome: "A fast Next.js experience with strong frontend polish, SEO-friendly pages, reusable components, and launch-ready performance.",
    deliverables: ["Next.js frontend", "Reusable component system", "SEO metadata", "Responsive page templates", "Performance tuning", "Deployment setup"],
    roadmap: ["Content architecture", "Component design", "Next.js build", "Performance and SEO QA"],
  },
];

const proofCards = [
  { value: "01", label: "Offer clarity", text: "Message, proof, and CTA mapped before design starts." },
  { value: "02", label: "Visual authority", text: "A premium interface that makes your brand feel established." },
  { value: "03", label: "Conversion motion", text: "Scroll flow, micro-interactions, and buyer cues working together." },
  { value: "04", label: "Launch engine", text: "Tracking, speed, SEO, and campaigns prepared for growth." },
];

const stackItems = ["WordPress", "Shopify", "React", "Next.js", "Node.js", "MongoDB", "SEO", "Ads"];

function usePointerGlow() {
  useEffect(() => {
    const root = document.documentElement;
    const move = (event) => {
      root.style.setProperty("--mx", `${event.clientX}px`);
      root.style.setProperty("--my", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
}

function useReveal(trigger) {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16 },
    );

    elements.forEach((element, index) => {
      element.style.setProperty("--delay", `${Math.min(index * 42, 240)}ms`);
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [trigger]);
}

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || "#top");

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash || "#top");
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  return hash;
}

function findServiceFromHash(hash) {
  const slug = hash.replace("#service/", "");
  return services.find((service) => service.slug === slug);
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Zenpexal home">
        <span className="brand-mark">Z</span>
        <span>Zenpexal</span>
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        <a href="#services">Services</a>
        <a href="#plans">Plans</a>
        <a href="#about">About</a>
        <a href="#system">System</a>
        <a href="#process">Process</a>
        <a href="#contact">Contact</a>
      </nav>
      <a className="header-cta" href="#contact">
        <MousePointerClick size={17} />
        Book Call
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-media" aria-hidden="true">
        <img src="../assets/zenpexal-hero.png" alt="" />
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy" data-reveal>
          <p className="eyebrow">
            <Sparkles size={16} />
            Digital presence built to convert
          </p>
          <h1>Zenpexal builds brand gravity on the web.</h1>
          <p className="lead">
            Premium websites, Shopify stores, full-stack apps, and marketing funnels crafted for clients who need trust, speed, and sales from the first click.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#contact">
              Start a Project
              <ArrowUpRight size={19} />
            </a>
            <a className="btn btn-secondary" href="#services">
              View Services
              <ChevronRight size={19} />
            </a>
          </div>
        </div>

        <div className="hero-console" data-reveal>
          <div className="console-top">
            <span />
            <span />
            <span />
            <strong>Growth OS</strong>
          </div>
          <div className="console-metric">
            <span>Conversion Pulse</span>
            <strong>97%</strong>
          </div>
          <div className="signal-bars" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, index) => (
              <i key={index} style={{ "--bar": `${18 + ((index * 17) % 62)}%` }} />
            ))}
          </div>
          <div className="console-grid">
            <span><Target size={15} /> Offer</span>
            <span><Gauge size={15} /> Speed</span>
            <span><Search size={15} /> SEO</span>
            <span><BarChart3 size={15} /> Ads</span>
          </div>
        </div>
      </div>
      <div className="ticker" aria-label="Technology stack">
        <div>
          {[...stackItems, ...stackItems].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceOrbit({ active, setActive }) {
  const ActiveIcon = services[active].icon;

  return (
    <div className="orbit-panel" data-reveal>
      <div className="orbit-ring" aria-hidden="true">
        {services.map((service, index) => (
          <button
            className={`orbit-node ${active === index ? "active" : ""}`}
            key={service.title}
            style={{ "--i": index }}
            onClick={() => setActive(index)}
            aria-label={`Show ${service.title}`}
          >
            {service.short}
          </button>
        ))}
      </div>
      <div className="orbit-core">
        <ActiveIcon size={38} />
        <span>{services[active].short}</span>
      </div>
      <div className="orbit-card">
        <p>{services[active].title}</p>
        <small>{services[active].copy}</small>
      </div>
    </div>
  );
}

function Services() {
  const [active, setActive] = useState(0);
  const activeService = useMemo(() => services[active], [active]);
  const ActiveIcon = activeService.icon;

  return (
    <section className="section services-section" id="services">
      <div className="section-kicker" data-reveal>
        <p className="eyebrow">
          <Workflow size={16} />
          Complete digital capability
        </p>
        <h2>Choose one service or build the full Zenpexal growth system.</h2>
      </div>

      <div className="services-layout">
        <ServiceOrbit active={active} setActive={setActive} />

        <div className="service-detail" data-reveal>
          <span className="detail-icon"><ActiveIcon size={24} /></span>
          <h3>{activeService.title}</h3>
          <p>{activeService.copy}</p>
          <ul>
            {activeService.points.map((point) => (
              <li key={point}>
                <Check size={16} />
                {point}
              </li>
            ))}
          </ul>
          <a href="#contact">
            Plan this service
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>

      <div className="service-rail" aria-label="All services">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <a
              className={active === index ? "active" : ""}
              key={service.title}
              href={`#service/${service.slug}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
            >
              <Icon size={18} />
              <span>{service.title}</span>
            </a>
          );
        })}
      </div>

      <div className="service-card-grid" aria-label="Service cards">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <a
              className="service-page-card"
              href={`#service/${service.slug}`}
              key={service.slug}
              data-reveal
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
            >
              <span className="service-card-code">{service.short}</span>
              <Icon size={26} />
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <div className="card-price">
                <span>Starts at</span>
                <b>{service.price}</b>
              </div>
              <strong>
                View detail page
                <ArrowUpRight size={17} />
              </strong>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function Plans() {
  return (
    <section className="section plans-section" id="plans">
      <div className="section-kicker" data-reveal>
        <p className="eyebrow">
          <BadgeCheck size={16} />
          Clear starting plans
        </p>
        <h2>Transparent starting prices for every service.</h2>
        <p className="plans-intro">
          Final pricing depends on pages, features, content, integrations, and launch support. These plans help clients understand where to start.
        </p>
      </div>

      <div className="plans-grid">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <article className="plan-card" key={service.slug} data-reveal>
              <div className="plan-top">
                <span className="plan-icon">
                  <Icon size={22} />
                </span>
                <span className="plan-code">{service.short}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.priceNote}</p>
              <strong>{service.price}</strong>
              <ul>
                {service.points.map((point) => (
                  <li key={point}>
                    <Check size={15} />
                    {point}
                  </li>
                ))}
              </ul>
              <a href={`#service/${service.slug}`}>
                View plan detail
                <ArrowUpRight size={17} />
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ServiceDetailPage({ service }) {
  const Icon = service.icon;

  return (
    <main className="service-page-shell">
      <section className="section service-page-hero" data-reveal>
        <a className="back-link" href="#services">
          <ArrowLeft size={18} />
          Back to services
        </a>
        <div className="service-page-title">
          <span className="service-page-icon">
            <Icon size={34} />
          </span>
          <div>
            <p className="eyebrow">
              <Sparkles size={16} />
              Zenpexal service detail
            </p>
            <h1>{service.title}</h1>
            <p className="lead">{service.outcome}</p>
          </div>
        </div>
      </section>

      <section className="section detail-layout">
        <article className="detail-main-panel" data-reveal>
          <h2>Who this is for</h2>
          <p>{service.audience}</p>
          <div className="detail-metrics">
            <span>
              <strong>01</strong>
              Strategy first
            </span>
            <span>
              <strong>02</strong>
              Premium build
            </span>
            <span>
              <strong>03</strong>
              Conversion ready
            </span>
          </div>
        </article>

        <aside className="detail-side-panel" data-reveal>
          <p>Start with this service</p>
          <h3>{service.short} Growth Sprint</h3>
          <div className="detail-price">
            <span>{service.priceNote}</span>
            <strong>{service.price}</strong>
          </div>
          <a className="btn btn-primary" href="#contact">
            Discuss this service
            <ArrowUpRight size={18} />
          </a>
        </aside>
      </section>

      <section className="section detail-two-col">
        <div data-reveal>
          <p className="eyebrow">
            <Check size={16} />
            Deliverables
          </p>
          <div className="deliverable-grid">
            {service.deliverables.map((item) => (
              <article key={item}>
                <Check size={16} />
                <span>{item}</span>
              </article>
            ))}
          </div>
        </div>

        <div data-reveal>
          <p className="eyebrow">
            <Workflow size={16} />
            Build roadmap
          </p>
          <div className="roadmap-list">
            {service.roadmap.map((item, index) => (
              <article key={item}>
                <strong>{String(index + 1).padStart(2, "0")}</strong>
                <span>{item}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="about-photo" data-reveal>
       <img src={ceoImg} alt="Mark J Yadav, CEO of Zenpexal Digital Agency" />
        <div className="founder-badge">
          <Crown size={18} />
          CEO / Founder
        </div>
      </div>

      <div className="about-copy" data-reveal>
        <p className="eyebrow">
          <Crown size={16} />
          Meet the CEO
        </p>
        <h2>Mark J Yadav leads Zenpexal Digital Agency.</h2>
        <p>
          I am Mark J Yadav, CEO of Zenpexal Digital Agency. I started Zenpexal to help brands look more premium online and convert more visitors into serious leads, customers, and long-term growth.
        </p>
        <div className="founder-quote">
          <Quote size={22} />
          <strong>My focus is simple: build digital experiences that make a client trust your business before they even speak to you.</strong>
        </div>
        <div className="about-points">
          <span><Check size={16} /> Strategy-first websites</span>
          <span><Check size={16} /> Clean modern development</span>
          <span><Check size={16} /> Conversion-focused marketing</span>
        </div>
      </div>
    </section>
    <section className="section about-section" id="about1">
      <div className="about-photo" data-reveal>
       <img src={ceoImg} alt="Muskan Khan, CFO Zenpexal Digital Agency" />
        <div className="founder-badge">
          <Crown size={18} />
          CEO / Founder
        </div>
      </div>

      <div className="about-copy" data-reveal>
        <p className="eyebrow">
          <Crown size={16} />
          Meet the CEO
        </p>
        <h2>Mark J Yadav leads Zenpexal Digital Agency.</h2>
        <p>
          I am Muskan Khan, CFO of Zenpexal Digital Agency. I started Zenpexal to help brands look more premium online and convert more visitors into serious leads, customers, and long-term growth.
        </p>
        <div className="founder-quote">
          <Quote size={22} />
          <strong>My focus is simple: build digital experiences that make a client trust your business before they even speak to you.</strong>
        </div>
        <div className="about-points">
          <span><Check size={16} /> Strategy-first websites</span>
          <span><Check size={16} /> Clean modern development</span>
          <span><Check size={16} /> Conversion-focused marketing</span>
        </div>
      </div>
    </section>
  );
}

function System() {
  return (
    <section className="section system-section" id="system">
      <div className="system-copy" data-reveal>
        <p className="eyebrow">
          <BadgeCheck size={16} />
          What makes it different
        </p>
        <h2>A website that feels like a sales team, not a brochure.</h2>
        <p>
          The experience is shaped around attention, trust, and action: a strong first frame, confident service architecture, proof-led sections, and CTAs that never feel random.
        </p>
      </div>
      <div className="proof-grid">
        {proofCards.map((card) => (
          <article className="proof-card" key={card.label} data-reveal>
            <span>{card.value}</span>
            <h3>{card.label}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Process() {
  const steps = ["Discover", "Design", "Develop", "Deploy"];

  return (
    <section className="section process-section" id="process">
      <div className="section-kicker" data-reveal>
        <p className="eyebrow">
          <Store size={16} />
          Clean project flow
        </p>
        <h2>High-end output without messy communication.</h2>
      </div>
      <div className="timeline">
        {steps.map((step, index) => (
          <article className="timeline-card" key={step} data-reveal>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{step}</h3>
            <p>
              {index === 0 && "We map your offer, audience, pages, funnels, and launch priorities."}
              {index === 1 && "We create a visual system that makes the brand feel premium and credible."}
              {index === 2 && "We build responsive pages, stores, apps, integrations, and tracking."}
              {index === 3 && "We test, optimize, deploy, and prepare the website for incoming leads."}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section contact-section" id="contact" data-reveal>
      <div>
        <p className="eyebrow">
          <Target size={16} />
          Ready for better clients
        </p>
        <h2>Let Zenpexal make your next first impression unforgettable.</h2>
        <p>
          Share your goal and we will shape the right path: WordPress, Shopify, digital marketing, MERN, Next.js, or the complete growth package.
        </p>
      </div>
      <div className="contact-panel">
        <a className="btn btn-primary" href="mailto:hello@zenpexal.com?subject=Project%20Inquiry%20for%20Zenpexal">
          Email Zenpexal
          <ArrowUpRight size={19} />
        </a>
        <a
          className="btn btn-secondary"
          href="https://wa.me/?text=Hi%20Zenpexal%2C%20I%20want%20to%20discuss%20a%20website%20or%20marketing%20project."
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp Message
          <ArrowUpRight size={19} />
        </a>
      </div>
    </section>
  );
}

export default function App() {
  const hash = useHashRoute();
  usePointerGlow();
  useReveal(hash);
  const selectedService = hash.startsWith("#service/") ? findServiceFromHash(hash) : null;

  useEffect(() => {
    if (selectedService) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const id = hash.replace("#", "");
    const target = id ? document.getElementById(id) : null;
    if (target) {
      window.setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 40);
    }
  }, [hash, selectedService]);

  return (
    <>
      <div className="pointer-light" aria-hidden="true" />
      <Header />
      {selectedService ? (
        <ServiceDetailPage service={selectedService} />
      ) : (
        <main>
          <Hero />
          <Services />
          <Plans />
          <About />
        <System />
        <Process />
          <Contact />
        </main>
      )}
      <footer className="site-footer">
        <span>Zenpexal Digital Agency</span>
        <span>WordPress / Shopify / Digital Marketing / MERN / Next.js</span>
      </footer>
    </>
  );
}
