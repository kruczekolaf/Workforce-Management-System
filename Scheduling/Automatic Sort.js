function automatic_sort() {

  const spreadsheet = SpreadsheetApp.openById("1Hw1RQdfN0TQ1NtSzwc9Qhnp0X_7sprhllYQCXEuuNxo");
  const database_sheet = spreadsheet.getSheetByName("Database");

  database_sheet.getRange("A2:N1000").sort({ column: 1, ascending: true });
}
