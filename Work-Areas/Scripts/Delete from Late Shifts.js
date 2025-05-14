function delete_from_late_shifts() {

  const late_shifts_Spreadsheet = SpreadsheetApp.openById("YOUR_LATESHIFTS_SPREADSHEET_ID");
  const late_shifts_sheet = late_shifts_Spreadsheet.getSheetByName("Late Shifts Year");

  const scriptProperties = PropertiesService.getScriptProperties();
  const employee = scriptProperties.getProperty("employee");

  const column_a = late_shifts_sheet.getRange(2, 1, late_shifts_sheet.getLastRow() - 1, 1).getValues().flat();
  const row_index = column_a.indexOf(employee) + 2; 

  if (row_index === 1) {
    SpreadsheetApp.getUi().alert("Employee not found.");
    return;
  }

  late_shifts_sheet.getRange(row_index, 1).setValue("");
  late_shifts_sheet.getRange(row_index, 2).setValue("");
  late_shifts_sheet.getRange("A3:B1000").sort({ column: 1, ascending: true });
}
