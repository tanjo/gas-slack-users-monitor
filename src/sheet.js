var spreadSheet = SpreadsheetApp.openByUrl(SPREAD_SHEET_URL);
var dataSheet = spreadSheet.getSheetByName(SHEET_NAME);

function getStatusData() {
  var values = dataSheet.getRange(1, 1, dataSheet.getLastRow()).getValues();
  return values.map(function(array) {
    if (array.length > 0) {
      return JSON.parse(array[0]);
    } else {
      return {}
    }
  });
}

function saveStatusData(arrays) {
  dataSheet.clear();
  var data = arrays.map(function(value) {
    return [JSON.stringify(value)];
  });
  dataSheet.getRange(1, 1, arrays.length).setValues(data);
}
