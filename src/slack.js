// chat.postMessage | Slack
// https://api.slack.com/methods/chat.postMessage
function chatPostMessage(message, channel) {
  var url = 'https://slack.com/api/chat.postMessage';
  var payload = {
    'token': API_TOKEN,
    'channel': SLACK_CHANNEL_NAME,
    'text': message,
    'username': 'プロフィールモニター',
    'icon_emoji': ':tv:'
  };
  var params = {
    'method': 'POST',
    'payload': payload
  };

  var response = UrlFetchApp.fetch(url, params);
}

// users.list method | Slack
// https://api.slack.com/methods/users.list
function usersList() {
  var url = 'https://slack.com/api/users.list?token=' + API_TOKEN + '&presence=true';
  var response = UrlFetchApp.fetch(url);
  return JSON.parse(response.getContentText());
}
