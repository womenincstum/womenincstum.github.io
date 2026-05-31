import { createFileRoute, Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Calendar, MapPin, MessageCircle } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { events, eventTypes, type EventType } from "@/data/events";

type TimeFilter = "upcoming" | "past";

const normalizeTime = (value: unknown): TimeFilter | undefined => {
  if (value === "past" || value === "upcoming") return value;
  return undefined;
};

const normalizeTypes = (value: unknown): EventType[] => {
  const raw = Array.isArray(value)
    ? value.flatMap((item) => String(item).split(","))
    : typeof value === "string"
      ? value.split(",")
      : [];

  return raw.filter((item): item is EventType => eventTypes.includes(item as EventType));
};

export const Route = createFileRoute("/events")({
  component: EventsPage,
  validateSearch: (search) => ({
    time: normalizeTime(search.time),
    types: normalizeTypes(search.types),
  }),
  head: () => ({
    meta: [
      { title: "Events — Women in CS @ TUM" },
      {
        name: "description",
        content:
          "Upcoming and past events from Women in CS @ TUM — workshops, talks, networking and socials.",
      },
      { property: "og:title", content: "Events — Women in CS @ TUM" },
      {
        property: "og:description",
        content: "Browse all upcoming and past events from Women in CS @ TUM.",
      },
    ],
  }),
});

// Module-level state — persists across navigation (e.g. opening an event detail and coming back)
let persistedTime: TimeFilter = "upcoming";
let persistedTypes: EventType[] = [];

function EventsPage() {
  const location = useLocation();
  if (location.pathname !== "/events") return <Outlet />;

  return <EventsIndex />;
}

function EventsIndex() {
  const now = new Date();
  const navigate = useNavigate({ from: "/events" });
  const search = Route.useSearch();
  const [time, setTimeState] = useState<TimeFilter>(() => search.time ?? persistedTime);
  const [selectedTypes, setSelectedTypesState] = useState<EventType[]>(() =>
    search.types.length > 0 ? search.types : persistedTypes,
  );

  useEffect(() => {
    persistedTime = time;
    persistedTypes = selectedTypes;
    void navigate({ search: { time, types: selectedTypes }, replace: true });
  }, [navigate, selectedTypes, time]);

  const setTime = (nextTime: TimeFilter) => {
    setTimeState(nextTime);
  };

  const setSelectedTypes = (updater: EventType[] | ((prev: EventType[]) => EventType[])) => {
    setSelectedTypesState(updater);
  };

  const toggleType = (t: EventType) => {
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    );
  };

  const filtered = useMemo(() => {
    return events
      .filter((e) => {
        const isPast = new Date(e.isoDate).getTime() < now.getTime();
        if (time === "upcoming" && isPast) return false;
        if (time === "past" && !isPast) return false;
        if (selectedTypes.length > 0 && !selectedTypes.includes(e.type)) return false;
        return true;
      })
      .sort((a, b) =>
        time === "upcoming"
          ? new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime()
          : new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime(),
      );
  }, [time, selectedTypes, now]);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-5 pt-12 pb-6 lg:pt-20 text-left">
        <p className="text-sm uppercase tracking-widest text-primary font-medium">Events</p>
        <h1 className="mt-2 text-4xl sm:text-5xl font-bold">
          What <span className="text-brand-gradient">we do</span>
        </h1>
        <p className="mt-5 text-base sm:text-lg text-muted-foreground">
          Join our social get-togethers, hands-on workshops, industry collaborations, and career
          events. Explore upcoming dates and past highlights below.
        </p>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-6xl px-5 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="inline-flex rounded-full glass p-1 self-start">
            {(["upcoming", "past"] as TimeFilter[]).map((t) => (
              <button
                key={t}
                onClick={() => setTime(t)}
                className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition ${
                  time === t
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => setSelectedTypes([])}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition border ${
                selectedTypes.length === 0
                  ? "bg-primary text-primary-foreground border-primary"
                  : "glass hover:border-primary/50"
              }`}
            >
              All
            </button>
            {eventTypes.map((t) => {
              const active = selectedTypes.includes(t);
              return (
                <button
                  key={t}
                  onClick={() => toggleType(t)}
                  aria-pressed={active}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition border ${
                    active
                      ? "bg-primary text-primary-foreground border-primary"
                      : "glass hover:border-primary/50"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* List */}
      <section className="mx-auto max-w-6xl px-5 py-8 lg:py-10 flex-1">
        {filtered.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center text-muted-foreground">
            No {time} events match your filters. Try clearing them.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((e) => {
              const isPast = new Date(e.isoDate).getTime() < now.getTime();
              return (
                <Link
                  key={e.slug}
                  to="/events/$slug"
                  params={{ slug: e.slug }}
                  className={`group glass rounded-2xl p-6 hover:border-primary/50 transition flex flex-col ${
                    isPast ? "opacity-80" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-primary glass rounded-full px-2.5 py-1">
                      {e.type}
                    </span>
                    {isPast && (
                      <span className="text-xs font-medium text-muted-foreground rounded-full px-2.5 py-1 border border-border">
                        Past
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold leading-snug group-hover:text-brand-gradient">
                    {e.title}
                  </h3>
                  {e.description && (
                    <p className="mt-2 text-sm text-muted-foreground">{e.description}</p>
                  )}
                  <div className="mt-auto pt-5 space-y-1.5 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <Calendar size={14} /> {e.date}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin size={14} /> {e.location}
                    </p>
                    {!isPast && e.signupNote && (
                      <a
                        href="https://chat.whatsapp.com/BSPhLQLsJYWExZ7VeNWOb6"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-primary hover:underline font-medium"
                      >
                        <MessageCircle size={14} /> Join WhatsApp community for updates
                      </a>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            <ArrowRight size={16} className="rotate-180" /> Back to home
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
