function update_employees_lateshifts() {

  const spreadsheet = SpreadsheetApp.openById("15zWq6frkb-ghUprdpDoKsAjmvpCkRv3rQKngO4jPrH4");
  const database_sheet = spreadsheet.getSheetByName("Database");

  const employee_range = database_sheet.getRange("A2:A" + database_sheet.getLastRow());
  const employees_values = employee_range.getValues().flat();
  let employees = [];

  for (let i = 0; i < employees_values.length; i++) {
    if (!employees_values[i]) break; 
    employees.push(employees_values[i]); 
  }

  const late_shifts_sheet = spreadsheet.getSheetByName("Late Shifts");

  late_shifts_sheet.getRange("Q2:Q1000").clearContent();

  if (employees.length > 0) {
    late_shifts_sheet.getRange(2, 17, employees.length, 1).setValues(employees.map(name => [name]));
  }
}
