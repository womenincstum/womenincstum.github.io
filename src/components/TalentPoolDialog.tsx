import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { submitTalentPool } from "@/lib/talentPool.functions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const STUDY_STATUS = [
  "Bachelor student",
  "Master student",
  "PhD student",
  "Alumni (graduated)",
  "Other",
] as const;

const BACHELOR_PROGRAMS = [
  "B.Sc. Informatics",
  "B.Sc. Data Engineering and Analytics",
  "B.Sc. Information Systems",
  "B.Sc. Games Engineering",
  "B.Sc. Electrical Engineering and Information Technology",
  "B.Sc. Engineering Science",
  "B.Sc. Mathematics",
];

const MASTER_PROGRAMS = [
  "M.Sc. Informatics",
  "M.Sc. Data Engineering and Analytics",
  "M.Sc. Information Systems",
  "M.Sc. Robotics, Cognition, Intelligence",
  "M.Sc. Computational Science and Engineering",
  "M.Sc. Biomedical Computing",
  "M.Sc. Electrical Engineering and Information Technology",
  "M.Sc. Communications Engineering",
  "M.Sc. Mathematics in Data Science",
  "M.Sc. Mathematics",
];

const tumEmail = z
  .string()
  .trim()
  .toLowerCase()
  .max(255)
  .email("Please enter a valid email")
  .refine(
    (e) => e.endsWith("@tum.de") || e.endsWith("@mytum.de"),
    "Must be a TUM email (@tum.de or @mytum.de)",
  );

const schema = z.object({
  email: tumEmail,
  name: z.string().trim().min(1, "Name is required").max(100),
  gender: z.string().min(1, "Please select"),
  status: z.string().min(1, "Please select"),
  program: z.string().min(1, "Please select"),
  programOther: z.string().trim().max(120).optional(),
  whatsapp: z
    .string()
    .trim()
    .min(5, "Please enter a valid number")
    .max(30)
    .regex(/^[+0-9 ()-]+$/, "Digits, spaces and + only"),
});

export function TalentPoolDialog({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const submit = useServerFn(submitTalentPool);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const raw = {
      email: String(fd.get("email") ?? ""),
      name: String(fd.get("name") ?? ""),
      gender: String(fd.get("gender") ?? ""),
      status: String(fd.get("status") ?? ""),
      program: String(fd.get("program") ?? ""),
      programOther: String(fd.get("programOther") ?? ""),
      whatsapp: String(fd.get("whatsapp") ?? ""),
    };

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      toast.error("Please check the form", {
        description: first?.message ?? "Some fields are invalid.",
      });
      return;
    }

    const d = parsed.data;
    const finalProgram =
      d.program === "Other / Not listed" && d.programOther
        ? d.programOther
        : d.program;

    setSubmitting(true);
    try {
      await submit({
        data: {
          email: d.email,
          name: d.name,
          gender: d.gender,
          status: d.status,
          program: finalProgram,
          whatsapp: d.whatsapp,
        },
      });
      toast.success("You're in the Talent Pool!", {
        description: "We'll be in touch when matching opportunities come up.",
      });
      form.reset();
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Could not submit", {
        description:
          err instanceof Error ? err.message : "Please try again in a moment.",
      });
    } finally {
      setSubmitting(false);
    }
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Join the Talent Pool</DialogTitle>
          <DialogDescription>
            Partner companies reach out to our Talent Pool with scholarships,
            programs, internships and opportunities for women in tech. TUM
            students &amp; alumni only.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="tp-email">TUM email</Label>
            <Input
              id="tp-email"
              name="email"
              type="email"
              placeholder="firstname.lastname@tum.de"
              required
              maxLength={255}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tp-name">Full name</Label>
            <Input id="tp-name" name="name" required maxLength={100} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="tp-gender">Gender</Label>
              <Select name="gender">
                <SelectTrigger id="tp-gender">
                  <SelectValue placeholder="— select —" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Female",
                    "Male",
                    "Non-binary",
                    "Prefer not to say",
                  ].map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="tp-status">Study status</Label>
              <Select name="status">
                <SelectTrigger id="tp-status">
                  <SelectValue placeholder="— select —" />
                </SelectTrigger>
                <SelectContent>
                  {STUDY_STATUS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tp-program">Study program</Label>
            <Select name="program">
              <SelectTrigger id="tp-program">
                <SelectValue placeholder="— select —" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Bachelor</SelectLabel>
                  {BACHELOR_PROGRAMS.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Master</SelectLabel>
                  {MASTER_PROGRAMS.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Other</SelectLabel>
                  <SelectItem value="Other / Not listed">
                    Other / Not listed
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tp-program-other">
              If &quot;Other&quot;, please specify
            </Label>
            <Input
              id="tp-program-other"
              name="programOther"
              maxLength={120}
              placeholder="Your study program"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tp-whatsapp">WhatsApp phone number</Label>
            <Input
              id="tp-whatsapp"
              name="whatsapp"
              type="tel"
              placeholder="+49 …"
              required
              maxLength={30}
            />
          </div>

          <label className="flex items-start gap-3 text-sm text-muted-foreground glass rounded-xl p-3">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-0.5 h-4 w-4 accent-primary"
            />
            <span>
              I consent to Women in CS @ TUM storing the information above
              for the purpose of sharing relevant opportunities (scholarships,
              internships, programs) from partner organizations. My data is
              kept private, never sold, and I can request deletion at any
              time by emailing{" "}
              <a className="underline" href="mailto:womenincstum@gmail.com">
                womenincstum@gmail.com
              </a>
              .
            </span>
          </label>

          <DialogFooter className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Join the Talent Pool"}
            </button>
          </DialogFooter>
          <p className="text-xs text-muted-foreground text-center">
            Your details are saved securely to our private Talent Pool sheet.
            No one outside the WinCS @ TUM team can access this data.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
