export const COMMUNITY_CONFIG = {
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

export function getVerifiedWhatsappUrl(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(COMMUNITY_CONFIG.storageKey);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    const url = parsed?.whatsappUrl;
    return typeof url === "string" && url.startsWith("https://chat.whatsapp.com/") ? url : null;
  } catch {
    return null;
  }
}

export function setTumVerified(email: string, whatsappUrl?: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      COMMUNITY_CONFIG.storageKey,
      JSON.stringify({
        verified: true,
        email,
        whatsappUrl: whatsappUrl || "",
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

  // Test bypass ONLY in local development (Vite completely strips this block during production build)
  if (import.meta.env.DEV) {
    if (
      normalizedEmail === "test@tum.de" ||
      normalizedEmail.endsWith("@test.tum.de")
    ) {
      return {
        success: true,
        message: "Test mode: Use verification code 123456",
      };
    }
  }

  if (
    !normalizedEmail.endsWith("@tum.de") &&
    !normalizedEmail.endsWith("@mytum.de")
  ) {
    return {
      success: false,
      message:
        "Please enter an official TUM email address ending with @tum.de or @mytum.de.",
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const url = `${COMMUNITY_CONFIG.scriptUrl}?action=sendCode&email=${encodeURIComponent(normalizedEmail)}`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      return {
        success: false,
        message: `Verification service returned error (${res.status}). Please try again later.`,
      };
    }
    const data = await res.json();
    return data;
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    console.error("Failed to send verification code", err);
    const isTimeout = err instanceof Error && err.name === "AbortError";
    return {
      success: false,
      message: isTimeout
        ? "Verification service timed out. The Google Apps Script backend has not been deployed/authorized yet in Google Drive."
        : "Network error connecting to verification service. Please try again.",
    };
  }
}

export async function verifyAccessCode(
  email: string,
  code: string,
): Promise<{ success: boolean; message?: string; whatsappUrl?: string }> {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedCode = code.trim();

  // Test bypass ONLY in local development (Vite completely strips this block during production build)
  if (import.meta.env.DEV) {
    if (
      (normalizedEmail === "test@tum.de" ||
        normalizedEmail.endsWith("@test.tum.de")) &&
      normalizedCode === "123456"
    ) {
      const devMockUrl = "https://chat.whatsapp.com/DEV_TEST_COMMUNITY";
      setTumVerified(normalizedEmail, devMockUrl);
      return { success: true, whatsappUrl: devMockUrl };
    }
  }

  if (!normalizedEmail || !normalizedCode) {
    return { success: false, message: "Email and code are required." };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const url = `${COMMUNITY_CONFIG.scriptUrl}?action=verifyCode&email=${encodeURIComponent(normalizedEmail)}&code=${encodeURIComponent(normalizedCode)}`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      return {
        success: false,
        message: `Verification service returned error (${res.status}). Please try again later.`,
      };
    }
    const data = await res.json();
    if (data.success) {
      setTumVerified(normalizedEmail, data.whatsappUrl);
    }
    return data;
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    console.error("Failed to verify access code", err);
    const isTimeout = err instanceof Error && err.name === "AbortError";
    return {
      success: false,
      message: isTimeout
        ? "Verification service timed out. Please try again."
        : "Network error connecting to verification service. Please try again.",
    };
  }
}
