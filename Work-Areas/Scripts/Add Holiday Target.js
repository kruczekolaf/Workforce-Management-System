function add_holiday_target() {

  const analysis_spreadsheet = SpreadsheetApp.openById("YOUR_ANALYSIS_SPREADSHEET_ID");
  const holidays_sheet = analysis_spreadsheet.getSheetByName("Holidays");

  const scriptProperties = PropertiesService.getScriptProperties();
  const employee = scriptProperties.getProperty("employee");

  const today = new Date(); // Aktuelles Datum
  const year_start = new Date(today.getFullYear(), 0, 1); 
  const days = Math.floor((today - year_start) / (1000 * 60 * 60 * 24)) + 1; 

  let holidays_target;

  if (days >= 0 && days <= 91) {
    holidays_target = 4;
  } else if (days >= 92 && days <= 182) {
    holidays_target = 3;
  } else if (days >= 183 && days <= 274) {
    holidays_target = 2;
  } else if (days >= 275 && days <= 365) {
    holidays_target = 1;
  } else {
    console.error("Invalid value for 'days'.");
  }

  holidays_sheet.getRange("A2:Z1000").sort({ column: 1, ascending: true });

  let empty_row = null;

  for (let row = 2; row <= holidays_sheet.getLastRow(); row++) {
    const cell_value = holidays_sheet.getRange(row, 1).getValue();
    if (!cell_value) {
      empty_row = row;
      break;
    }
  }

  if (!empty_row) empty_row = holidays_sheet.getLastRow() + 1;

  holidays_sheet.getRange(empty_row, 1).setValue(employee);
  holidays_sheet.getRange(empty_row, 3).setValue(holidays_target);
  holidays_sheet.getRange("A2:Z1000").sort({ column: 1, ascending: true });  
}
