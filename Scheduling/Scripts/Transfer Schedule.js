function transfer_into_analysis() {

  var ui = SpreadsheetApp.getUi();

  var response = ui.alert(
    'Are you sure you want to transfer the schedule to the analysis?',
    ui.ButtonSet.YES_NO
  );

  if (response == ui.Button.YES) {
    const schedule_spreadsheet = SpreadsheetApp.openById("YOUR_SCHEDULING_SPREADSHEET_ID");
    const schedule_sheet = schedule_spreadsheet.getSheetByName("Schedule");

    const sector1 = schedule_sheet.getRange("B3:I19").getValues();
    const sector2 = schedule_sheet.getRange("B22:I33").getValues();


    const analysis_spreadsheet = SpreadsheetApp.openById("YOUR_ANALYSIS_SPREADSHEET_ID");
    const analysis_sheet = analysis_spreadsheet.getSheetByName("Analysis");


    const range1 = analysis_sheet.getRange("B3:I19");
    range1.setValues(sector1);
    range1.setFontFamily("Calibri").setFontSize(11).setFontWeight("bold");

    const range2 = analysis_sheet.getRange("B22:I33");
    range2.setValues(sector2);
    range2.setFontFamily("Calibri").setFontSize(11).setFontWeight("bold");

    schedule_sheet.getRange("B3:I19").clearContent();
    schedule_sheet.getRange("B22:I33").clearContent();


    SpreadsheetApp.getUi().alert("The data was successfully added to the analysis.");
  }
}
