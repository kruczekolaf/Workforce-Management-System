function delete_from_analysis() {

  const analysis_spreadsheet = SpreadsheetApp.openById("15zWq6frkb-ghUprdpDoKsAjmvpCkRv3rQKngO4jPrH4");
  const data_sheet = analysis_spreadsheet.getSheetByName("Data");

  const scriptProperties = PropertiesService.getScriptProperties();
  const employee = scriptProperties.getProperty("employee");

  const row_a = data_sheet.getRange(2, 1, data_sheet.getLastRow() - 1, 1).getValues().flat();
  const row_index = row_a.indexOf(employee) + 2; 

  if (row_index === 1) {
    SpreadsheetApp.getUi().alert("Employee not found.");
    return;
  }

  data_sheet.getRange(row_index, 1).setValue("");
  data_sheet.getRange(row_index, 14).setValue("");
  data_sheet.getRange(row_index, 2, 1, 14).setValue(""); 
  data_sheet.getRange(2, 1, 1000 - 1, 15).sort({ column: 1, ascending: true }); 
}
