/**
 * Google Apps Script for Women in CS @ TUM Email Verification
 *
 * This script is deployed as a Web App to verify TUM student affiliations
 * before sharing private community links (e.g., WhatsApp).
 *
 * Requirements in Google Sheets:
 * 1. Sheet tab named "Codes" with headers: [email, code, timestamp]
 * 2. Sheet tab named "Log" with headers: [email, timestamp]
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
    return { success: false, message: "Please use your TUM email address (@tum.de or @mytum.de)." };
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

  try {
    MailApp.sendEmail({
      to: normalized,
      subject: "Your Women in CS @ TUM — Verification Code",
      body: "Hi,\n\nYour 6-digit verification code to join the Women in CS @ TUM WhatsApp community is:\n\n" +
            code + "\n\nThis code is valid for 10 minutes.\n\nBest regards,\nWomen in CS @ TUM"
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

      return { success: true };
    }
  }

  return { success: false, message: "Invalid code. Please try again." };
}
