import { Link } from "@tanstack/react-router";
import { Linkedin, Instagram, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="w-full px-5 py-10 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
        <div>
          <p className="font-display font-semibold">Women in CS @ TUM e.V.</p>
          <p className="text-sm text-muted-foreground mt-1">
            Munich, Germany
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <a href="https://www.linkedin.com/company/women-in-computer-science-tum/posts/?feedView=all" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-primary"><Linkedin size={20} /></a>
          <a href="https://www.instagram.com/women.in.cs.at.tum/" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-primary"><Instagram size={20} /></a>
          <a href="mailto:womenincstum@gmail.com" aria-label="Email" className="hover:text-primary"><Mail size={20} /></a>
        </div>
        <div className="text-xs text-muted-foreground text-right">
          <Link to="/imprint" className="hover:text-primary">Imprint</Link>
        </div>
      </div>
    </footer>
  );
}
