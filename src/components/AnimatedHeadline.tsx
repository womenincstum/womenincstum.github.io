import { useEffect, useState } from "react";

type Word = { text: string; gradient?: boolean; trailing?: string };

const WORDS: Word[] = [
  { text: "Empowering" },
  { text: "women" },
  { text: "in" },
  { text: "computer", gradient: true },
  { text: "science", gradient: true, trailing: "." },
];

export function AnimatedHeadline() {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    WORDS.forEach((_, i) => {
      timers.push(setTimeout(() => setShown((s) => Math.max(s, i + 1)), 180 + i * 220));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
      <span className="sr-only">Empowering women in computer science.</span>
      <span aria-hidden="true" className="flex flex-wrap gap-x-[0.28em] gap-y-1">
        {WORDS.map((w, i) => (
          <span
            key={i}
            className={`inline-block transition-all duration-700 ease-out will-change-transform ${
              i < shown ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-3 blur-sm"
            }`}
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            <span className={w.gradient ? "text-brand-gradient" : undefined}>{w.text}</span>
            {w.trailing}
          </span>
        ))}
      </span>
    </h1>
  );
}
