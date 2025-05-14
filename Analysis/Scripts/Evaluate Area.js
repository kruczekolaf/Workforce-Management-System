function area_evaluation() {
  const spreadsheet = SpreadsheetApp.openById("15zWq6frkb-ghUprdpDoKsAjmvpCkRv3rQKngO4jPrH4");
  const evaluation_area_sheet = spreadsheet.getSheetByName("Evaluation Area");
  const data_sheet = spreadsheet.getSheetByName("Data");
  const database_sheet = spreadsheet.getSheetByName("Database");

  const area = evaluation_area_sheet.getRange("A2").getValue();
  evaluation_area_sheet.getRange("D2:G100").clearContent();
  evaluation_area_sheet.getRange("D2:G100").setBorder(false, false, false, false, false, false, null, SpreadsheetApp.BorderStyle.NONE);
  
  const header_row = data_sheet.getRange(1, 1, 1, data_sheet.getLastColumn()).getValues()[0];
  const target_column_index = header_row.indexOf(area) + 1;

  if (target_column_index === 0) throw new Error("Der area wurde nicht in der Zeile 1 gefunden.");

  const column_values = data_sheet.getRange(2, target_column_index, data_sheet.getLastRow() - 1).getValues();
  const comparison = database_sheet.getRange(2, database_sheet.getRange(1, 1, 1, database_sheet.getLastColumn()).getValues()[0].indexOf(area) + 1, database_sheet.getLastRow() - 1).getValues().flat();

  const results = column_values.reduce((acc, [areas_value], row_index) => {
    if (areas_value === "" || areas_value === null) return acc;

    const average = data_sheet.getRange(row_index + 2, 15).getValue();
    if (areas_value < average) {
      const difference = average - areas_value;
      const employee = data_sheet.getRange(row_index + 2, 1).getValue();

      if (comparison.includes(employee)) {
        acc.push([employee, areas_value, average, difference]);
      }
    }
    return acc;
  }, []);

  results.sort((a, b) => b[3] - a[3]);

  if (results.length > 0) {
    evaluation_area_sheet.getRange(2, 4, evaluation_area_sheet.getLastRow() - 1, 4).clearContent();
    evaluation_area_sheet.getRange(2, 4, results.length, 4).setValues(results);
  }

  // --- Stlye --- //
  evaluation_area_sheet.getRange(2, 4, evaluation_area_sheet.getLastRow() - 1, 4).setBorder(true, true, true, true, true, true, "black", SpreadsheetApp.BorderStyle.SOLID);
  evaluation_area_sheet.getRange(2, 4, evaluation_area_sheet.getLastRow() - 1, 4).setBorder(true, true, true, true, null, null, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);
  for (let i = 1; i < 4; i++){
    evaluation_area_sheet.getRange(2, 4, evaluation_area_sheet.getLastRow() - 1, i).setBorder(null, null, null, true, null, null, "black", SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
  }
  
}
