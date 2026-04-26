function doGet(e) {
  var action = e.parameter.action;
  var email  = e.parameter.email;
  var code   = e.parameter.code;
  var result;

  if (action === "sendCode") {
    result = sendVerificationCode(email);
  } else if (action === "verifyCode") {
    result = verifyCode(
      email,
      code,
      e.parameter.name   || "",
      e.parameter.gender || "",
      e.parameter.status || "",
      e.parameter.field  || ""
    );
  } else {
    result = { success: false, message: "Unknown action." };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendVerificationCode(email) {
  if (!email || !email.endsWith("@tum.de")) {
    return { success: false, message: "Please use your TUM email address (@tum.de)." };
  }

  var code = Math.floor(100000 + Math.random() * 900000).toString();

  var sheet   = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Codes");
  var nextRow = sheet.getLastRow() + 1;
  sheet.getRange(nextRow, 1).setValue(email);
  sheet.getRange(nextRow, 2).setNumberFormat("@").setValue(code);
  sheet.getRange(nextRow, 3).setValue(new Date());

  MailApp.sendEmail({
    to: email,
    subject: "Your Women in CS @ TUM — WhatsApp Access Code",
    body: "Hi,\n\nYour verification code is: " + code + "\n\nThis code is valid for 10 minutes.\n\nWomen in CS @ TUM"
  });

  return { success: true };
}

function verifyCode(email, userCode, name, gender, status, field) {
  if (!email || !userCode) {
    return { success: false, message: "Email and code are required." };
  }

  var sheet  = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Codes");
  var data   = sheet.getDataRange().getValues();
  var now    = new Date();
  var tenMin = 10 * 60 * 1000;

  var incomingEmail = email.toString().trim().toLowerCase();
  var incomingCode  = userCode.toString().trim();

  for (var i = data.length - 1; i >= 0; i--) {
    var rowEmail     = data[i][0].toString().trim().toLowerCase();
    var rowCode      = data[i][1].toString().trim();
    var rowTimestamp = new Date(data[i][2]);

    if (rowEmail === "email" || rowCode === "code") continue;

    if (rowEmail === incomingEmail && rowCode === incomingCode) {
      if (now - rowTimestamp > tenMin) {
        return { success: false, message: "Code has expired. Please request a new one." };
      }

      // Save profile to Members sheet
      var members = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Members");
      if (!members) {
        members = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Members");
        members.appendRow(["Email", "Name", "Gender", "Study Status", "Study Program", "Joined At"]);
      }
      members.appendRow([email, name, gender, status, field, new Date()]);

      // Log verified access
      SpreadsheetApp.getActiveSpreadsheet()
        .getSheetByName("Log")
        .appendRow([email, new Date()]);

      return { success: true };
    }
  }

  return { success: false, message: "Invalid code. Please try again." };
}
