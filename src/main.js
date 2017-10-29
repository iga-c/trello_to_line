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
    // stub
}

function doPost(e){
    // stub
}
