import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import {
  isTumVerified,
  getVerifiedEmail,
  getVerifiedWhatsappUrl,
  requestVerificationCode,
  verifyAccessCode,
  clearTumVerified,
} from "@/lib/community";
import {
  ShieldCheck,
  Mail,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Copy,
  Check,
  Loader2,
  ExternalLink,
} from "lucide-react";

interface TumAuthDialogProps {
  trigger: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function TumAuthDialog({
  trigger,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: TumAuthDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const handleOpenChange = (val: boolean) => {
    if (isControlled) {
      setControlledOpen?.(val);
    } else {
      setInternalOpen(val);
    }
  };

  const [step, setStep] = useState<"email" | "code" | "verified">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [copied, setCopied] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string>("");
  const verifyingRef = useRef(false);

  // Sync initial verification status
  useEffect(() => {
    if (isOpen) {
      const verified = isTumVerified();
      if (verified) {
        setStep("verified");
        setVerifiedEmail(getVerifiedEmail());
        setWhatsappUrl(getVerifiedWhatsappUrl() || "");
      } else {
        setStep("email");
        setCode("");
        setErrorMessage(null);
      }
    }
  }, [isOpen]);

  // Countdown timer for resending code
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const handleSendCode = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setErrorMessage("Please enter your TUM email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await requestVerificationCode(cleanEmail);
      if (res.success) {
        setStep("code");
        setResendCooldown(45);
        toast.success("Verification code sent!", {
          description: "Check your TUM inbox (and spam folder) for the 6-digit code.",
        });
      } else {
        setErrorMessage(res.message || "Failed to send code. Please try again.");
      }
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const executeVerification = async (targetCode: string) => {
    const cleanCode = targetCode.trim();
    if (cleanCode.length !== 6) {
      setErrorMessage("Please enter the complete 6-digit verification code.");
      return;
    }

    if (verifyingRef.current || loading) return;
    verifyingRef.current = true;
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await verifyAccessCode(email, cleanCode);
      if (res.success) {
        setStep("verified");
        setVerifiedEmail(email.trim().toLowerCase());
        if (res.whatsappUrl?.startsWith("https://chat.whatsapp.com/")) {
          setWhatsappUrl(res.whatsappUrl);
        }
        toast.success("TUM affiliation verified!");
      } else {
        setErrorMessage(res.message || "Invalid or expired code. Please try again.");
      }
    } catch {
      setErrorMessage("Verification failed. Please check your connection and try again.");
    } finally {
      verifyingRef.current = false;
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    await executeVerification(code);
  };

  const handleCopyLink = async () => {
    if (!whatsappUrl) {
      toast.error("Invite link is not available yet.");
      return;
    }
    try {
      await navigator.clipboard.writeText(whatsappUrl);
      setCopied(true);
      toast.success("Invite link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Could not copy link automatically.");
    }
  };

  const handleResetVerification = () => {
    clearTumVerified();
    setStep("email");
    setEmail("");
    setCode("");
    setVerifiedEmail(null);
    setWhatsappUrl("");
    setErrorMessage(null);
    toast.info("Verification reset. You can now verify a new email.");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md p-6 bg-card/95 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl">
        <DialogHeader className="text-left space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/20">
              <ShieldCheck size={14} /> Member Access
            </span>
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight">
            {step === "verified"
              ? "Welcome to the Community!"
              : "Join our WhatsApp Community"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            {step === "verified"
              ? "Your email has been verified. Click below to join our WhatsApp community."
              : "To protect our community from spam, please verify your email address."}
          </DialogDescription>
        </DialogHeader>

        {step === "email" && (
          <form onSubmit={handleSendCode} className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tum-email" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                />
                <Input
                  id="tum-email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="pl-10 h-11 bg-background/50 border-white/10 focus-visible:ring-primary rounded-xl"
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                We'll send an automated 6-digit access code from our official club account (<span className="text-foreground font-medium">womenincstum@gmail.com</span>).
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground h-11 px-5 font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending code…
                </>
              ) : (
                <>
                  Send verification code <ArrowRight size={16} />
                </>
              )}
            </button>

            {import.meta.env.DEV && (
              <div className="mt-2 text-center text-xs text-muted-foreground/80 bg-white/5 rounded-lg py-1.5 px-2">
                💡 Local dev tip: use <span className="font-mono text-primary">test@tum.de</span> with code <span className="font-mono text-primary">123456</span>
              </div>
            )}
          </form>
        )}

        {step === "code" && (
          <form onSubmit={handleVerifyCode} className="mt-4 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="verification-code" className="text-sm font-medium">
                  Enter 6-Digit Code
                </Label>
                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setCode("");
                    setErrorMessage(null);
                  }}
                  className="text-xs text-primary hover:underline cursor-pointer"
                >
                  Change email
                </button>
              </div>

              <div className="p-2.5 rounded-xl bg-primary/5 border border-primary/10 text-xs text-muted-foreground flex items-center justify-between">
                <span className="truncate">Sent to <strong className="text-foreground">{email}</strong></span>
              </div>
              <p className="text-xs text-muted-foreground">
                Check your inbox and spam folder for an email from <strong>Women in CS @ TUM</strong>.
              </p>

              <div className="flex justify-center py-2">
                <InputOTP
                  maxLength={6}
                  value={code}
                  onChange={(val) => {
                    setCode(val);
                    if (errorMessage) setErrorMessage(null);
                    if (val.length === 6) {
                      executeVerification(val);
                    }
                  }}
                >
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot index={0} className="h-12 w-11 text-lg rounded-xl border-white/15 bg-background/50" />
                    <InputOTPSlot index={1} className="h-12 w-11 text-lg rounded-xl border-white/15 bg-background/50" />
                    <InputOTPSlot index={2} className="h-12 w-11 text-lg rounded-xl border-white/15 bg-background/50" />
                    <InputOTPSlot index={3} className="h-12 w-11 text-lg rounded-xl border-white/15 bg-background/50" />
                    <InputOTPSlot index={4} className="h-12 w-11 text-lg rounded-xl border-white/15 bg-background/50" />
                    <InputOTPSlot index={5} className="h-12 w-11 text-lg rounded-xl border-white/15 bg-background/50" />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                <span>Didn't get the code?</span>
                {resendCooldown > 0 ? (
                  <span>Resend in {resendCooldown}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSendCode()}
                    disabled={loading}
                    className="text-primary hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw size={12} /> Resend code
                  </button>
                )}
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || code.trim().length !== 6}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground h-11 px-5 font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Verifying…
                </>
              ) : (
                <>
                  Verify &amp; Unlock Link <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        )}

        {step === "verified" && (
          <div className="mt-4 space-y-5">
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-start gap-3.5">
              <CheckCircle2 size={24} className="text-primary shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-foreground">Verification Successful</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {verifiedEmail
                    ? `Authenticated as ${verifiedEmail}.`
                    : "Authenticated as a verified TUM student."}
                </p>
              </div>
            </div>

            {whatsappUrl ? (
              <div className="space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground h-12 px-6 font-semibold hover:opacity-90 transition shadow-lg shadow-primary/25 text-base cursor-pointer"
                >
                  <MessageCircle size={18} /> Join WhatsApp Community <ExternalLink size={15} />
                </a>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full glass h-11 px-5 font-medium hover:border-primary/40 transition text-sm text-foreground cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={16} className="text-green-400" /> Link copied!
                    </>
                  ) : (
                    <>
                      <Copy size={16} /> Copy invite link
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs text-center space-y-2">
                <p>The invite link is not currently available in this session.</p>
                <button
                  type="button"
                  onClick={handleResetVerification}
                  className="text-primary underline font-medium cursor-pointer"
                >
                  Click here to re-verify
                </button>
              </div>
            )}

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-muted-foreground">
              <span>Verified student session</span>
              <button
                type="button"
                onClick={handleResetVerification}
                className="hover:text-primary transition underline cursor-pointer"
              >
                Log out / Switch account
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
