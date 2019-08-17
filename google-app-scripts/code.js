var EMAIL_TEMPLATES = {
  flood_2019_kerala: "flood_2019_kerala",
  common: "common",
  special_case: "special_case"
};

function test() {
  var folders = DriveApp.getFoldersByName("DonationReciepts");
}

function getNameAndId() {
  // var folders = DriveApp.getFoldersByName("trip");
  // alert(folders);
  // https://drive.google.com/drive/folders/11MC4ycYdeBwHNKtHKPtDKM0z_R5RYmTj?usp=sharing
  // https://drive.google.com/drive/folders/1z8Ms_whdzNj-46QYGvhal2P0YSvpTkoF?usp=sharing
  var folderId = getInputFromUser(
    "Folder ID",
    "Click on share on folder and get folder ID",
    "Invalid ID",
    "You are exiting, Cool!"
  );
  var folder = DriveApp.getFolderById(folderId);
  var contents = folder.getFiles();
  var file;
  var data = {};
  while (contents.hasNext()) {
    var file = contents.next();
    data[file.getName()] = file.getId();
  }
  return data;
}

function onOpen(e) {
  SpreadsheetApp.getUi()
    .createMenu("Involve")
    .addItem("Send Email", "sendEmailByTemplate")
    .addToUi();
}

function sendEmailByTemplate() {
  var ui = SpreadsheetApp.getUi();
  var response = ui.alert(
    "Confirm",
    "Are you sure you want to continue with sending bulk emails for selected template?",
    ui.ButtonSet.YES_NO
  );
  //bulkEmailTemplate
  if (response == ui.Button.YES) {
    sendBulkEmail();
  } else {
    showMessage("Cancelled bulk donation email test action.");
  }
}

function sendBulkEmail() {
  getDataAndSendEmail();
}

function showMessage(message) {
  SpreadsheetApp.getUi().alert(message || "Empty message!");
}

function getInputFromUser(title, helper, noMessage, closeMessage) {
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt(title, helper, ui.ButtonSet.YES_NO);

  // Process the user's response.
  if (response.getSelectedButton() == ui.Button.YES) {
    return response.getResponseText();
  } else if (response.getSelectedButton() == ui.Button.NO) {
    showMessage(noMessage);
    return 0;
  } else {
    showMessage(closeMessage);
    return 0;
  }
}

function getTotalNumberOfRows() {
  return getInputFromUser(
    "Total number of donation",
    "Enter the number of rows to process from the starting row?",
    "Invalid Value",
    "You are exiting, Cool!"
  );
}

function getStartingRow() {
  return getInputFromUser(
    "Starting row of sheet",
    "Enter the row number from which need to check to send email",
    "Invalid Value",
    "You are exiting, Cool!"
  );
}

function sendMail(mailId, subject, message, extra) {
  if (mailId && subject && message) {
    MailApp.sendEmail(mailId, subject, message, extra || {});
  } else {
    showMessage("Invalid data for sending email");
  }
}

function sendFlood2019KeralaEmail(row, emailGoneOut, data) {
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
    var emailAddress = row[1];
    var html = HtmlService.createHtmlOutputFromFile(
      EMAIL_TEMPLATES[row[4]]
    ).getBlob();
    var htmlString = html.getDataAsString();
    htmlString = htmlString.replace("${name}", row[2]);
    htmlString = htmlString.replace("${amount}", row[5]);
    // https://drive.google.com/file/d/1QdxqJCYVP8Cqr8x-cptZlSLZg2hjsEnV/view?usp=sharing
    // check if attachment is there
    var attachmentsFromSheet = [];
    if (row[0] && data[row[0] + ".jpg"]) {
      var file = DriveApp.getFileById(data[row[0] + ".jpg"]);
      attachmentsFromSheet = [file.getAs(MimeType.JPEG)];
      htmlString = htmlString.replace(
        "${attachmentText}",
        "<p>" + row[10] + "</p>"
      );
    } else {
      htmlString = htmlString.replace("${attachmentText}", "");
    }
    sendMail(
      emailAddress,
      row[7] || "Involve 2019 Kerala flood acknowledgement",
      row[8] || "Flood donation email",
      {
        htmlBody: htmlString,
        name: "Involve Vatakara",
        cc: row[6],
        attachments: attachmentsFromSheet
      }
    );
    emailGoneOut.push(emailAddress);
  }
}

function getSheetData() {
  var sheet = SpreadsheetApp.getActiveSheet();
  //  startingRow, startingColumn, numberOfRows, numberOfColumn
  var startingRow = getStartingRow(),
    numberOfRows = getTotalNumberOfRows();
  var dataRange = sheet.getRange(
    startingRow < 2 ? 2 : startingRow,
    1,
    numberOfRows,
    11
  );
  return dataRange.getValues();
}

function getDataAndSendEmail() {
  var data = getSheetData();
  var emailGoneOut = [];
  var nameData = getNameAndId();
  for (i in data) {
    var row = data[i];
    switch (EMAIL_TEMPLATES[row[4]]) {
      case "flood_2019_kerala":
        sendFlood2019KeralaEmail(row, emailGoneOut, nameData);
        break;
      case "common":
        showMessage("common email template work in progress");
        break;
      case "special_case":
        showMessage("special_case email template work in progress");
        break;
      default:
        showMessage("New email template found: " + row[4]);
    }
  }
  showMessage(
    "Successfully send " +
      emailGoneOut.length +
      "email(s). Email IDs:  " +
      emailGoneOut.join(" , ")
  );
}
