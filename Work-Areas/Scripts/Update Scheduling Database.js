function update_scheduling_database() {
  var source_sheet = SpreadsheetApp.openById("YOUR_WORKAREAS_SPREADSHEET_ID");
  var areas_table = source_sheet.getSheetByName("Areas");

  let last_row = areas_table.getLastRow();
  const working_area_range = areas_table.getRange(3, 1, last_row, 15);

  working_area_range.sort({column: 1, ascending: true});

  const all_employees = [];
  const employees = areas_table.getRange(3, 1, areas_table.getLastRow() - 2).getValues();

  for (let i = 0; i < employees.length; i++) {
    const cellValue = employees[i][0];
    if (!cellValue) break;
    all_employees.push(cellValue);
  }

  const scheduling_sheet = SpreadsheetApp.openById("YOUR_SCHEDULING_SPREADSHEET_ID");
  const database_table = scheduling_sheet.getSheetByName("Database");

  database_table.getRange("A2:N1000").clearContent();
  database_table.getRange(2, 1, all_employees.length).setValues(all_employees.map(item => [item]));

  const categories = [
    "area_1", "area_2", "area_3", "area_4", "area_5", "area_6", "area_7", "area_8", "area_9", "area_10", "area_11", "area_12", "area_13"];

  const columnOffsets = {
    area_1: 2, area_2: 3, area_3: 4, area_4: 5, area_5: 6, area_6: 7, area_7: 8, area_8: 9, area_9: 10, area_10: 11, area_11: 12, area_12: 13, area_13: 14};

  const results = {};
  categories.forEach(category => results[category] = []);

  categories.forEach(category => {
    const col = columnOffsets[category];
    const range = areas_table.getRange(3, col, areas_table.getLastRow() - 2);
    const values = range.getValues();

    for (let i = 0; i < values.length; i++) {
      const cellValue = values[i][0];
      if (cellValue === "able" || cellValue === "learning") {
        const row = i + 3;
        const entry = areas_table.getRange(row, 1).getValue(); 
        results[category].push(entry);
      }
    }
  });

  categories.forEach((category, index) => {
    const col = index + 2; 
    const data = results[category];
    database_table.getRange(2, col, data.length).setValues(data.map(item => [item]));
  });
}
