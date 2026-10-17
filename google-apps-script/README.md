# TUM Email Verification Service (Google Apps Script)

This directory contains the Google Apps Script backend used by the Women in CS @ TUM website to verify TUM student affiliations before revealing private community invite links (such as WhatsApp).

## How It Works

1. **Email Submission (`action=sendCode`)**:
   - The user inputs their official TUM email address (`@tum.de` or `@mytum.de`).
   - The script verifies the domain, generates a secure 6-digit random code, saves it to the `Codes` tab in Google Sheets with a timestamp, and sends it to the user's TUM inbox via `MailApp.sendEmail`.
2. **Code Verification (`action=verifyCode`)**:
   - The user enters the 6-digit code received in their email.
   - The script checks if the code matches and was issued within the last 10 minutes.
   - If verified, it records a success log in the `Log` tab and returns `{ success: true }`.
   - The frontend unlocks the WhatsApp community link and saves the authenticated status in `localStorage` for a frictionless session.

## Google Sheet Setup

1. Create a Google Spreadsheet with two tabs:
   - **`Codes`**: Columns `Email`, `Code`, `Timestamp`
   - **`Log`**: Columns `Email`, `Timestamp`
2. Open **Extensions > Apps Script** in the spreadsheet.
3. Paste the contents of `Code.gs`.
4. Click **Deploy > New Deployment**:
   - Type: **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the generated Web App URL and update `scriptUrl` in `src/lib/community.ts` if creating a new deployment.
