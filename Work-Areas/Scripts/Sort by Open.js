function automatic_sort() {

  const source_sheet = SpreadsheetApp.openById("YOUR_WORKAREAS_SPREADSHEET_ID");
  const areas_sheet = source_sheet.getSheetByName("Areas");

  areas_sheet.getRange("A3:N1000").sort({column: 1, ascending: true});
}
