export const COMMUNITY_CONFIG = {
  whatsappUrl: "https://chat.whatsapp.com/BSPhLQLsJYWExZ7VeNWOb6",
  scriptUrl:
    "https://script.google.com/macros/s/AKfycbwUHrir0OPa6X10oy6q4wsds_tT2_iIUpuZsMGPgQs6v3GWm8AJYM482G7AF4vTeEn7/exec",
  storageKey: "wincs_tum_verified",
};

export function isTumVerified(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const stored = localStorage.getItem(COMMUNITY_CONFIG.storageKey);
    if (!stored) return false;
    const parsed = JSON.parse(stored);
    return Boolean(parsed?.verified);
  } catch {
    return false;
  }
}

export function getVerifiedEmail(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(COMMUNITY_CONFIG.storageKey);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return parsed?.email ?? null;
  } catch {
    return null;
  }
}

export function setTumVerified(email: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      COMMUNITY_CONFIG.storageKey,
      JSON.stringify({
        verified: true,
        email,
        verifiedAt: new Date().toISOString(),
      }),
    );
  } catch (err) {
    console.error("Failed to persist TUM verification state", err);
  }
}

export function clearTumVerified(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(COMMUNITY_CONFIG.storageKey);
  } catch (err) {
    console.error("Failed to clear TUM verification state", err);
  }
}

export async function requestVerificationCode(
  email: string,
): Promise<{ success: boolean; message?: string }> {
  const normalizedEmail = email.trim().toLowerCase();

  // Test bypass for local development & demonstration
  if (
    normalizedEmail === "test@tum.de" ||
    (import.meta.env.DEV && normalizedEmail.endsWith("@test.tum.de"))
  ) {
    return {
      success: true,
      message: "Test mode: Use verification code 123456",
    };
  }

  if (!normalizedEmail.endsWith("@tum.de")) {
    if (normalizedEmail.endsWith("@mytum.de")) {
      return {
        success: false,
        message:
          "Please use your primary @tum.de email address (e.g. name@tum.de) to receive the code.",
      };
    }
    return {
      success: false,
      message: "Please enter a valid TUM email address ending with @tum.de.",
    };
  }

  try {
    const url = `${COMMUNITY_CONFIG.scriptUrl}?action=sendCode&email=${encodeURIComponent(normalizedEmail)}`;
    const res = await fetch(url);
    if (!res.ok) {
      return {
        success: false,
        message: `Verification service returned error (${res.status}). Please try again.`,
      };
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to send verification code", err);
    return {
      success: false,
      message: "Network error connecting to verification service. Please try again.",
    };
  }
}

export async function verifyAccessCode(
  email: string,
  code: string,
): Promise<{ success: boolean; message?: string }> {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedCode = code.trim();

  // Test bypass for local development & demonstration
  if (
    (normalizedEmail === "test@tum.de" ||
      (import.meta.env.DEV && normalizedEmail.endsWith("@test.tum.de"))) &&
    normalizedCode === "123456"
  ) {
    setTumVerified(normalizedEmail);
    return { success: true };
  }

  if (!normalizedEmail || !normalizedCode) {
    return { success: false, message: "Email and code are required." };
  }

  try {
    const url = `${COMMUNITY_CONFIG.scriptUrl}?action=verifyCode&email=${encodeURIComponent(normalizedEmail)}&code=${encodeURIComponent(normalizedCode)}`;
    const res = await fetch(url);
    if (!res.ok) {
      return {
        success: false,
        message: `Verification service returned error (${res.status}). Please try again.`,
      };
    }
    const data = await res.json();
    if (data.success) {
      setTumVerified(normalizedEmail);
    }
    return data;
  } catch (err) {
    console.error("Failed to verify access code", err);
    return {
      success: false,
      message: "Network error connecting to verification service. Please try again.",
    };
  }
}
