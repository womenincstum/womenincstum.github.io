# TUM Email Verification Service (Google Apps Script)

This directory contains the Google Apps Script backend used by the Women in CS @ TUM website to verify TUM student affiliations before revealing private community invite links (such as WhatsApp).

## How It Works

1. **Email Submission (`action=sendCode`)**:
   - The user inputs their official TUM email address (`@tum.de` or `@mytum.de`).
   - The script verifies the domain, generates a secure 6-digit random code, saves it to the `Codes` tab in Google Sheets with a timestamp, and sends a branded HTML email to the user's TUM inbox.
2. **Code Verification (`action=verifyCode`)**:
   - The user enters the 6-digit code received in their email.
   - The script checks if the code matches and was issued within the last 10 minutes.
   - If verified, it records a success log in the `Log` tab and returns `{ success: true }`.
   - The frontend unlocks the WhatsApp community link and saves the authenticated status in `localStorage` for a frictionless session.

## Updating the Deployed Google Apps Script

To update the live script with the new HTML email template and no-reply format:

1. Open the Google Spreadsheet in your club Google Drive (`womenincstum@gmail.com`).
2. Go to **Extensions > Apps Script**.
3. Paste the updated code from [Code.gs](file:///c:/Users/akorzhyl/Studium/Women%20in%20CS/womenincstum.github.io/google-apps-script/Code.gs) into the editor.
4. Click **Deploy > Manage Deployments**.
5. Select the active Web App deployment, click the **Edit** (pencil) icon:
   - Change **Version** to: **New Version**
   - Click **Deploy**.
6. The existing URL remains unchanged, and all new verification emails will immediately use the updated HTML template!

## How Sender Email Addresses Work in Google Apps Script

* **Default behavior**: The script runs under the Google Account hosting the sheet (`womenincstum@gmail.com`), so emails originate from `womenincstum@gmail.com`.
* **Sender Name & No-Reply**: The updated script sets `name: "Women in CS @ TUM (No-Reply)"` and `noReply: true`.
* **Using an official `@tum.de` address**:
  If the club possesses an official TUM functional mailbox (e.g., `wincs@tum.de`):
  1. In the `womenincstum@gmail.com` account, go to **Settings > Accounts and Import > Send mail as**.
  2. Add `wincs@tum.de` as an alias using TUM's SMTP server (`postweb.lrz.de` / `mail.tum.de`).
  3. Once confirmed, you can update `sendEmail` in `Code.gs` to send using the alias.
