/**
 * Google Apps Script for Women in CS @ TUM Email Verification
 *
 * This script is deployed as a Web App to verify TUM student affiliations
 * before sharing private community links (e.g., WhatsApp).
 *
 * Requirements in Google Sheets:
 * 1. Sheet tab named "Codes" with headers: [Email, Code, Timestamp]
 * 2. Sheet tab named "Log" with headers: [Email, Timestamp]
 * 3. Sheet tab named "Config" with headers: [Key, Value]
 */

function doGet(e) {
  var action = e.parameter.action;
  var email  = e.parameter.email;
  var code   = e.parameter.code;
  var result;

  if (action === "sendCode") {
    result = sendVerificationCode(email);
  } else if (action === "verifyCode") {
    result = verifyCode(email, code);
  } else {
    result = { success: false, message: "Unknown action." };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendVerificationCode(email) {
  if (!email) {
    return { success: false, message: "Email is required." };
  }

  var normalized = email.toString().trim().toLowerCase();

  // Accept @tum.de and @mytum.de
  if (!normalized.endsWith("@tum.de") && !normalized.endsWith("@mytum.de")) {
    return { success: false, message: "Please use your official TUM email address (@tum.de or @mytum.de)." };
  }

  // Generate 6-digit random code
  var code = Math.floor(100000 + Math.random() * 900000).toString();

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Codes");
  if (!sheet) {
    sheet = ss.insertSheet("Codes");
    sheet.appendRow(["Email", "Code", "Timestamp"]);
  }

  var nextRow = sheet.getLastRow() + 1;
  sheet.getRange(nextRow, 1).setValue(normalized);
  sheet.getRange(nextRow, 2).setNumberFormat("@").setValue(code);
  sheet.getRange(nextRow, 3).setValue(new Date());

  var plainText = [
    "Women in Computer Science @ TUM",
    "----------------------------------------",
    "Your verification code is: " + code,
    "",
    "This code is valid for 10 minutes.",
    "",
    "This is an automated email sent to verify your TUM student status.",
    "If you did not request this code, you can safely ignore this message.",
    "",
    "Women in CS @ TUM e.V.",
    "Official Website: https://womenincstum.github.io/",
    "Contact: womenincstum@gmail.com"
  ].join("\n");

  var htmlTemplate = [
    '<!DOCTYPE html>',
    '<html>',
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '</head>',
    '<body style="margin: 0; padding: 24px 12px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">',
    '  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">',
    '    <!-- Brand Banner -->',
    '    <tr>',
    '      <td bgcolor="#1e1b4b" style="padding: 32px 32px 24px 32px; background-color: #1e1b4b; background-image: linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%); text-align: center;">',
    '        <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.01em;">',
    '          Women in Computer Science <span style="color: #f472b6;">@ TUM</span>',
    '        </h1>',
    '        <p style="margin: 6px 0 0 0; font-size: 13px; color: #c7d2fe; letter-spacing: 0.05em; text-transform: uppercase;">',
    '          TUM Community Verification',
    '        </p>',
    '      </td>',
    '    </tr>',
    '    <!-- Body Content -->',
    '    <tr>',
    '      <td bgcolor="#ffffff" style="padding: 32px 32px 24px 32px; background-color: #ffffff;">',
    '        <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.5; color: #334155;">',
    '          Hello,',
    '        </p>',
    '        <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.5; color: #334155;">',
    '          You requested access to join the <strong>Women in CS @ TUM WhatsApp Community</strong>. Use the 6-digit verification code below to complete your authentication:',
    '        </p>',
    '        <!-- Code Box -->',
    '        <div style="background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0;">',
    '          <span style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 34px; font-weight: 700; letter-spacing: 8px; color: #0f172a; display: inline-block; padding-left: 8px;">',
    '            ' + code,
    '          </span>',
    '          <p style="margin: 8px 0 0 0; font-size: 12px; color: #64748b; font-weight: 500;">',
    '            ⏱ Valid for 10 minutes',
    '          </p>',
    '        </div>',
    '        <p style="margin: 24px 0 0 0; font-size: 13px; line-height: 1.5; color: #64748b;">',
    '          If you did not request this verification code, you can safely ignore this email. No action is needed.',
    '        </p>',
    '      </td>',
    '    </tr>',
    '    <!-- Footer -->',
    '    <tr>',
    '      <td bgcolor="#ffffff" style="padding: 24px 32px; text-align: center; background-color: #ffffff;">',
    '        <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; color: #475569;">',
    '          Women in CS @ TUM e.V.',
    '        </p>',
    '        <p style="margin: 0; font-size: 11px; color: #94a3b8;">',
    '          Technical University of Munich • <a href="https://womenincstum.github.io/" style="color: #64748b; text-decoration: underline;">womenincstum.github.io</a>',
    '        </p>',
    '      </td>',
    '    </tr>',
    '  </table>',
    '</body>',
    '</html>'
  ].join('');

  try {
    MailApp.sendEmail({
      to: normalized,
      subject: "Your Women in CS @ TUM Verification Code: " + code,
      name: "Women in CS @ TUM",
      body: plainText,
      htmlBody: htmlTemplate,
      noReply: true
    });
  } catch (err) {
    return { success: false, message: "Failed to send email: " + err.toString() };
  }

  return { success: true };
}

function verifyCode(email, userCode) {
  if (!email || !userCode) {
    return { success: false, message: "Email and code are required." };
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Codes");
  if (!sheet) {
    return { success: false, message: "Verification table not initialized." };
  }

  var data  = sheet.getDataRange().getValues();
  var now   = new Date();
  var tenMinutes = 10 * 60 * 1000;

  var incomingEmail = email.toString().trim().toLowerCase();
  var incomingCode  = userCode.toString().trim();

  // Scan backwards from newest entry
  for (var i = data.length - 1; i >= 0; i--) {
    var rowEmail     = data[i][0].toString().trim().toLowerCase();
    var rowCode      = data[i][1].toString().trim();
    var rowTimestamp = new Date(data[i][2]);

    // Skip header row if present
    if (rowEmail === "email" || rowCode === "code") continue;

    if (rowEmail === incomingEmail && rowCode === incomingCode) {
      if (now.getTime() - rowTimestamp.getTime() > tenMinutes) {
        return { success: false, message: "Code has expired. Please request a new one." };
      }

      var logSheet = ss.getSheetByName("Log");
      if (!logSheet) {
        logSheet = ss.insertSheet("Log");
        logSheet.appendRow(["Email", "Timestamp"]);
      }
      logSheet.appendRow([incomingEmail, new Date()]);

      // Read dynamic WhatsApp invite URL from "Config" sheet tab
      var whatsappUrl = getCommunityInviteUrl(ss);

      return {
        success: true,
        whatsappUrl: whatsappUrl
      };
    }
  }

  return { success: false, message: "Invalid code. Please try again." };
}

/**
 * Reads the active WhatsApp invite URL from the "Config" sheet tab.
 * If the sheet tab does not exist, it creates it with empty template rows.
 */
function getCommunityInviteUrl(ss) {
  try {
    var configSheet = ss.getSheetByName("Config");
    if (!configSheet) {
      return "";
    }

    var data = configSheet.getDataRange().getValues();
    for (var i = 0; i < data.length; i++) {
      var key = data[i][0] ? data[i][0].toString().trim().toLowerCase() : "";
      if (key === "whatsappurl" || key === "whatsapp_url" || key === "whatsapp") {
        var val = data[i][1] ? data[i][1].toString().trim() : "";
        if (val && val.indexOf("chat.whatsapp.com") !== -1) {
          return val;
        }
      }
    }
  } catch (err) {
    Logger.log("Error reading Config sheet: " + err);
  }
  return "";
}
