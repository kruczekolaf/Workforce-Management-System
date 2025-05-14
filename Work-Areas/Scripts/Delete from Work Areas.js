function delete_from_working_areas() {
  const working_areas_spreadsheet = SpreadsheetApp.openById("YOUR_WORKAREAS_SPREADSHEET_ID");
  const working_areas_sheet = working_areas_spreadsheet.getSheetByName("Areas");

  const scriptProperties = PropertiesService.getScriptProperties();
  const employee = scriptProperties.getProperty("employee");

  const working_area_range = working_areas_sheet.getRange(3, 1, working_areas_sheet.getLastRow(), 15);

  const find_employee = working_areas_sheet.getRange(3, 1, working_areas_sheet.getLastRow(), 1).getValues().flat();
  const employee_index = find_employee.indexOf(employee) + 3;

  if(employee_index >= 3){
    working_areas_sheet.getRange(employee_index, 1, 1, 15).clearContent();
    working_area_range.sort({column: 1, ascending: true});
  }
}
