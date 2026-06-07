import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, MapPin, Handshake, Users, Star, Sparkles, MessageCircle, Mail, Linkedin, Instagram } from "lucide-react";
import heroImg1200 from "@/assets/hero-team-1200.webp";
import heroImg800 from "@/assets/hero-team-800.webp";
import { SiteHeader } from "@/components/SiteHeader";
import { AnimatedHeadline } from "@/components/AnimatedHeadline";
import { SiteFooter } from "@/components/SiteFooter";
import { TalentPoolDialog } from "@/components/TalentPoolDialog";

import { events as allEvents } from "@/data/events";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Women in CS @ TUM — A community for women in computer science" },
      {
        name: "description",
        content:
          "Join a supportive community of women studying computer science at TUM. Events, mentorship, and opportunities — built by students, for students.",
      },
      { property: "og:title", content: "Women in CS @ TUM" },
      { property: "og:description", content: "A community for women in computer science at TUM." },
    ],
    links: [
      { rel: "preload", as: "image", href: heroImg1200, fetchpriority: "high" } as unknown as { rel: string; href: string },
    ],
  }),
});

const now = Date.now();
const events = allEvents
  .filter((e) => new Date(e.isoDate).getTime() >= now)
  .sort((a, b) => new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime())
  .slice(0, 3);

function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 pt-12 pb-20 lg:pt-20 lg:pb-28 grid xl:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <AnimatedHeadline />
            <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-5xl">
              We build a supportive community for women to connect, share knowledge, and grow
              together. Join our community activities, hands-on workshops, and industry
              career events below.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#join"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition"
              >
                Join our community <ArrowRight size={18} className="group-hover:translate-x-0.5 transition" />
              </a>
              <a
                href="#engage"
                className="inline-flex items-center justify-center gap-2 rounded-full glass px-6 py-3.5 font-semibold hover:border-primary/40 transition"
              >
                Get involved
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-brand-gradient opacity-30 blur-3xl rounded-[2rem]" />
            <img
              src={heroImg1200}
              srcSet={`${heroImg800} 800w, ${heroImg1200} 1200w`}
              sizes="(min-width: 1280px) 600px, (min-width: 768px) 90vw, 100vw"
              alt="Members of Women in CS @ TUM at a community event"
              width={1200}
              height={900}
              fetchPriority="high"
              decoding="async"
              className="relative rounded-3xl shadow-2xl ring-1 ring-white/10 object-cover w-full aspect-[4/3]"
            />

          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="mx-auto max-w-6xl px-5 py-12 lg:py-16">
        <div className="w-full max-w-none">
          <p className="text-sm uppercase tracking-widest text-primary font-medium">What's next</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">
            Upcoming <span className="text-brand-gradient">events</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Check out our next workshops, talks, and socials, and save your spot.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:items-stretch">
          {events.map((e) => (
            <Link
              key={e.slug}
              to="/events/$slug"
              params={{ slug: e.slug }}
              search={{ from: "home" as const }}
              className="group glass rounded-2xl p-6 hover:border-primary/50 transition flex flex-col"
            >
              <span className="self-start text-xs font-medium text-primary glass rounded-full px-2.5 py-1">
                {e.type}
              </span>
              <h3 className="mt-4 text-lg font-semibold leading-snug group-hover:text-brand-gradient">
                {e.title}
              </h3>
              <div className="mt-auto pt-5 space-y-1.5 text-sm text-muted-foreground">
                <p className="flex items-center gap-2"><Calendar size={14} /> {e.date}</p>
                <p className="flex items-center gap-2"><MapPin size={14} /> {e.location}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Link to="/events" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
            See all events <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* JOIN US — 3 ways to get involved */}
      <section id="join" className="mx-auto max-w-6xl px-5 py-12 lg:py-16">
        <div className="w-full max-w-none">
          <p className="text-sm uppercase tracking-widest text-primary font-medium">Get involved</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">
            Three ways to <span className="text-brand-gradient">join us</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Pick the path that fits you — you're welcome in all of them.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-5 md:items-stretch">
          <div className="glass rounded-3xl p-7 flex flex-col">
            <span className="grid place-items-center h-12 w-12 rounded-2xl bg-primary/15 text-primary">
              <Users size={22} />
            </span>
            <h3 className="mt-5 text-xl font-bold">Join our community</h3>
            <p className="mt-2 text-sm text-muted-foreground flex-1">
              Join our WhatsApp community to stay updated on all our events, workshops, and socials.
            </p>
            <a
              href="https://chat.whatsapp.com/BSPhLQLsJYWExZ7VeNWOb6"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full glass px-5 py-3 font-semibold hover:border-primary/40 transition"
            >
              <MessageCircle size={16} /> Join the chat
            </a>
          </div>

          <div className="glass rounded-3xl p-7 flex flex-col ring-2 ring-primary/50 bg-primary/[0.04]">
            <span className="grid place-items-center h-12 w-12 rounded-2xl bg-primary text-primary-foreground">
              <Star size={22} />
            </span>
            <h3 className="mt-5 text-xl font-bold">Become an active member</h3>
            <p className="mt-2 text-sm text-muted-foreground flex-1">
              Join the team behind the scenes - organize events, shape our programs, and grow with motivated women in tech.
            </p>
            <div className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary/15 text-primary px-5 py-3 font-semibold text-center">
              Applications are now closed—see you in WiSe 26/27
            </div>
          </div>

          <div id="opportunities" className="glass rounded-3xl p-7 flex flex-col">
            <span className="grid place-items-center h-12 w-12 rounded-2xl bg-primary/15 text-primary">
              <Sparkles size={22} />
            </span>
            <h3 className="mt-5 text-xl font-bold">Join the Talent Pool</h3>
            <p className="mt-2 text-sm text-muted-foreground flex-1">
              Add your details so partner companies can reach you with scholarships, programs, internships and opportunities for women in tech.
            </p>
            <TalentPoolDialog
              trigger={
                <button
                  type="button"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full glass px-5 py-3 font-semibold hover:border-primary/40 transition text-center leading-tight"
                >
                  Join the<br />Talent Pool
                </button>
              }
            />
          </div>
        </div>
      </section>

      {/* PARTNER / DONATE */}
      <section id="engage" className="mx-auto w-full max-w-6xl px-5 py-12 lg:py-16">
        <div className="mb-10 text-left w-full max-w-none">
          <p className="text-sm uppercase tracking-widest text-primary font-medium">Support us</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">
            Help us <span className="text-brand-gradient">grow the community</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Partner with us to help power workshops and events for women in tech.
          </p>
        </div>
        <div className="grid md:grid-cols-1 gap-5">
          <div
            className="rounded-3xl p-8 lg:p-10 relative overflow-hidden"
            style={{
              backgroundImage:
                "linear-gradient(135deg, var(--deep) 0%, color-mix(in oklab, var(--deep) 88%, var(--teal) 12%) 66%, color-mix(in oklab, var(--deep) 55%, var(--teal) 45%) 84%, var(--cyan) 100%)",
            }}
          >
            <Handshake className="absolute -right-6 -bottom-6 opacity-20" size={180} />
            <h3 className="text-2xl lg:text-3xl font-bold text-white">Partner with us</h3>
            <p className="mt-3 text-white/85 max-w-5xl">
              Meet Munich's top women in tech - sponsor an event, host a workshop, or add your open roles to our talent pool.
            </p>
            <a href="mailto:womenincstum@gmail.com" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 font-semibold hover:opacity-90 transition">
              Become a partner <ArrowRight size={16} />
            </a>
          </div>
          {/* Sponsor / Donate card — re-enable once officially gemeinnützig
          <div className="glass rounded-3xl p-8 lg:p-10 relative overflow-hidden">
            <Heart className="absolute -right-4 -bottom-4 text-primary/20" size={180} />
            <h3 className="text-2xl lg:text-3xl font-bold">Donate</h3>
            <p className="mt-3 text-muted-foreground max-w-md">
              Every euro funds workshops and community events.
            </p>
            <a href="mailto:womenincstum@gmail.com" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 font-semibold hover:opacity-90 transition">
              Support us <ArrowRight size={16} />
            </a>
          </div>
          */}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto w-full max-w-6xl px-5 py-12 lg:py-16">
        <div className="text-left max-w-2xl mb-10 mr-auto">
          <p className="text-sm uppercase tracking-widest text-primary font-medium">Get in touch</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Say hello</h2>
          <p className="mt-3 text-muted-foreground">
            Questions, collaborations, partnerships, or just want to chat? We'd love to hear from you.
          </p>
        </div>
        <div className="flex flex-wrap justify-start gap-3 text-sm">
          <a href="mailto:womenincstum@gmail.com" className="inline-flex items-center gap-3 rounded-full glass px-5 py-3 hover:border-primary/40 transition">
            <Mail size={18} /> womenincstum@gmail.com
          </a>
          <a href="https://www.linkedin.com/company/women-in-computer-science-tum/posts/?feedView=all" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full glass px-5 py-3 hover:border-primary/40 transition">
            <Linkedin size={18} /> Women in CS @ TUM
          </a>
          <a href="https://www.instagram.com/women.in.cs.at.tum/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full glass px-5 py-3 hover:border-primary/40 transition">
            <Instagram size={18} /> @women.in.cs.at.tum
          </a>
        </div>
      </section>

      {/* MORE */}
      <section className="mx-auto max-w-6xl px-5 py-12 text-center">
        <Link to="/details" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
          Meet the team <ArrowRight size={16} />
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
}
