import type { EventItem } from "@/data/events";

export function EventCardTag({
  event,
  isPast = false,
}: {
  event: Pick<EventItem, "type" | "cardLogo">;
  isPast?: boolean;
}) {
  const { type, cardLogo } = event;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-primary glass rounded-full px-2.5 py-1">
          {type}
        </span>
        {isPast && (
          <span className="text-xs font-medium text-muted-foreground rounded-full px-2.5 py-1 border border-border">
            Past
          </span>
        )}
      </div>
      {cardLogo && (
        <img
          src={cardLogo.src}
          alt={cardLogo.alt}
          className={`ml-auto w-auto max-w-24 object-contain ${cardLogo.size === "large" ? "h-9" : "h-7"}`}
        />
      )}
    </div>
  );
}
