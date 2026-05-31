import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-mark.png";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 glass">
      <div className="flex w-full items-center justify-between px-5 py-2">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Women in CS @ TUM" className="h-[2.1rem] w-auto object-contain" />
          <span className="font-display font-semibold text-sm sm:text-base">
            Women in CS <span className="text-brand-gradient">@ TUM</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm">
          <Link to="/events" className="hover:text-primary transition">Events</Link>
          <a href="/#engage" className="hover:text-primary transition">Support us</a>
          <Link to="/details" className="hover:text-primary transition">Our Team</Link>
          <a
            href="#join"
            className="rounded-full bg-primary text-primary-foreground px-4 py-2 font-medium hover:opacity-90 transition"
          >
            Join us
          </a>
        </nav>
        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border px-5 py-4 flex flex-col gap-4 text-sm bg-background/80 backdrop-blur">
          <Link to="/events" onClick={() => setOpen(false)}>Events</Link>
          <a href="/#engage" onClick={() => setOpen(false)}>Support us</a>
          <Link to="/details" onClick={() => setOpen(false)}>Our Team</Link>
          <a
            href="#join"
            onClick={() => setOpen(false)}
            className="rounded-full bg-primary text-primary-foreground px-4 py-2 font-medium text-center"
          >
            Join us
          </a>
        </div>
      )}
    </header>
  );
}
