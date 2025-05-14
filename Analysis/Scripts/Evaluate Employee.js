function employee_evaluation() {
  const spreadsheet = SpreadsheetApp.openById("YOUR_ANALYSIS_SPREADSHEET_ID");
  const evaluation_sheet = spreadsheet .getSheetByName("Evaluation Employee");
  const data_sheet = spreadsheet .getSheetByName("Data");

  const employee = evaluation_sheet.getRange("A2").getValue();
  evaluation_sheet.getRange("D2").setValue(employee);

  const employee_liste = data_sheet.getRange("A2:A1000").getValues().flat();
  const row_index = employee_liste.indexOf(employee);

  const areas = data_sheet.getRange(row_index + 2, 2, 1, 14).getValues()[0];
  evaluation_sheet.getRange("E2:R2").setValues([areas]);
  evaluation_sheet.getRange("D4:R4").setValue("Evaluation of: " + employee);
}
