function delete_from_holidays() {

  const analysis_spreadsheet = SpreadsheetApp.openById("15zWq6frkb-ghUprdpDoKsAjmvpCkRv3rQKngO4jPrH4");
  const holidays_sheet = analysis_spreadsheet.getSheetByName("Holidays");

  const scriptProperties = PropertiesService.getScriptProperties();
  const employee = scriptProperties.getProperty("employee");

  const row_a = holidays_sheet.getRange(2, 1, holidays_sheet.getLastRow() - 1, 1).getValues().flat();
  const row_index = row_a.indexOf(employee) + 2; 

  if (row_index === 1) {
    SpreadsheetApp.getUi().alert("Employee not found.");
    return;
  }

  holidays_sheet.getRange(row_index, 1).setValue("");
  holidays_sheet.getRange(row_index, 3, 1, 27).clearContent(); 
  holidays_sheet.getRange("A2:Z1000").sort({ column: 1, ascending: true }); 
}
