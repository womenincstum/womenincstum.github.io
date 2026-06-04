import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, MapPin, MessageCircle, Tag } from "lucide-react";
import { Fragment, type ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { events, type EventPartner } from "@/data/events";

// Words inside a summary/description that should become inline links to the event's href
const LINKABLE_TERMS: Record<string, string[]> = {
  "euroavia-aerospace-researchers-2026": ["EUROAVIA"],
};

function renderWithLinks(text: string, href?: string, terms?: string[]): ReactNode {
  if (!href || !terms || terms.length === 0) return text;
  const pattern = new RegExp(
    `(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "g",
  );
  const parts = text.split(pattern);
  return parts.map((part, i) =>
    terms.includes(part) ? (
      <a
        key={i}
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-primary hover:underline font-medium"
      >
        {part}
      </a>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}


export const Route = createFileRoute("/events/$slug")({
  component: EventDetailPage,
  validateSearch: (search: Record<string, unknown>) => ({
    from: search.from === "home" ? ("home" as const) : undefined,
  }),
  loader: ({ params }) => {
    const event = events.find((e) => e.slug === params.slug);
    if (!event) throw notFound();
    return { event };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="flex-1 grid place-items-center p-10 text-center">
        <div>
          <h1 className="text-3xl font-bold">Event not found</h1>
          <p className="mt-2 text-muted-foreground">
            We couldn't find that event. Browse all events instead.
          </p>
          <Link
            to="/events"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 font-medium"
          >
            All events
          </Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="flex-1 grid place-items-center p-10 text-center">
        <p className="text-muted-foreground">{error.message}</p>
      </div>
      <SiteFooter />
    </div>
  ),
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.event.title} — Women in CS @ TUM` },
      {
        name: "description",
        content:
          loaderData?.event.summary ||
          loaderData?.event.description ||
          "An event by Women in CS @ TUM.",
      },
      { property: "og:title", content: loaderData?.event.title ?? "Event" },
      {
        property: "og:description",
        content: loaderData?.event.summary || loaderData?.event.description || "",
      },
      ...(loaderData?.event.gallery?.[0]
        ? [{ property: "og:image", content: loaderData.event.gallery[0] }]
        : []),
    ],
  }),
});

function EventDetailPage() {
  const { event } = Route.useLoaderData();
  const { from } = Route.useSearch();
  const isPast = new Date(event.isoDate).getTime() < Date.now();
  const backTo = from === "home" ? "/" : "/events";
  const backLabel = from === "home" ? "Back to home" : "Back to all events";

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <div className="mx-auto w-full max-w-6xl px-5 pt-10">
        <Link
          to={backTo}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft size={16} /> {backLabel}
        </Link>
      </div>

      <article className="mx-auto w-full max-w-6xl px-5 py-8 lg:py-12 flex-1">
        <div className="relative">
          {event.partners && event.partners.length > 0 && (
            <div
              className={`absolute right-0 top-0 flex gap-3 ${
                event.partners.length > 1
                  ? "flex-col items-end"
                  : "items-center"
              }`}
            >
              {event.partners.map((partner: EventPartner) => {
                const logo = (
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="h-14 sm:h-16 max-w-[160px] object-contain"
                  />
                );
                return partner.website ? (
                  <a
                    key={partner.name}
                    href={partner.website}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${partner.name} — industry partner`}
                    title={`${partner.name} — industry partner`}
                    className="inline-flex items-center transition hover:opacity-80"
                  >
                    {logo}
                  </a>
                ) : (
                  <span
                    key={partner.name}
                    aria-label={`${partner.name} — industry partner`}
                    title={`${partner.name} — industry partner`}
                  >
                    {logo}
                  </span>
                );
              })}
            </div>
          )}

          <div className="pr-0 sm:pr-40">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary glass rounded-full px-2.5 py-1">
                <Tag size={12} /> {event.type}
              </span>
              {isPast && (
                <span className="text-xs font-medium text-muted-foreground rounded-full px-2.5 py-1 border border-border">
                  Past event
                </span>
              )}
            </div>

            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              {event.title}
            </h1>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Calendar size={16} /> {event.date}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} /> {event.location}
              </p>
            </div>
          </div>
        </div>

        {event.signupNote && (
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
            {event.signupNote}
          </div>
        )}

        {!isPast && event.signupNote && (
          <a
            href="https://chat.whatsapp.com/BSPhLQLsJYWExZ7VeNWOb6"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400 hover:bg-green-500/20 transition"
          >
            <MessageCircle size={16} /> Join our WhatsApp community for updates
          </a>
        )}

        {event.summary && (
          <p className="mt-8 max-w-4xl text-lg text-foreground/90 leading-relaxed">
            {renderWithLinks(event.summary, event.href, LINKABLE_TERMS[event.slug])}
          </p>
        )}
        {!event.summary && event.description && (
          <p className="mt-8 max-w-4xl text-lg text-foreground/90 leading-relaxed">
            {renderWithLinks(event.description, event.href, LINKABLE_TERMS[event.slug])}
          </p>
        )}


        {event.gallery && event.gallery.length > 0 && (
          <section className="mt-12">
            <h2 className="text-sm uppercase tracking-widest text-primary font-medium">
              Gallery
            </h2>
            <div className="mt-4 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
              {event.gallery.map((src: string, i: number) => (
                <figure
                  key={src + i}
                  className="glass rounded-2xl overflow-hidden mb-4 break-inside-avoid"
                >
                  <img
                    src={src}
                    alt={`${event.title} — photo ${i + 1}`}
                    loading="lazy"
                    className="block w-full h-auto transition duration-500 hover:scale-105"
                  />
                </figure>
              ))}
            </div>
          </section>
        )}
      </article>

      <SiteFooter />
    </div>
  );
}
