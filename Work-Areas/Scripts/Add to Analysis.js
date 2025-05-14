function add_to_analysis() {

  const analysis_spreadsheet = SpreadsheetApp.openById("YOUR_ANALYSIS_SPREADSHEET_ID");
  const data_sheet = analysis_spreadsheet.getSheetByName("Data");

  const scriptProperties = PropertiesService.getScriptProperties();
  const employee = scriptProperties.getProperty("employee");


  data_sheet.getRange("A2:N1000").sort({ column: 1, ascending: true });

  let empty_row = null;
  for (let row = 2; row <= data_sheet.getLastRow(); row++) {
    const cell_value = data_sheet.getRange(row, 1).getValue();
    if (!cell_value) {
      empty_row = row;
      break;
    }
  }

  if (!empty_row) empty_row = data_sheet.getLastRow() + 1;

  data_sheet.getRange(empty_row, 1).setValue(employee);
  data_sheet.getRange(empty_row, 2, 1, 13).setValue(0);
  data_sheet.getRange(empty_row, 15).setValue(0);
  data_sheet.getRange("A2:O1000").sort({ column: 1, ascending: true });
}
