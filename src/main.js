function createWebhook(){
  var scriptProp =  PropertiesService.getScriptProperties().getProperties();
  var trelloKey = scriptProp.TRELLO_API_KEY;
  var trelloToken = scriptProp.TRELLO_API_TOKEN;
  var callbackURL = scriptProp.CALLBACK_URL;
  var boardId = scriptProp.BOARD_ID;

  var url = 'https://api.trello.com/1/tokens/' + trelloToken + '/webhooks/?key=' + trelloKey;
  var options = {
    'method' : 'post',
    'payload' : {
      'description': 'Trello to Line',
      'callbackURL': callbackURL,
      'idModel': boardId
    }
  }
  Logger.log(UrlFetchApp.fetch(url, options));
}

function postLineMessage(message){
  var scriptProp = PropertiesService.getScriptProperties().getProperties();
  var accessToken = scriptProp.LINE_TOKEN;

  var options = {
    'method': 'post',
    'headers': {
      'Authorization': 'Bearer ' + accessToken,
    },
    'payload': {
      'message': message
    }
  };

  UrlFetchApp.fetch('https://notify-api.line.me/api/notify', options);
}

function doPost(e){
  var contents = JSON.parse(e.postData.contents);
  var actionType = contents.action.type;
  var cardName = contents.action.data.card.name;
  var message = 'none';
  
  if(actionType == 'commentCard'){
    var text = contents.action.data.text;
    message = cardName + 'にコメントが追加されました：\n' + text.slice(0, 100);
  }

  if(actionType == 'createCard'){
    message = '新しいタスクが追加されました：\n' + cardName;
  }

  if(message != 'none'){
    postLineMessage(message);
  }
}
