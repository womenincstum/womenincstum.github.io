import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/imprint")({
  component: Imprint,
  head: () => ({
    meta: [
      { title: "Imprint · Women in CS @ TUM" },
      { name: "description", content: "Legal information and imprint for Women in CS @ TUM e.V." },
      { property: "og:title", content: "Imprint · Women in CS @ TUM" },
      { property: "og:description", content: "Legal information and imprint." },
    ],
  }),
});

function Imprint() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <div className="mx-auto max-w-3xl px-5 pt-10 w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft size={16} /> Back to home
        </Link>
      </div>

      <section className="mx-auto max-w-3xl px-5 py-12 w-full">
        <p className="text-sm uppercase tracking-widest text-primary font-medium">Legal</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold">
          <span className="text-brand-gradient">Imprint</span>
        </h1>

        <div className="mt-10 space-y-8 text-sm leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold mb-2">Information according to § 5 TMG</h2>
            <p className="text-muted-foreground">
              Women in CS @ TUM e.V.<br />
              c/o Technical University of Munich<br />
              School of Computation, Information and Technology<br />
              Boltzmannstraße 3<br />
              85748 Garching bei München<br />
              Germany
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Represented by</h2>
            <p className="text-muted-foreground">The board of Women in CS @ TUM e.V.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Contact</h2>
            <p className="text-muted-foreground">
              Email:{" "}
              <a href="mailto:womenincstum@gmail.com" className="text-primary hover:underline">
                womenincstum@gmail.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Register entry</h2>
            <p className="text-muted-foreground">
              Registered association (eingetragener Verein) — Amtsgericht München.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">
              Responsible for content according to § 55 Abs. 2 RStV
            </h2>
            <p className="text-muted-foreground">
              The board of Women in CS @ TUM e.V. (address as above).
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Disclaimer</h2>
            <p className="text-muted-foreground">
              Despite careful content control, we assume no liability for the content of external
              links. The operators of linked pages are solely responsible for their content.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Copyright</h2>
            <p className="text-muted-foreground">
              The content and works on these pages created by the site operators are subject to
              German copyright law. Duplication, processing, distribution, or any form of
              commercialization of such material beyond the scope of copyright law shall require
              the prior written consent of its respective author or creator.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
