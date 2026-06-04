import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SPREADSHEET_ID = "1KrTmAYU-ZVWu2d57diIFdvkhJoq-Xv_rtnvM00exra8";
const RANGE = "Sheet1!A:G";
const GATEWAY = "https://connector-gateway.lovable.dev/google_sheets/v4";

const tumEmail = z
  .string()
  .trim()
  .toLowerCase()
  .max(255)
  .email()
  .refine(
    (e) => e.endsWith("@tum.de") || e.endsWith("@mytum.de"),
    "Must be a TUM email",
  );

const schema = z.object({
  email: tumEmail,
  name: z.string().trim().min(1).max(100),
  gender: z.string().trim().min(1).max(40),
  status: z.string().trim().min(1).max(60),
  program: z.string().trim().min(1).max(200),
  whatsapp: z
    .string()
    .trim()
    .min(5)
    .max(30)
    .regex(/^[+0-9 ()-]+$/),
});

export const submitTalentPool = createServerFn({ method: "POST" })
  .inputValidator((input) => schema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    const sheetsKey = process.env.GOOGLE_SHEETS_API_KEY;
    if (!apiKey) throw new Error("Missing LOVABLE_API_KEY");
    if (!sheetsKey) throw new Error("Missing GOOGLE_SHEETS_API_KEY");

    const row = [
      new Date().toISOString(),
      data.name,
      data.email,
      data.gender,
      data.status,
      data.program,
      data.whatsapp,
    ];

    const res = await fetch(
      `${GATEWAY}/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "X-Connection-Api-Key": sheetsKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values: [row] }),
      },
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Sheets append failed", res.status, text);
      throw new Error(`Failed to save sign-up (${res.status})`);
    }

    return { success: true };
  });
