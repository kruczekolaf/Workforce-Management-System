function trail_countdown() {
  var source_sheet = SpreadsheetApp.openById("YOUR_WORKAREAS_SPREADSHEET_ID");
  const areas_sheet = source_sheet.getSheetByName("Areas");

  let empty_cell = null;
  for (let row = 1; row <= areas_sheet.getLastRow(); row++) {
    const cell_value = areas_sheet.getRange(row, 1).getValue();
    if (!cell_value) {
      empty_cell = row;
      break;
    }
  }

  for(n = 3; n < areas_sheet.getLastRow(); n++) {
    var trial_day = areas_sheet.getRange(n, 15).getValue();

    if(trial_day == 0){
      trial_day = 0
    }
    else{
      trial_day = trial_day - 1;
    }
    areas_sheet.getRange(n, 15).setValue(trial_day);
  }
  areas_sheet.getRange(empty_cell, 15).setValue(trial_day);
}
