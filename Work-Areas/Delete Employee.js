function delete_employee(){
  const ui = SpreadsheetApp.getUi();

  const source_sheet = SpreadsheetApp.openById("1qvOVi5Jk86jJyvtUq4Nh0UBAo0ToaC-Zr-qk780atnw");
  const delete_employee_sheet = source_sheet.getSheetByName("Delete Employee");

  const employee = delete_employee_sheet.getRange("A3").getValue();

  // Setting Variables for other Scripts
  const scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty("employee", employee);

  if (employee == "") {
  ui.alert("⚠️ACHTUNG⚠️","No person is selected for deletion.", SpreadsheetApp.getUi().ButtonSet.OK);
  return;
  }

  const response = ui.alert(
    'Are you sure you want to delete the employee?',
    ui.ButtonSet.YES_NO
  );

  if (response == ui.Button.YES){

    delete_from_working_areas();
    delete_from_analysis();
    delete_from_holidays();
    delete_from_late_shifts();

    delete_employee_sheet.getRange("A3").clearContent();
    update_scheduling_database();
    update_analysis_database();
    
  }

  SpreadsheetApp.getUi().alert(`The Emloyee "${employee}" was successfully deleted from the Analysis, Work Areas, Late Shifts and Scheduling.`);
}
