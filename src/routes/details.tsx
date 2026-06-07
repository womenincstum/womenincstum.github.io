import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import sabrinaImg from "@/assets/members/sabrina.jpg";
import sofiiaImg from "@/assets/members/sofiia.jpg";
import sarraImg from "@/assets/members/sarra.png";
import maissaImg from "@/assets/members/maissa.jpg";
import anastasiiaImg from "@/assets/members/anastasiia.png";
import rimaImg from "@/assets/members/rima.jpg";
import alinaImg from "@/assets/members/alina.jpg";

import ivanaImg from "@/assets/members/ivana.jpg";
import maheenImg from "@/assets/members/maheen.jpg";
import hristinaImg from "@/assets/members/hristina.jpg";
import evelinaImg from "@/assets/members/evelina.jpg";

export const Route = createFileRoute("/details")({
  component: Details,
  head: () => ({
    meta: [
      { title: "About · Women in CS @ TUM" },
      {
        name: "description",
        content: "Meet the board and active members behind Women in CS @ TUM.",
      },
      { property: "og:title", content: "About · Women in CS @ TUM" },
      { property: "og:description", content: "Our team, our board, and how to get in touch." },
    ],
  }),
});

type Person = { name: string; role?: string; photo?: string; photoPosition?: string };

const board: Person[] = [
  { name: "Sabrina Glatz", role: "Organization & Management", photo: sabrinaImg },
  { name: "Maheen Rizwan", role: "Social Media & Marketing", photo: maheenImg },
  { name: "Hristina Ivanova", role: "PR & Communication", photo: hristinaImg },
  { name: "Sofiia Storozhenko", role: "Events & Community", photo: sofiiaImg },
];

const activeMembers: Person[] = [
  { name: "Ivana Peneva", photo: ivanaImg },
  { name: "Alina Ignatova", photo: alinaImg },
  { name: "Rima Neji", photo: rimaImg },
  { name: "Anastasiia Korzhylova", photo: anastasiiaImg },
  { name: "Maissa Nouicer", photo: maissaImg },
  { name: "Sarra Ouertani", photo: sarraImg },
  { name: "Evelina Bublyk", photo: evelinaImg },
  { name: "Jana Brade" },
  { name: "Jialu Cheng" },
  { name: "Nora Paul" },
  { name: "Chrissa Philip" },
  { name: "Milena Ryzner" },
  { name: "Yaroslava Melnyk" },
  { name: "Anya" },
  { name: "Heidi Albarazi" },
  { name: "Nitika Chivte" },
  { name: "Anna Engel" },
  { name: "Izdihar Farahdina" },
  { name: "Didem Nur Ayaroglu" },
];

type Alum = { name: string; role?: string; years?: string };

const alumni: Alum[] = [
  // Former board
  { name: "Joy Chaeeun Lee", role: "Organization and Management" },
  { name: "Gertrūda Bazytė", role: "Marketing" },
  { name: "Begüm Balat", role: "Community" },
  { name: "Pauline Jakob", role: "Finance" },
  // Former members
  { name: "Veronika Bauer", role: "WinCS Officer" },
  { name: "Panagiotis Petropoulakis", role: "WinCS Officer" },
  { name: "Sarah Berbuir", role: "WinCS Officer" },
  { name: "Fatemeh Shamsoddini Ardekani", role: "WinCS Officer" },
  { name: "Nora Schneider", role: "WinCS Officer" },
  { name: "Sivadivu Mathivanan", role: "WinCS Officer" },
  // Long-time alumni
  { name: "Ana Petrovska", role: "General Team Lead", years: "2015–2022" },
  { name: "Adrian Kulmburg", role: "General Team Lead", years: "2022–2024" },
  { name: "Prof. Anne Brüggemann-Klein", role: "Responsible Faculty", years: "2015–2020" },
  { name: "Prof. Dr. Jana Giceva", role: "Responsible Faculty", years: "2020–2024" },
  { name: "Prof. Dr. Debarghya Ghoshdastidar", role: "Responsible Faculty", years: "2020–2023" },
  { name: "Hanya Elhashemy", role: "Events Team Lead", years: "2019–2022" },
  { name: "Liana Soima", role: "Social Media Team Lead", years: "2020–2023" },
  { name: "Stefanie Mohr", role: "Finance Team Lead" },
  { name: "Irina Muntean", role: "PR Team Lead", years: "2021–2023" },
  { name: "Lena Griesbeck", role: "Community Team Lead", years: "2022–2023" },
  { name: "Idil Sülo", role: "Events Team Lead", years: "2022–2024" },
  { name: "Derin Amal", role: "Events Team Lead", years: "2022–2024" },
  { name: "Chiara Laurenza", role: "Social Media Team Lead", years: "2023–2024" },
  { name: "Anastasiya Damaratskaya", role: "Social Media Team Lead", years: "2022–2024" },
  { name: "Carmen Brendt", role: "WinCS Officer" },
  { name: "Iva Lilova", role: "WinCS Officer" },
  { name: "Balkis Nouri", role: "WinCS Officer" },
  { name: "Daria Tarasova", role: "WinCS Officer" },
  { name: "Shaghayegh Kolli", role: "WinCS Officer" },
  { name: "Taiba Basit", role: "WinCS Officer" },
  { name: "Praveena Bolli", role: "WinCS Officer" },
  { name: "Ina Dempel", role: "WinCS Officer" },
  { name: "Margarita Shibarshina", role: "WinCS Officer" },
  { name: "Xena Striebel", role: "WinCS Officer" },
  { name: "Ghena Zidan", role: "WinCS Officer" },
  { name: "Ezgi Acikgöz", role: "WinCS Officer" },
  { name: "Olga Rodzik", role: "Student Assistant" },
  { name: "Stefana Raluca Luchian", role: "WinCS Officer" },
  { name: "Diana Bilic", role: "WinCS Officer" },
  { name: "Marta Piperno", role: "WinCS Officer" },
  { name: "Amal Trigui", role: "WinCS Officer" },
  { name: "Shanshan Xu", role: "WinCS Officer" },
  { name: "Eylül Naz Can", role: "WinCS Officer" },
  { name: "Dominika Młynarczyk", role: "WinCS Officer" },
  { name: "Isabel Marie Pfannmüller", role: "WinCS Officer" },
  { name: "Milena Poghosyan", role: "WinCS Officer" },
  { name: "Nuo Xu", role: "WinCS Officer" },
  { name: "Min Ting Luong", role: "WinCS Officer" },
  { name: "Gizem Altintas", role: "WinCS Officer" },
  { name: "Krishna Mavani", role: "WinCS Officer" },
  { name: "Sezin Öztüfek", role: "WinCS Officer" },
  { name: "Vaishali Ravishankar", role: "WinCS Officer" },
  { name: "Yi Ling (Jazmin) Xu", role: "WinCS Officer" },
  { name: "Harpreet Khangura", role: "WinCS Officer" },
  { name: "Lichuan Jiang", role: "WinCS Officer" },
  { name: "Carolina Kwabat", role: "WinCS Officer" },
  { name: "Stefani Margaritova", role: "WinCS Officer" },
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function PersonAvatar({ person, size }: { person: Person; size: "lg" | "sm" }) {
  const dim = size === "lg" ? "h-20 w-20" : "h-14 w-14";
  return (
    <Avatar className={`${dim} bg-muted`}>
      {person.photo ? (
        <AvatarImage src={person.photo} alt={person.name} className="object-cover object-top" style={person.photoPosition ? { objectPosition: person.photoPosition } : undefined} />
      ) : null}
      <AvatarFallback className="bg-muted text-muted-foreground font-medium">
        {initials(person.name)}
      </AvatarFallback>
    </Avatar>
  );
}

function Details() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <div className="mx-auto max-w-6xl px-5 pt-10 w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft size={16} /> Back to home
        </Link>
      </div>

      {/* BOARD */}
      <section className="mx-auto max-w-6xl px-5 py-12 w-full">
        <p className="text-sm uppercase tracking-widest text-primary font-medium">Our Team</p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold">
          Meet the <span className="text-brand-gradient">board</span>
        </h2>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Four students leading Women in CS @ TUM — keeping the club running, growing our reach,
          and bringing our community's ideas to life.
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {board.map((m) => (
            <div key={m.role} className="glass rounded-2xl p-6 flex flex-col items-center text-center gap-4">
              <PersonAvatar person={m} size="lg" />
              <div>
                <p className="font-semibold text-xl">{m.name}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-primary font-medium">
                  {m.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ACTIVE MEMBERS */}
      <section className="mx-auto max-w-6xl px-5 py-12 w-full">
        <p className="text-sm uppercase tracking-widest text-primary font-medium">Our Team</p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold">
          Active <span className="text-brand-gradient">members</span>
        </h2>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          The people behind every workshop, social, and partnership - volunteering their time to
          build a space where we can all grow together.
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {activeMembers.map((m) => (
            <div key={m.name} className="glass rounded-2xl p-6 flex flex-col items-center text-center gap-4">
              <PersonAvatar person={m} size="lg" />
              <div>
                <p className="font-semibold text-xl">{m.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ALUMNI — hidden for now
      <section className="mx-auto max-w-6xl px-5 py-12 w-full">
        <p className="text-sm uppercase tracking-widest text-primary font-medium">Our Team</p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold">
          Our <span className="text-brand-gradient">alumni</span>
        </h2>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          A heartfelt thank you to everyone who helped build and shape Women in CS @ TUM over
          the years.
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {alumni.map((m) => (
            <div
              key={m.name}
              className="glass rounded-2xl p-4 flex flex-col text-left gap-1"
            >
              <p className="font-medium text-sm leading-tight">{m.name}</p>
              {m.role && (
                <p className="text-xs uppercase tracking-wider text-primary font-medium">
                  {m.role}
                </p>
              )}
              {m.years && (
                <p className="text-xs text-muted-foreground">{m.years}</p>
              )}
            </div>
          ))}
        </div>
      </section>
      */}

      <SiteFooter />
    </div>
  );
}
