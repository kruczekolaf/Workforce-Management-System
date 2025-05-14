function lateshifts_year() {

  const ui = SpreadsheetApp.getUi();

  const confirm = ui.alert(
    'Are you sure you want to transfer the late shifts to the annual overview?',
    ui.ButtonSet.YES_NO
  );
  if (confirm !== ui.Button.YES) return;

  const source_sheetId = "YOUR_ANALYSIS_SPREADSHEET_ID";
  const target_sheet_id = "YOUR_LATESHIFTS_SPREADSHEET_ID";

  const source_sheet = SpreadsheetApp.openById(source_sheetId).getSheetByName("Late Shifts");
  const targetSpreadsheet = SpreadsheetApp.openById(target_sheet_id);
  const target_sheet = SpreadsheetApp.openById(target_sheet_id).getSheetByName("Late Shifts Year");

  const month = source_sheet.getRange("B34").getValue();
  const year = source_sheet.getRange("D34").getValue();
  const new_sheet_name = `${month} ${year}`;

  const employee = source_sheet.getRange("Q1:Q100").getValues().flat().filter(v => v !== "");
  const shifts = source_sheet.getRange("R1:R100").getValues().flat().filter(v => v !== "" && v !== null);

  const columnnIndex = {
    "January": "D", "February": "G", "March": "J", "April": "M",
    "May": "P", "June": "S", "July": "V", "August": "Y",
    "September": "AB", "October": "AE", "November": "AH", "December": "AK"
  };
  const column = columnnIndex[month];
  if (!column) throw new Error("Ungültiger month: " + month);
  const shiftscolumn = get_next_column(column);

  target_sheet.getRange(`${column}1`).setValue(`${month} ${year}`);

  target_sheet.getRange(`${column}2:${column}${employee.length + 1}`).setValues(employee.map(name => [name]));
  target_sheet.getRange(`${shiftscolumn}2:${shiftscolumn}${shifts.length + 1}`).setValues(shifts.map(s => [s]));

  const employee_list = target_sheet.getRange(3, 1, target_sheet.getLastRow() - 2).getValues().flat();
  employee.forEach((name, i) => {
    const row_index = employee_list.indexOf(name);
    if (row_index !== -1) {
      const cell = target_sheet.getRange(row_index + 3, 2);
      const old_value = cell.getValue() || 0;
      cell.setValue(old_value + (shifts[i] || 0));
    }
  });

  const copied_range = source_sheet.getRange("A1:O30");
  const values = copied_range.getValues();

  const existing = targetSpreadsheet.getSheetByName(new_sheet_name);
  if (existing) targetSpreadsheet.deleteSheet(existing);
  const new_sheet = targetSpreadsheet.insertSheet(new_sheet_name);
  const target_range = new_sheet.getRange(1, 1, values.length, values[0].length);
  target_range.setValues(values);


  target_range.setFontFamily("Calibri")
             .setFontSize(12)
             .setFontWeight("bold")
             .setHorizontalAlignment("center")
             .setVerticalAlignment("middle")
             .setNumberFormat("DDD. D. MM. YY")
             .setBorder(true, true, true, true, true, true);
  new_sheet.getRange("A1:O1").setBackground("#d9d9d9")
                            .setBorder(null, null, true, null, null, null, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);
  new_sheet.getRange("A30:O30").setBorder(null, null, true, null, null, null, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);
  new_sheet.getRange("O1:O30").setBorder(null, null, null, true, null, null, "black", SpreadsheetApp.BorderStyle.SOLID_THICK);

  source_sheet.getRange("A1:O30").clearContent();

  ui.alert("The late shifts were successfully entered in the yeares overview.");
}

function get_next_column(col) {
  let column_number = 0;
  for (let i = 0; i < col.length; i++) {
    column_number = column_number * 26 + (col.charCodeAt(i) - 64);
  }
  column_number++;
  let result = '';
  while (column_number > 0) {
    const remainder = (column_number - 1) % 26;
    result = String.fromCharCode(65 + remainder) + result;
    column_number = Math.floor((column_number - 1) / 26);
  }
  return result;
}
