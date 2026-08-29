import jetbrainsLogo from "@/assets/partners/jetbrains-white.svg";
import optiverLogo from "@/assets/partners/optiver.svg";
import netlightLogo from "@/assets/partners/netlight.svg";
import guardsquareLogo from "@/assets/partners/guardsquare.png";
import euroaviaLogo from "@/assets/partners/euroavia-white.png";
import gdscMunichLogo from "@/assets/partners/gdsc-munich-white.png";

import infoNight1 from "@/assets/events/info-night-2026-1.jpg";
import infoNight2 from "@/assets/events/info-night-2026-2.jpg";
import infoNight3 from "@/assets/events/info-night-2026-3.jpg";
import optiver1 from "@/assets/events/optiver-2025-1.jpg";
import rhl2026_1 from "@/assets/events/rhl-2026-1.jpg";
import rhl2026_4 from "@/assets/events/rhl-2026-4.jpg";
import rhl2026_5 from "@/assets/events/rhl-2026-5.jpg";
import rhl2026_6 from "@/assets/events/rhl-2026-6.jpg";
import rhl2026_7 from "@/assets/events/rhl-2026-7.jpg";
import rhl2026_8 from "@/assets/events/rhl-2026-8.jpg";
import optiver2024_1 from "@/assets/events/optiver-2024-1.jpg";
import optiver2024_2 from "@/assets/events/optiver-2024-2.jpg";
import optiver2024_3 from "@/assets/events/optiver-2024-3.jpg";
import optiver2024_4 from "@/assets/events/optiver-2024-4.jpg";
import optiver2024_5 from "@/assets/events/optiver-2024-5.jpg";
import bias2025_1 from "@/assets/events/bias-2025-1.jpg";
import bias2025_2 from "@/assets/events/bias-2025-2.jpg";
import phd2025_1 from "@/assets/events/phd-2025-1.png";
import phd2025_2 from "@/assets/events/phd-2025-2.png";
import phd2025_3 from "@/assets/events/phd-2025-3.png";
import phd2025_4 from "@/assets/events/phd-2025-4.webp";
import onboarding1 from "@/assets/events/onboarding-2026-1.jpg";
import onboarding2 from "@/assets/events/onboarding-2026-2.jpg";
import onboarding3 from "@/assets/events/onboarding-2026-3.jpg";
import onboarding4 from "@/assets/events/onboarding-2026-4.jpg";
import onboarding5 from "@/assets/events/onboarding-2026-5.jpg";
import onboarding6 from "@/assets/events/onboarding-2026-6.jpg";
import onboarding7 from "@/assets/events/onboarding-2026-7.jpg";
import schnupperstudium0 from "@/assets/events/schnupperstudium.jpeg";
import schnupperstudium1 from "@/assets/events/schnupperstudium-1.jpeg";
import schnupperstudium2 from "@/assets/events/schnupperstudium-2.jpeg";
import schnupperstudium3 from "@/assets/events/schnupperstudium-3.jpeg";
import schnupperstudium4 from "@/assets/events/schnupperstudium-4.jpeg";
import schnupperstudium5 from "@/assets/events/schnupperstudium-5.jpeg";
import eu1 from "@/assets/events/eu.jpeg";
import eu2 from "@/assets/events/eu-2.png";
import eu3 from "@/assets/events/eu-3.png";
import eu4 from "@/assets/events/eu-4.png";
import eu5 from "@/assets/events/eu-5.png";
import utum0 from "@/assets/events/utum.jpg";
import utum1 from "@/assets/events/utum-1.jpg";
import utum2 from "@/assets/events/utum-2.jpg";
import utum3 from "@/assets/events/utum-3.jpg";
import utum4 from "@/assets/events/utum-4.jpg";
import utum5 from "@/assets/events/utum-5.jpg";
import utum6 from "@/assets/events/utum-6.jpg";
import utum7 from "@/assets/events/utum-7.jpg";
import utum8 from "@/assets/events/utum-8.jpg";
import utum10 from "@/assets/events/utum-10.jpg";
import utum11 from "@/assets/events/utum-11.jpg";
import utum12 from "@/assets/events/utum-12.jpg";
import utum13 from "@/assets/events/utum-13.jpg";
import utum14 from "@/assets/events/utum-14.jpg";
import utum15 from "@/assets/events/utum-15.jpg";

export type EventType = "Social" | "Workshop" | "Career" | "Internal";

export interface EventPartner {
  name: string;
  logo: string;
  website?: string;
}

export interface EventItem {
  slug: string;
  title: string;
  date: string;
  isoDate: string;
  location: string;
  type: EventType;
  href?: string; // external link (e.g. lu.ma) – optional
  description?: string;
  summary?: string; // longer recap shown on detail page
  signupNote?: string; // e.g. "More information & signup coming soon."
  gallery?: string[]; // image URLs for the detail page
  partners?: EventPartner[];
  signupLink?: string;
}

// Helper to build image URLs from the legacy archive site
const ARCHIVE = "https://womenincstum.github.io/assets/images";
const img2025 = (name: string) => `${ARCHIVE}/content-2025/${name}`;
const img2024 = (name: string) => `${ARCHIVE}/content-2024/${name}`;
const img2023 = (name: string) => `${ARCHIVE}/content-2023/${name}`;

// Fallback stock imagery for events without archive photos
const stock = {
  workshop: [
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1200&auto=format&fit=crop",
  ],
  career: [
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop",
  ],
  social: [
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&auto=format&fit=crop",
  ],
  retreat: [
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop",
  ],
  community: [
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&auto=format&fit=crop",
  ],
};

export const events: EventItem[] = [
  // ===== Upcoming =====x
  {
    slug: "support-tum-cs-schnupperstudium-2026",
    title: "CS Schnupperstudium for High School Girls",
    date: "June 15–17, 2026",
    isoDate: "2026-06-15T09:00:00",
    location: "TUM Campus Garching",
    type: "Social",
    description: "High school girls got to experience what it is like studying CS at TUM — coding, a robotics lab visit, a lecture, and a panel on AI.",
    summary: `We successfully wrapped up this year's CS Schnupperstudium. Over the course of the event, participants got a real taste of studying CS at TUM - from coding games like Tic-Tac-Toe and visiting the robotics lab at Siemens, to attending an actual algorithms lecture and joining a panel discussion on whether studying CS is still worth it in the age of AI. We're especially happy to share that many participants who were initially unsure about pursuing CS left feeling excited about it. A big thank you to everyone who made it happen and to all the participants for bringing such great energy.`,
    signupLink: "https://docs.google.com/forms/d/e/1FAIpQLSdH1WzkdNGdCsfslLADWMEEz93EsFTrNbM2Bb3n5cFUT40emw/viewform?usp=header",
    gallery: [schnupperstudium0, schnupperstudium1, schnupperstudium2, schnupperstudium3, schnupperstudium4, schnupperstudium5],
  },
  {
    slug: "euroavia-aerospace-researchers-2026",
    title: "Meet the Researchers with EUROAVIA",
    date: "June 18, 2026 · 09:00–11:00",
    isoDate: "2026-06-18T09:00:00",
    location: "Sandstraße 33, München (Tacto)",
    type: "Career",
    description: "A panel with EUROAVIA München featuring researchers from DLR, Max Planck Institute, and WIA-E Munich on aerospace, ML, and building careers in STEM.",
    summary: `We partnered with EUROAVIA München for our Meet the Researchers panel, bringing together researchers and professionals working at the intersection of aerospace, machine learning, and innovation. Our speakers - Amita Shrestha (DLR), Juliette Murris (Max Planck Institute), Cécile Deprez (DLR), and Arti Dhole (WIA-E Munich & SpaceBrewery) shared not only their cutting-edge research in areas like optical satellite communication, protein language models, and the Galileo satellite constellation, but also the personal journeys behind it. The evening was full of lessons on visibility, mentorship, and owning your expertise: a reminder that you don't have to know everything to belong in research, but you do have to raise your hand. A huge thank you to our speakers and to everyone who joined the discussion.`,
    signupLink: "https://luma.com/ahzx26pj",
    href: "https://www.euroavia-muenchen.de/en/front-page/",
    partners: [{ name: "EUROAVIA Munich", logo: euroaviaLogo, website: "https://www.euroavia-muenchen.de/en/front-page/" }],
    gallery: [eu1, eu2, eu3, eu4, eu5],
  },
  {
    slug: "summer-party-2026",
    title: "Summer Party",
    date: "September 5, 2026",
    isoDate: "2026-09-05T18:00:00",
    location: "Munich",
    type: "Internal",
    description: "A social to wrap up the semester and celebrate what we've accomplished over the past months.",
  },
  {
    slug: "women-in-venture-startups-2026",
    title: "Women Who Build: An Evening of Stories & Skills",
    date: "July 1, 2026 · 18:00–20:00",
    isoDate: "2026-07-01T18:00:00",
    location: "StudiTUM Garching, Lichtenbergstr. 3",
    type: "Workshop",
    description: "A founder talk, design sprint, and real talk on building with UnternehmerTUM - featuring speakers from Pollyn and The Munich Spirit.",
    summary: `We hosted "Women who Built" with UnternehmerTUM, an evening of founder talks, hands-on building, and real talk about what it takes to start something. Sena Alemdar (Co-founder & CTO, Pollyn) kicked things off with her journey from full-stack developer to EXIST-funded founder building an AI early-warning system for teams - no sugarcoating, just honest lessons on finding problems worth solving. Then came the chaos: 45 minutes, 3-person teams, one brief, and a full Double Diamond sprint with nothing but paper and a timer. Alejandra Melendez (The Munich Spirit) closed the night with a grounding reminder that consistency beats virality and you don't need permission to start. To everyone who showed up, pitched an idea in 60 seconds flat, and stayed for the networking - thank you.`,
    signupLink: "https://lnkd.in/dUmT2UBi",
    gallery: [utum0, utum1, utum2, utum3, utum4, utum5, utum6, utum7, utum8, utum10, utum11, utum12, utum13, utum14, utum15],
  },
  {
    slug: "jetbrains-dev-tools-2026",
    title: "Career Workshop with JetBrains",
    date: "October 21, 2026 · 18:00",
    isoDate: "2026-10-21T18:00:00",
    location: "JetBrains Office, Munich",
    type: "Career",
    description: "Join us for a Career Workshop with JetBrains. More information will follow soon — join our WhatsApp community to stay informed!",
    summary: "Join us for a Career Workshop with JetBrains. More information and the detailed agenda will follow soon. In the meantime, join our WhatsApp community to stay informed!",
    signupNote: "More information coming soon.",
    partners: [{ name: "JetBrains", logo: jetbrainsLogo, website: "https://www.jetbrains.com/" }],
  },

  // ===== Past =====
  {
    slug: "internal-onboarding-2026",
    title: "Onboarding Event",
    date: "June 3, 2026 · 18:00",
    isoDate: "2026-06-03T18:00:00",
    location: "TUM Garching",
    type: "Internal",
    description: "Official onboarding session to welcome our newest members to the team!",
    summary: `We had our official onboarding session to welcome our newest members to the team! The evening kicked off with fun icebreakers and a quick intro to our club and the exciting projects ahead, followed by an evening at the StuStaCulum to get to know each other better.

To our new members - we can’t wait to see the projects you’ll build and how you’ll grow together over the coming months.`,
    gallery: [onboarding7, onboarding6, onboarding1, onboarding2, onboarding3, onboarding4, onboarding5],
  },
  {
    slug: "info-night-2026",
    title: "WinCS Info Night & Karaoke 2026",
    date: "May 13, 2026 · 18:45",
    isoDate: "2026-05-13T18:45:00",
    location: "StudiTUM, Garching",
    type: "Social",
    description: "Meet the club, ask questions, and sing karaoke with us afterwards.",
    summary:
      "We hosted an info night for everyone to discover what our club is all about and how to get involved. Over plenty of snacks and drinks, people got to chat with our members and get to know the community. We kicked things off at StudiTUM with a relaxed intro and Q&A, then moved over to the Campus Kneipe for the a karaoke night.",
    gallery: [infoNight1, infoNight2, infoNight3],
  },
  {
    slug: "raitenhaslach-2026",
    title: "Raitenhaslach Team Workshop 2026",
    date: "April 24–26, 2026",
    isoDate: "2026-04-24T09:00:00",
    location: "TUM Akademiezentrum, Raitenhaslach",
    type: "Internal",
    description: "Our annual team trip — reflection, planning, and team building.",
    summary:
      "We spent a very productive weekend at the TUM Akademiezentrum in Raitenhaslach reflecting on the past semester, gathering feedback, and tackling our biggest challenges. The team got straight to work - planning our next events, restructuring the club, and creating our new logo. Between these working sessions, we recharged with team-building activities: painting bags, watching the sunset from the longest castle in the world, going for a run together, and wrapping up the night at a local bar.",
    gallery: [rhl2026_7, rhl2026_6, rhl2026_1, rhl2026_4, rhl2026_5, rhl2026_8],
  },

  // 2025
  {
    slug: "interview-tips-optiver-2025",
    title: "Interview Tips Session with Optiver",
    date: "November 27, 2025",
    isoDate: "2025-11-27T17:30:00",
    location: "StudiTUM, Garching",
    type: "Career",
    description: "An exclusive panel-style interview prep session with Optiver.",
    summary:
      "We teamed up with Optiver at StudiTUM Garching for an exclusive Women in Tech Interview Tips Session, packed with actionable insights for everyone preparing for internships, working student roles, or full-time positions. After a quick intro to Optiver, a developer walked us through their technical interview format and question types, followed by a recruiter who shared insider tips on tackling behavioral rounds. Attendees also got an exclusive preview of Optiver's female-only 3-day workshop in Amsterdam. The evening wrapped up with interactive mock interviews and a lively networking session over pizza, giving TUM students a chance to connect directly with industry experts.",
    partners: [{ name: "Optiver", logo: optiverLogo, website: "https://optiver.com/" }],
    gallery: [optiver1],
  },
  {
    slug: "raitenhaslach-2025",
    title: "Raitenhaslach Team Workshop 2025",
    date: "May 15–18, 2025",
    isoDate: "2025-05-15T09:00:00",
    location: "TUM Akademiezentrum, Raitenhaslach",
    type: "Internal",
    href: "https://womenincstum.github.io/raitenhaslach-2025/",
    description: "Annual team retreat — reflection, planning, and team building.",
    summary:
      "We headed to the TUM Science & Study Center Raitenhaslach for our annual team trip! It was the perfect mix of strategy and bonding as we reflected on the past semester, gathered feedback, and mapped out our upcoming events. A huge focus this year was welcoming and integrating our newest team members. To make sure everyone felt right at home, we balanced our brainstorming sessions with plenty of team building—including a hike up to the castle, board game nights, and a creative painting session.",
    gallery: [
      img2025("raitenhaslach-1.jpeg"),
      img2025("raitenhaslach-2.jpeg"),
      img2025("raitenhaslach-3.jpeg"),
      img2025("raitenhaslach-4.jpeg"),
    ],
  },
  {
    slug: "recruiting-event-2025",
    title: "WinCS Info Night 2025",
    date: "2025",
    isoDate: "2025-04-15T18:00:00",
    location: "TUM campus",
    type: "Career",
    href: "https://womenincstum.github.io/recruiting-event-2025/",
    description: "Meet the club, ask questions, and connect with our members.",
    summary:
      "We hosted an open evening for everyone to discover what our club is all about and how to get involved. Over plenty of snacks and drinks, guests got to chat with our members and hear about our mission to support women and underrepresented groups in tech. We kicked things off with a relaxed intro and Q&A, where we also shared a sneak peek of the projects, workshops, and mentorship programs coming up this semester.",
    gallery: [
      img2025("recruiting-event-1.jpeg"),
      img2025("recruiting-event-2.jpeg"),
      img2025("recruiting-event-3.jpeg"),
      img2025("recruiting-event-4.jpeg"),
      img2025("recruiting-event-5.jpeg"),
    ],
  },
  {
    slug: "phd-event-2025",
    title: "PhD Info Night 2025",
    description: "Panel, talks, and roundtable Q&A with TUM female PhD students.",
    date: "July 7, 2025 · 17:30",
    isoDate: "2025-07-07T17:30:00",
    location: "MW 5502.EG.250, TUM Garching",
    type: "Career",
    summary:
      "We hosted a special evening designed to help students explore the possibilities of a future in research. The night kicked off with female PhD students at TUM sharing their personal journeys - from navigating uncertainty and finding motivation to building support networks and discovering their passion. This set the stage for an insightful panel discussion, followed by an open Q&A where the audience could ask the speakers all their burning questions. It was a great opportunity to ask questions about everything from daily life as a researcher and choosing a supervisor to transitioning from industry to academia.",
    gallery: [phd2025_1, phd2025_2, phd2025_3, phd2025_4],
  },
  {
    slug: "hidden-bias-in-ai-2025",
    title: "The (Not So) Hidden Bias in AI with GDSC Munich",
    date: "July 2, 2025 · 18:30",
    isoDate: "2025-07-02T18:30:00",
    location: "Hörsaal 2, Interims I (5620.01.102), TUM Garching",
    type: "Workshop",
    description:
      "Panel discussion and networking evening on bias in AI — in collaboration with Google Developer Student Club Munich.",
    summary:
      "We teamed up with the Google Developer Student Club Munich for a panel discussion on one of the most pressing challenges in modern tech: bias in AI systems. As future tech builders, engineers, and data scientists, we have a responsibility to understand the blind spots in the systems we create. Experts from academia and applied research broke down how AI can unintentionally reinforce real-world inequalities—affecting fairness, trust, and technical quality. The panel explored technical approaches to detection, mitigation, and explainability, giving students actionable ways to build more responsible AI. The evening wrapped up with a lively networking session, leaving everyone inspired to critically engage with the tech they'll one day build.",
    partners: [{ name: "Google Developer Student Club Munich", logo: gdscMunichLogo, website: "https://gdg.community.dev/gdg-on-campus-technical-university-of-munich-munich-germany/" }],
    gallery: [bias2025_1, bias2025_2],
  },

  // 2024
  {
    slug: "phd-fair-2024",
    title: "PhD Fair 2024",
    date: "June 20, 2024",
    isoDate: "2024-06-20T18:00:00",
    location: "TUM campus",
    type: "Career",
    description: "Female PhD students and a professor share their research journeys.",
    summary:
      "We invited several female PhD students and a professor to share their journeys — the path that led them into research, the challenges they've faced during their PhDs, and how they're navigating and overcoming them. After their inspiring talks, we opened the floor to a panel discussion where questions from the team and the audience were answered in depth. A huge thank you to everyone who joined — it was a truly memorable evening.",
    gallery: [
      img2024("phd-event-2024-1.jpg"),
      img2024("phd-event-2024-2.jpg"),
      img2024("phd-event-2024-3.jpg"),
      img2024("phd-event-2024-4.jpg"),
    ],
  },
  {
    slug: "tech-interview-prep-optiver-2024",
    title: "Tech Interview Prep Workshop with Optiver",
    date: "November 26, 2024",
    isoDate: "2024-11-26T18:00:00",
    location: "StudiTUM, Garching Campus",
    type: "Career",
    description: "Mock interviews, expert tips, and networking with Optiver.",
    summary:
      "Students leveled up their career prep at our Tech Interview Workshop with Optiver! The event was packed with everything needed to ace upcoming technical and behavioral rounds. We kicked things off with an interactive mock interview session using real-life scenarios to break down key strategies, followed by an open Q&A where students got direct feedback from the pros. Afterward, participants connected with the Optiver team and their peers over food and drinks, wrapping up a great night of networking and career coaching.",
    partners: [{ name: "Optiver", logo: optiverLogo, website: "https://optiver.com/" }],
    gallery: [optiver2024_1, optiver2024_2, optiver2024_3, optiver2024_4, optiver2024_5],
  },
  {
    slug: "recruiting-event-2024",
    title: "WinCS Info Night 2024",
    date: "2024",
    isoDate: "2024-10-08T18:00:00",
    location: "TUM campus",
    type: "Career",
    href: "https://womenincstum.github.io/recruiting-event-2024/",
    description: "Meet the club, ask questions, and connect with our members.",
    summary:
      "We hosted a fantastic open evening for new students to discover what our club is all about and how to get involved. Over plenty of snacks and drinks, we shared our mission of empowering women and underrepresented groups in tech. We also highlighted our upcoming projects, workshops, and mentorship opportunities designed to help members grow both personally and professionally, leaving plenty of time for everyone to chat and connect with our members.",
    gallery: [
      img2024("recruiting-2024-1.jpg"),
      img2024("recruiting-2024-2.jpg"),
      img2024("recruiting-2024-3.jpg"),
      img2024("recruiting-2024-4.jpg"),
      img2024("recruiting-2024-5.jpg"),
      img2024("recruiting-2024-6.jpg"),
    ],
  },
  {
    slug: "exam-preparation-2024",
    title: "Exam Preparation: Tips & Tricks",
    date: "2024",
    isoDate: "2024-01-20T18:00:00",
    location: "TUM campus",
    type: "Workshop",
    href: "https://womenincstum.github.io/exam-preparation-2024/",
    description: "Study strategies, time management, and stress tips for exam season.",
    summary:
      "We hosted an exam-prep session where experienced students stepped up to share their top strategies for surviving and thriving during exam season. The interactive night covered everything from time management and study techniques to stress management and staying motivated. With plenty of Q&A throughout, attendees walked away with tailored advice and a clear game plan for their upcoming finals.",
    gallery: [
      img2024("exam-preparation-ws24-1.jpg"),
      img2024("exam-preparation-ws24-2.jpg"),
    ],
  },

  // 2023
  {
    slug: "christmas-2023",
    title: "WinCS Christmas Party",
    date: "2023",
    isoDate: "2023-12-15T19:00:00",
    location: "Munich",
    type: "Social",
    href: "https://womenincstum.github.io/christmas-2023/",
    description: "Our annual Christmas celebration — gift exchange, food, and good company.",
    summary:
      "We wrapped up the year with our annual Christmas party! It was a beautiful celebration of the community we've built together, filled with networking, a festive gift exchange, and shared reflections on everything we achieved over the past year.",
    gallery: [
      img2023("christmas-event-1.jpg"),
      img2023("christmas-event-2.jpg"),
      img2023("christmas-event-3.jpg"),
      img2023("christmas-event-4.jpg"),
      img2023("christmas-event-5.jpg"),
      img2023("christmas-event-6.jpg"),
    ],
  },
  {
    slug: "netlight-career-lunch-2023",
    title: "Career Lunch with Netlight",
    date: "2023",
    isoDate: "2023-11-10T12:00:00",
    location: "Munich",
    type: "Career",
    href: "https://womenincstum.github.io/netlight-career-lunch-2023/",
    description: "Communication workshop, CV and LinkedIn coaching over lunch with Netlight.",
    summary:
      "We partnered with Netlight Consulting for an exclusive Career Lunch designed to elevate our professional presence. Over a relaxed lunch with recruiters and peers, attendees dove into an interactive communication workshop, received personalized 1:1 CV and LinkedIn coaching, and learned strategies for mastering personal branding.",
    partners: [
      { name: "Netlight Consulting", logo: netlightLogo, website: "https://www.netlight.com/" },
    ],
    gallery: [img2023("netlight-career-lunch.jpg")],
  },
  {
    slug: "gender-pay-gap-2023",
    title: "Gender Pay Gap Info Talk",
    date: "2023",
    isoDate: "2023-10-15T18:00:00",
    location: "TUM campus",
    type: "Career",
    href: "https://womenincstum.github.io/gender-pay-gap-event-2023/",
    description: "Maxi Görnitz on the gender pay gap and tips for salary negotiation.",
    summary:
      "Maxi Görnitz joined us to unpack the complexities of the gender pay gap. She guided our community through how the gap has evolved over time, what it looks like specifically in tech and STEM fields today, and shared invaluable, concrete tips for self-advocacy and salary negotiation as we prepare to enter the workforce.",
    gallery: [
      img2023("gender-pay-gap-event-1.jpg"),
      img2023("gender-pay-gap-event-2.jpg"),
    ],
  },
  {
    slug: "set-fair-2023",
    title: "WinCS at SET Fair",
    date: "2023",
    isoDate: "2023-10-05T10:00:00",
    location: "TUM campus",
    type: "Career",
    href: "https://womenincstum.github.io/set-fair-2023/",
    description: "Welcoming incoming students at the SET Fair.",
    summary:
      "Our team headed to the SET Fair to welcome the new students! We shared what our club is all about, our upcoming events, and built great connections with students.",
    gallery: [img2023("set-fair-1.jpg"), img2023("set-fair-2.jpg")],
  },
  {
    slug: "yoga-2023",
    title: "Discover Inner Peace with Yin Yoga",
    date: "July 10, 2023",
    isoDate: "2023-07-10T18:00:00",
    location: "MI Building, TUM",
    type: "Social",
    href: "https://womenincstum.github.io/yoga-event-2023/",
    description: "A calming Yin Yoga session to unwind, stretch, and reset.",
    summary:
      "When studying computer science at TUM, it's easy to forget to slow down, which is why our Yin Yoga session was the perfect escape. Held at the MI building and led by our own team member and professional yoga instructor, Diana, the calm evening helped us quiet our minds and stretch out the stress of the semester. Thank you to Diana for the amazing guidance, and to everyone who shared the space with us. We're already looking forward to the next wellness session!",
    gallery: [
      img2023("yoga-event-1.jpg"),
      img2023("yoga-event-2.jpg"),
      img2023("yoga-event-3.jpg"),
      img2023("yoga-event-4.jpg"),
    ],
  },
  {
    slug: "hacking-workshop-2023",
    title: "Mobile Game Hacking Workshop with Guardsquare and Google DSC Munich",
    date: "2023",
    isoDate: "2023-05-10T18:00:00",
    location: "TUM campus",
    type: "Workshop",
    href: "https://womenincstum.github.io/hacking-workshop-2023/",
    description: "Reverse engineering and mobile game security with industry experts.",
    summary:
      "Our  mobile game security workshop with Guardsquare and Google DSC Munich was a great success. Attendees got to explore the mechanics of reverse engineering using Plants vs. Zombies before tackling real-world, hands-on security challenges. The evening wrapped up with pizza, drinks, and networking with the experts.",
    partners: [
      { name: "Guardsquare", logo: guardsquareLogo, website: "https://www.guardsquare.com/" },
      { name: "Google Developer Student Club Munich", logo: gdscMunichLogo, website: "https://gdg.community.dev/gdg-on-campus-technical-university-of-munich-munich-germany/" },
    ],
    gallery: [
      img2023("hacking-workshop-1.jpg"),
      img2023("hacking-workshop-2.jpg"),
    ],
  },

];

export const eventTypes: EventType[] = ["Social", "Workshop", "Career", "Internal"];
