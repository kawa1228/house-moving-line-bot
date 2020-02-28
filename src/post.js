function doPost(e) {
  var event = JSON.parse(e.postData.contents).events[0];
  var replyToken= event.replyToken;

  if (typeof replyToken === 'undefined') {
    return; // エラー処理
  }
  var userId = event.source.userId;
  var nickname = getUserProfile(userId);

  if(event.type == 'follow') {
    // ユーザーにbotがフォローされた場合に起きる処理
  }

  if(event.type == 'message') {
    var userMessage = event.message.text;
    var replyMessage = '';
    
    var reg = /https?:\/\//;
    var isURL = reg.test(userMessage);
    var isComment = !isURL;
    
    var acceptComment = getFlag();
    
    // 返信メッセージ
    // ユーザーからのメッセージをスプレッドシートに記入 
    if (isURL) {
      writeUrl(userMessage); 
      replyMessage = userMessage + "\n" + "を登録したもち" + "\uDBC0\uDC5F" + "\n" + "コメントをつけたい場合は5分以内にこのまま送信してね！";
    } else if(acceptComment && isComment) {
      writeComment(userMessage);
      replyMessage = "コメント登録完了！" +  "\uDBC0\uDC33";
    } else {
      replyMessage = "正しいurlを送信してね" + "\uDBC0\uDC92";
    }
    
 
    UrlFetchApp.fetch(LINE_REPLY_URL, {
      'headers': {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
      },
      'method': 'post',
      'payload': JSON.stringify({
        'replyToken': replyToken,
        'messages': [{
          'type': 'text',
          'text': replyMessage,
        }],
      }),
    });
    return ContentService.createTextOutput(
      JSON.stringify({'content': 'post ok'})
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
