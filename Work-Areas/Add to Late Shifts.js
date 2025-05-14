function add_to_late_shifts() {

  const late_shifts_spreadsheet = SpreadsheetApp.openById("1QOCfPM3WSUStDEt8qlLdVzG2cTUVEynzMnDYNDIzwvI");
  const late_shifts_sheet = late_shifts_spreadsheet.getSheetByName("Late Shifts Year");

  const scriptProperties = PropertiesService.getScriptProperties();
  const employee = scriptProperties.getProperty("employee");

  late_shifts_sheet.getRange("A3:B1000").sort({ column: 1, ascending: true });

  let empty_row = null;
  for (let row = 2; row <= late_shifts_sheet.getLastRow(); row++) {
    const cell_value = late_shifts_sheet.getRange(row, 1).getValue();
    if (!cell_value) {
      empty_row = row;
      break;
    }
  }

  if (!empty_row) empty_row = late_shifts_sheet.getLastRow(); + 1;

  late_shifts_sheet.getRange(empty_row, 1).setValue(employee);
  late_shifts_sheet.getRange(empty_row, 2).setValue(0);
  late_shifts_sheet.getRange("A3:B1000").sort({ column: 1, ascending: true });
}
