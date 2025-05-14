function add_to_work_areas() {
  var source_sheet = SpreadsheetApp.openById("YOUR_WORKAREAS_SPREADSHEET_ID");
  const working_areas = source_sheet.getSheetByName("Areas");

  const scriptProperties = PropertiesService.getScriptProperties();
  const employee = scriptProperties.getProperty("employee");
  const employee_trail = scriptProperties.getProperty("employee_trail");

  let last_row = working_areas.getLastRow();
  const working_area_range = working_areas.getRange(3, 1, last_row, 15);

  working_area_range.sort({column: 1, ascending: true});

  let free_cell = null;
  for (let row = 1; row <= last_row; row++) {
    const cell_value = working_areas.getRange(row, 1).getValue();
    if (!cell_value) {
      free_cell = row;
      break;
    }
  }

  if (!free_cell) free_cell = last_row + 1;

  working_areas.getRange(free_cell, 1).setValue(employee);
  working_areas.getRange(free_cell, 2, 1, 13).setValue("unable");
  working_areas.getRange(free_cell, 15).setValue(parseInt(employee_trail, 10));
  working_area_range.sort({column: 1, ascending: true});
  
  // Setting Variables for other Scripts
  scriptProperties.setProperty("free_cell", free_cell);



}
