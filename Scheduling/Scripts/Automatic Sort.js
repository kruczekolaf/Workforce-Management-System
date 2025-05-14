function automatic_sort() {

  const spreadsheet = SpreadsheetApp.openById("YOUR_SCHEDULING_SPREADSHEET_ID");
  const database_sheet = spreadsheet.getSheetByName("Database");

  database_sheet.getRange("A2:N1000").sort({ column: 1, ascending: true });
}
