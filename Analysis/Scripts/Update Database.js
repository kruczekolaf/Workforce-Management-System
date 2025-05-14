function update_database() {

  const areas_sheet = SpreadsheetApp.openById("YOUR_WORKAREAS_SPREADSHEET_ID").getSheetByName("Areas");

  const last_row = areas_sheet.getlast_row();
  const data_range = areas_sheet.getRange(3, 1, last_row - 2, 14);
  const data = data_range.getValues();
  data.sort((a, b) => a[0].localeCompare(b[0]));
  data_range.setValues(data);

  const analysis_sheet = SpreadsheetApp.openById("YOUR_ANALYSIS_SPREADSHEET_ID").getSheetByName("Database");

  const employee = data.map(row => row[0]).filter(name => name);
  analysis_sheet.getRange(2, 1, employee.length).setValues(employee.map(name => [name]));

  const categories = Array.from({ length: 13 }, (_, i) => `area_${i + 1}`);

  categories.forEach((category, i) => {
    const index = i + 1; 
    const filtered = data
      .filter(row => ["able", "learning"].includes(row[index]))
      .map(row => [row[0]]);
    analysis_sheet.getRange(2, i + 2, filtered.length).setValues(filtered);
  });
}
