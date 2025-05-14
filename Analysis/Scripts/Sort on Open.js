function automatic_sort() {

  const spreadsheet = SpreadsheetApp.openById("15zWq6frkb-ghUprdpDoKsAjmvpCkRv3rQKngO4jPrH4");

  const data_sheet = spreadsheet.getSheetByName("Data");
  data_sheet.getRange("A2:O1000").sort({ column: 1, ascending: true });
}
