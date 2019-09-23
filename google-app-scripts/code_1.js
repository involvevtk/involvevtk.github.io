function onOpen(e) {
  SpreadsheetApp.getUi()
    .createMenu("Involve")
    .addItem("Send email", "send")
    .addToUi();
}

function showMessage(message) {
  SpreadsheetApp.getUi().alert(message || "Empty message!");
}

function getSheetData() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var dataRange = sheet.getRange(2, 1, 50, 9);
  return dataRange.getValues();
}

function sendMail(mailId, subject, message, extra) {
  if (mailId && subject && message) {
    MailApp.sendEmail(mailId, subject, message, extra || {});
  } else {
    showMessage("Invalid data for sending email");
  }
}

function send() {
  var data = getSheetData();
  for (i in data) {
    var row = data[i];
    sendEmail(row);
  }
  showMessage("Success!");
}

function sendEmail(row) {
  if (
    row[0] &&
    row[1] &&
    row[2] &&
    row[3] &&
    row[4] &&
    row[5] &&
    row[6] &&
    row[7] &&
    row[8]
  ) {
    var emailAddress = row[0];
    var html = HtmlService.createHtmlOutputFromFile(
      "monthly_subscription"
    ).getBlob();
    var htmlString = html.getDataAsString();
    htmlString = htmlString.replace("${name}", row[1]);
    htmlString = htmlString.replace("${amount_received}", row[2]);
    htmlString = htmlString.replace("${amount_received_on}", row[3]);
    htmlString = htmlString.replace("${due}", row[4]);
    htmlString = htmlString.replace("${due_clearance}", row[5]);
    htmlString = htmlString.replace("${subscription_fee}", row[6]);
    htmlString = htmlString.replace("${addition_contribution}", row[7]);
    htmlString = htmlString.replace("${pending_due}", row[8]);
    sendMail(
      emailAddress,
      "Involve monthly acknowledgement current month",
      "Involve monthly acknowledgement current month",
      {
        htmlBody: htmlString,
        name: "Involve Vatakara"
      }
    );
  }
}
