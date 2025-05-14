function automatic_sort() {

  const spreadsheet = SpreadsheetApp.openById("YOUR_ANALYSIS_SPREADSHEET_ID");

  const data_sheet = spreadsheet.getSheetByName("Data");
  data_sheet.getRange("A2:O1000").sort({ column: 1, ascending: true });
}
