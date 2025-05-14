function automatic_sort() {

  const source_sheet = SpreadsheetApp.openById("1qvOVi5Jk86jJyvtUq4Nh0UBAo0ToaC-Zr-qk780atnw");
  const areas_sheet = source_sheet.getSheetByName("Areas");

  areas_sheet.getRange("A3:N1000").sort({column: 1, ascending: true});
}
