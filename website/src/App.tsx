import { useMemo, useState } from "react";
import {
  ArrowRight, Camera, Check, ChevronRight, Cloud, Image, Lock, Mail, Menu,
  Send, ShieldCheck, Sparkles, Upload, X
} from "lucide-react";
import { Link, Route, Routes } from "react-router-dom";

const useProdPortal = import.meta.env.VITE_USE_PROD_PORTAL === "true";
const portalLocal = import.meta.env.VITE_PORTAL_LOCAL_URL ?? "http://localhost:5173";
const portalProd = import.meta.env.VITE_PORTAL_PROD_URL ?? "https://app.nubbymedia.com";
const contactEmail = import.meta.env.VITE_CONTACT_EMAIL ?? "contact@nubbymedia.com";
const portalUrl = useProdPortal ? portalProd : portalLocal;

const nav = [
  ["Portfolio", "/portfolio"],
  ["Services", "/services"],
  ["Client Experience", "/client-experience"],
  ["About", "/about"],
  ["Contact", "/contact"]
];

const services = [
  ["Event Photography", "Professional coverage for parties, conferences, community events, nightlife, and business moments."],
  ["Portrait Sessions", "Premium portraits for creators, professionals, families, and personal branding."],
  ["Creative Media Packages", "Edited photo sets, organized delivery, and branded media workflows tailored to the project."]
];

const portfolio = [
  { title: "Event Coverage", category: "Events", copy: "Candid storytelling, atmosphere, guests, and key moments." },
  { title: "Portrait Sessions", category: "Portraits", copy: "Clean, polished, expressive images for personal and professional use." },
  { title: "Business Media", category: "Business", copy: "Media for brands, teams, launches, and professional events." },
  { title: "Nightlife & Social", category: "Nightlife", copy: "Energy, mood, people, and motion captured with style." },
  { title: "Creative Shoots", category: "Creative", copy: "Concept-driven images with a cinematic visual direction." },
  { title: "Private Delivery", category: "Portal", copy: "Finished work delivered through a branded client portal." }
];

function PortalButton({ small = false }: { small?: boolean }) {
  return (
    <a href={portalUrl} className={small ? "btn-primary px-4 py-2" : "btn-primary"}>
      Client Portal <ArrowRight className="ml-2 h-4 w-4" />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-neon/30 bg-neon/10 text-neon">
            <Camera className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display text-2xl font-semibold text-neon">Nubby Media</p>
            <p className="text-[10px] uppercase tracking-[0.24em] text-muted">Premium Photography</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-muted lg:flex">
          {nav.map(([label, path]) => <Link key={path} to={path} className="hover:text-cream">{label}</Link>)}
          <PortalButton small />
        </nav>

        <button onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 lg:hidden">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm lg:hidden">
          <div className="ml-auto h-full w-80 border-l border-white/10 bg-charcoal p-6 shadow-soft">
            <button onClick={() => setOpen(false)} className="ml-auto grid h-11 w-11 place-items-center rounded-2xl border border-white/10">
              <X className="h-5 w-5" />
            </button>
            <div className="mt-10 grid gap-4">
              {nav.map(([label, path]) => (
                <Link onClick={() => setOpen(false)} key={path} to={path} className="rounded-2xl border border-white/10 px-4 py-3 text-muted">
                  {label}
                </Link>
              ))}
              <PortalButton />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer className="border-t border-white/10 py-10">
        <div className="container grid gap-6 text-sm text-muted md:grid-cols-[1fr,auto]">
          <div>
            <p className="text-cream">Nubby Media</p>
            <p className="mt-2">Premium event photography with private client portal delivery.</p>
          </div>
          <div className="space-y-2 md:text-right">
            <p>Website: localhost dev ready</p>
            <p>Portal: {portalUrl}</p>
          </div>
        </div>
      </footer>
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute left-1/2 top-20 h-[520px] w-[520px] -translate-x-1/2 animate-floatSlow rounded-full bg-neon/10 blur-3xl" />
      <div className="container relative grid items-center gap-12 lg:grid-cols-[1.05fr,.95fr]">
        <div className="animate-fadeUp">
          <p className="kicker">Events · portraits · creative media</p>
          <h1 className="h1 mt-5">Premium event photography, delivered privately.</h1>
          <p className="copy mt-6 max-w-2xl">
            Nubby Media captures real moments with a premium visual style — then delivers finished media through a branded private client portal.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link to="/portfolio" className="btn-primary">View Portfolio <ArrowRight className="ml-2 h-4 w-4" /></Link>
            <Link to="/contact" className="btn-secondary">Book a Session</Link>
          </div>
        </div>

        <div className="card animate-fadeUp overflow-hidden p-3 [animation-delay:150ms]">
          <div className="photo-tile relative aspect-[4/5] overflow-hidden rounded-[22px]">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute bottom-0 p-8">
              <p className="kicker">Private delivery included</p>
              <h2 className="mt-3 font-display text-4xl font-semibold">Client Portal</h2>
              <p className="mt-3 text-sm leading-7 text-muted">Secure uploads, private galleries, tagging, search, and audit-aware delivery for clients.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PortfolioGrid({ limit }: { limit?: number }) {
  const items = limit ? portfolio.slice(0, limit) : portfolio;
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map((item, index) => (
        <article key={item.title} className="group card animate-fadeUp overflow-hidden p-3" style={{ animationDelay: `${index * 80}ms` }}>
          <div className="photo-tile relative aspect-[4/5] overflow-hidden rounded-[22px] transition duration-500 group-hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute bottom-0 p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-neon">{item.category}</p>
              <h3 className="mt-2 text-2xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.copy}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function ClientExperienceBlock() {
  const items = [
    ["Secure delivery", Lock],
    ["Cloud-ready storage", Cloud],
    ["Tagging and search", Sparkles],
    ["Upload and download access", Upload],
    ["Audit-aware activity", ShieldCheck],
    ["Polished client experience", Image]
  ];

  return (
    <section className="py-20">
      <div className="container">
        <div className="card p-8 sm:p-12">
          <p className="kicker">Client experience</p>
          <h2 className="h2 mt-4">Your photos deserve better than a generic link.</h2>
          <p className="copy mt-5 max-w-3xl">
            Nubby Media uses a private client portal for professional media delivery — giving each project a secure, branded home from upload to final download.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {items.map(([label, Icon]: any) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:-translate-y-1 hover:border-neon/30">
                <Icon className="h-5 w-5 text-neon" />
                <p className="mt-4 font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesBlock() {
  return (
    <section className="py-20">
      <div className="container grid gap-10 lg:grid-cols-[.8fr,1.2fr]">
        <div>
          <p className="kicker">Services</p>
          <h2 className="h2 mt-4">Photography built around your event.</h2>
          <p className="copy mt-5">From capture to delivery, the experience is designed to feel premium, organized, and private.</p>
        </div>
        <div className="grid gap-5">
          {services.map(([title, desc]) => (
            <div className="card group p-6 transition hover:-translate-y-1 hover:border-neon/30" key={title}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{desc}</p>
                </div>
                <ChevronRight className="mt-1 h-5 w-5 text-neon opacity-60 transition group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-20">
      <div className="container text-center">
        <p className="kicker">Ready when you are</p>
        <h2 className="h2 mx-auto mt-4 max-w-3xl">Book premium coverage or access your delivered media.</h2>
        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <Link to="/contact" className="btn-secondary">Contact Nubby Media</Link>
          <PortalButton />
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <Layout>
      <Hero />
      <section className="py-20">
        <div className="container">
          <p className="kicker">Featured work</p>
          <h2 className="h2 mt-4">Cinematic coverage for real moments.</h2>
          <div className="mt-10"><PortfolioGrid limit={3} /></div>
        </div>
      </section>
      <ServicesBlock />
      <ClientExperienceBlock />
      <CTA />
    </Layout>
  );
}

function PageShell({ title, kicker, children }: { title: string; kicker: string; children: React.ReactNode }) {
  return (
    <Layout>
      <section className="py-20">
        <div className="container">
          <p className="kicker">{kicker}</p>
          <h1 className="h1 mt-5">{title}</h1>
          <div className="mt-10">{children}</div>
        </div>
      </section>
    </Layout>
  );
}

function Portfolio() {
  return (
    <PageShell kicker="Portfolio" title="Event-first photography with a premium finish.">
      <PortfolioGrid />
    </PageShell>
  );
}

function Services() {
  return (
    <PageShell kicker="Services" title="Coverage, editing, and private delivery.">
      <div className="grid gap-5 md:grid-cols-3">
        {services.map(([title, desc]) => (
          <div className="card p-7" key={title}>
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="copy mt-4">{desc}</p>
            <ul className="mt-6 space-y-3 text-sm text-muted">
              {["Premium editing", "Private delivery", "Client-ready organization"].map(item => (
                <li key={item} className="flex gap-3"><Check className="h-4 w-4 text-neon" /> {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

function ClientExperience() {
  return (
    <Layout>
      <ClientExperienceBlock />
      <CTA />
    </Layout>
  );
}

function About() {
  return (
    <PageShell kicker="About" title="Photography with infrastructure behind it.">
      <div className="card max-w-3xl p-8">
        <p className="copy">
          Nubby Media focuses on events, portraits, and creative media. The difference is the delivery experience: finished work can be organized, protected, and accessed through a private client portal instead of scattered links.
        </p>
      </div>
    </PageShell>
  );
}

function Contact() {
  const subject = encodeURIComponent("Nubby Media Booking Inquiry");
  const body = encodeURIComponent("Name:\nEvent type:\nEvent date:\nLocation:\nProject details:\n");
  const mailto = `mailto:${contactEmail}?subject=${subject}&body=${body}`;

  const [form, setForm] = useState({ name: "", email: "", type: "", date: "", details: "" });

  const mailtoWithForm = useMemo(() => {
    const customBody = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nEvent type: ${form.type}\nEvent date: ${form.date}\n\nProject details:\n${form.details}\n`
    );
    return `mailto:${contactEmail}?subject=${subject}&body=${customBody}`;
  }, [form, subject]);

  return (
    <PageShell kicker="Contact" title="Let’s plan your next shoot.">
      <div className="grid gap-6 lg:grid-cols-[.9fr,1.1fr]">
        <div className="card p-8">
          <h2 className="text-2xl font-semibold">Booking inquiries</h2>
          <p className="copy mt-4">Tell me about your event, timeline, location, and delivery needs.</p>
          <a className="btn-primary mt-7" href={mailto}><Mail className="mr-2 h-4 w-4" /> Email Nubby Media</a>
          <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5 text-sm leading-7 text-muted">
            The form currently opens your email app. Later, this can be wired to a backend email service.
          </div>
        </div>

        <form className="card grid gap-4 p-8" onSubmit={(e) => { e.preventDefault(); window.location.href = mailtoWithForm; }}>
          <input value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Name" className="input" />
          <input value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="Email" className="input" />
          <input value={form.type} onChange={e => setForm({...form, type:e.target.value})} placeholder="Event type" className="input" />
          <input value={form.date} onChange={e => setForm({...form, date:e.target.value})} placeholder="Event date" className="input" />
          <textarea value={form.details} onChange={e => setForm({...form, details:e.target.value})} placeholder="Project details" rows={5} className="input" />
          <button type="submit" className="btn-primary"><Send className="mr-2 h-4 w-4" /> Send Inquiry</button>
        </form>
      </div>
    </PageShell>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/services" element={<Services />} />
      <Route path="/client-experience" element={<ClientExperience />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
