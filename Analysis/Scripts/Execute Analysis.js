function execute_analysis() {

  var ui = SpreadsheetApp.getUi();

  var response = ui.alert(
  'Are you sure you want to execute the analysis?',
  ui.ButtonSet.YES_NO
  );

  if (response == ui.Button.YES) {
    evaluate_employees();
    enter_late_shifts();
    enter_holidays();
  }
  
  SpreadsheetApp.getUi().alert("The analysis was successfully executed.");
}
