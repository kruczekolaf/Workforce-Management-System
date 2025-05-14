function target_holidays() {

  const spreadsheet = SpreadsheetApp.openById("YOUR_ANALYSIS_SPREADSHEET_ID");
  const holidays_sheet = spreadsheet.getSheetByName("Holidays");

  let empty_row = null; 
  
  for (let row = 2; row <= holidays_sheet.getLastRow(); row++) {
    const cell_value = holidays_sheet.getRange(row, 3).getValue();
    if (!cell_value) { 
      empty_row = row; 
      break;
    }
  }

  if (!empty_row) empty_row = holidays_sheet.getLastRow() + 1;

  const row_count = empty_row - 2; 
  if (row_count > 0) {
    const range = holidays_sheet.getRange(2, 3, row_count, 1);
    const values = Array(row_count).fill([4]); 
    range.setValues(values);
  } else {
    console.log("Keine Zellen zu aktualisieren.");
  }
}
