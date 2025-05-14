function evaluate_employees() {

  const spreadsheet = SpreadsheetApp.openById("15zWq6frkb-ghUprdpDoKsAjmvpCkRv3rQKngO4jPrH4");
  const analysis_sheet = spreadsheet.getSheetByName("Analysis");
  const data_sheet = spreadsheet.getSheetByName("Data");

  const analysisConfigs = [
    { range: analysis_sheet.getRange("B3:I16"), adjustRow: true },
    { range: analysis_sheet.getRange("B22:I33"), adjustRow: false }
  ];

  const data_start_row = 2;
  const data_values = data_sheet.getDataRange().getValues();

  for (let config of analysisConfigs) {
    const values = config.range.getValues();
    const range_row_offset = config.range.getRow();
    for (let r = 0; r < values.length; r++) {
      for (let c = 0; c < values[0].length; c++) {
        const employee = values[r][c];
        if (employee === "") continue;

        const actual_row = range_row_offset + r;
        const area_row = config.adjustRow && actual_row % 2 === 0 ? actual_row - 1 : actual_row;
        const area = analysis_sheet.getRange(area_row, 1).getValue();

        let employee_row = -1;
        for (let i = data_start_row - 1; i < data_values.length; i++) {
          if (data_values[i][0] === employee) {
            employee_row = i + 1;
            break;
          }
        }
        if (employee_row === -1) continue;

        let area_column = -1;
        const header = data_values[0];
        for (let j = 1; j <= 13; j++) {
          if (header[j] === area) {
            area_column = j + 1;
            break;
          }
        }
        if (area_column === -1) continue;

        const cell = data_sheet.getRange(employee_row, area_column);
        const current_value = cell.getValue() || 0;
        cell.setValue(current_value + 1);
      }
    }
  }

  for (let i = data_start_row - 1; i < data_values.length; i++) {
    const name = data_values[i][0];
    if (!name) break;

    const row_values = data_values[i].slice(1, 14); 
    const numbers = row_values.filter(val => typeof val === 'number' && !isNaN(val));
    const avg = numbers.length > 0 ? numbers.reduce((a, b) => a + b, 0) / numbers.length : "";
    data_sheet.getRange(i + 1, 15).setValue(avg); 
  }


  analysis_sheet.getRange("B3:I19").clearContent();
  analysis_sheet.getRange("B22:I33").clearContent();

  
  
}
