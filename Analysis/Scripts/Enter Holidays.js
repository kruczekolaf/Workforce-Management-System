function enter_holidays() {
  
  const spreadsheet = SpreadsheetApp.openById("YOUR_ANALYSIS_SPREADSHEET_ID");
  const analysis_sheet = spreadsheet.getSheetByName("Analysis");
  const holiday_sheet = spreadsheet.getSheetByName("Holidays");

  const raw_date = new Date(analysis_sheet.getRange("B1").getValue());
  const date = Utilities.formatDate(raw_date, Session.getScriptTimeZone(), "dd.MM.yyyy");

  const header = holiday_sheet.getRange("B1:Z1").getValues()[0];
  const column_index = header.findIndex(date =>
    Utilities.formatDate(new Date(date), Session.getScriptTimeZone(), "dd.MM.yyyy") === date
  );

  if (column_index === -1) {
    Logger.log("No suitable date found in B1:Z1.");
    return;
  }

  const target_column = column_index + 2;

  const employee = ["B3:I19", "B22:I33"]
    .flatMap(r => analysis_sheet.getRange(r).getValues())
    .flat()
    .filter(v => v); 

  const unique_employee = [...new Set(employee)];
  const holiday_list = holiday_sheet.getRange("A2:A1000").getValues().flat();

  unique_employee.forEach(name => {
    const rowIndex = holiday_list.indexOf(name);
    if (rowIndex !== -1) {
      holiday_sheet.getRange(rowIndex + 2, target_column).setValue(name);
    }
  });
}
