function add_employee() {
  var ui = SpreadsheetApp.getUi();

  var source_sheet = SpreadsheetApp.openById("YOUR_WORKAREAS_SPREADSHEET_ID");
  var new_employee_sheet = source_sheet.getSheetByName("Add New Employee");

  var employee = new_employee_sheet.getRange("A2").getValue();

  var employee_trail = new_employee_sheet.getRange("B2").getValue();

  // Setting Variables for other Scripts
  const scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty("employee", employee);
  scriptProperties.setProperty("employee_trail", employee_trail);


  if (employee == "") {
  ui.alert("⚠️ACHTUNG⚠️","There is no name to add.", SpreadsheetApp.getUi().ButtonSet.OK);
  return;
  }

  if (employee_trail == "") {
  ui.alert("⚠️ACHTUNG⚠️","There is no probationary period entered for the new person.", SpreadsheetApp.getUi().ButtonSet.OK);
  return;
  }

  var response = ui.alert(
    'Are you sure you want to add this person?',
    ui.ButtonSet.YES_NO
  );

  if (response == ui.Button.YES){
    add_to_work_areas();
    add_to_analysis();
    add_to_late_shifts();
    add_holiday_target();

    update_scheduling_database();
    update_analysis_database();

    new_employee_sheet.getRange("A2").clearContent();


    SpreadsheetApp.getUi().alert(`The Employee "${employee}" was added into Working Areas, Analysis, Scheduling and Late Shifts.`);
  }
}


