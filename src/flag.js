function flagSheet() {
  // スプレッドシート情報
  var sheetId = '11aGmEN2NVqEMkZKlCEypEnHqqYm3tlCvZ4g1574_pss';
  var sheetName = 'ログ用';
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
  
  return sheet;
}

// 次のメッセージを受け付けるかのflagを管理
function setFlag(inputLow, isAccept) {
  var sheet = flagSheet();
  
  var dateRange = sheet.getRange(2, 1);
  var lowRange = sheet.getRange(2, 2);
  var flagRange = sheet.getRange(2, 3);
  
  var nowTime = new Date();
  dateRange.setValue(nowTime);
  lowRange.setValue(inputLow);
  flagRange.setValue(isAccept);
}

function getFlag() {
  var sheet = flagSheet();
  
  // 入力されているflag
  var flagRange = sheet.getRange(2, 3);
  var writeFlag = flagRange.getValue();
  
  // 入力されている時間
  var dateRange = sheet.getRange(2, 1);
  var writeDate = dateRange.getValue();
  
  // 前回の入力時間との差分
  var now = new Date();
  var diff = now.getTime() - writeDate.getTime();
  var minuteDiff = diff / (1000*60);

  // 5分以上経っていたらタイムオーバー
  var isAcceptflag = writeFlag;
  var timeOver = minuteDiff > 5;
  if (timeOver) {
    isAcceptflag = false;
  }

  // ログ用
  sheet.getRange(2, 4).setValue(minuteDiff);
  sheet.getRange(2, 5).setValue(timeOver);

  return isAcceptflag;
}
