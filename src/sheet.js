function homeListSheet() {
  // スプレッドシート情報
  var sheetId = '11aGmEN2NVqEMkZKlCEypEnHqqYm3tlCvZ4g1574_pss';
  var sheetName = '物件リスト';
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
  
  return sheet;
}

// 物件URL
function writeUrl (userMessage) {
  var sheet = homeListSheet();
  
  //スプレッドシートのデータを取得
  var lastlow = sheet.getLastRow();
  var lastcol = sheet.getLastColumn();
  var sheetdata = sheet.getSheetValues(1, 1, lastlow, lastcol);

  // no.
  var numberColumn = 1;
  var inputNumber = sheet.getRange(lastlow, numberColumn).getValue();
  var nextNumber = inputNumber + 1;

  // 入力するセルを特定
  var inputLow = lastlow + 1;
  var inputNumberRange = sheet.getRange(inputLow, 1);
  var inputURLRange = sheet.getRange(inputLow, 2);
  
  // 書き込み
  inputNumberRange.setValue(nextNumber);
  inputURLRange.setValue(userMessage);
  
  // Flagの追加
  setFlag(inputLow, true);
}

// Comment
function writeComment(userMessage) {
  var sheet = homeListSheet();
  var lastlow = sheet.getLastRow();
  
  // 入力するセルを特定
  var commentColumn = 8;
  var inputLow = lastlow;
  var inputCommentRange = sheet.getRange(inputLow, commentColumn);
  
  // 書き込み
  inputCommentRange.setValue(userMessage);
  
  // Flagの追加
  setFlag(inputLow, false);
}
