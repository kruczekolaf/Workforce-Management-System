function enter_late_shifts() {
  
  const spreadsheet = SpreadsheetApp.openById("YOUR_ANALYSIS_SPREADSHEET_ID");
  const analysis_sheet = spreadsheet.getSheetByName("Analysis");
  const late_shift_sheet = spreadsheet.getSheetByName("Late Shifts");

  const date = new Date(analysis_sheet.getRange("B1").getValue());
  const weekdays = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  const date_formatted = `${weekdays[date.getDay()]}. ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear().toString().slice(-2)}`;

  const areas = ["I3:I19", "I22:I33"];
  const shifts = areas
    .flatMap(range => analysis_sheet.getRange(range).getValues())
    .flat()
    .filter(value => value); 

  const unique_shifts = [...new Set(shifts)]; 

  const header = late_shift_sheet.getRange(1, 1, 1, late_shift_sheet.getLastColumn() || 1).getValues()[0];
  const empty_column = header.findIndex(cell => !cell) + 1 || header.length + 1;

  late_shift_sheet.getRange(1, empty_column).setValue(date_formatted);

  if (unique_shifts.length > 0) {
    late_shift_sheet.getRange(2, empty_column, unique_shifts.length, 1)
      .setValues(unique_shifts.map(s => [s]));
  }
}
