function main() {
  var response = usersList();
  if (!response.ok) {
    return;
  }
  var members = response.members.filter(function(member) {
    return member.profile.title.length > 0 || member.profile.display_name.length > 0;
  });
  var statuses = getStatusData();

  var results = members.filter(function(member) {
    var targets = statuses.filter(function(status) {
      return status.id === member.id;
    });
    if (targets.length === 0) {
      return true;
    }
    var target = targets[0];
    if (member.profile.title !== target.profile.title) {
      return true;
    }
    if (member.profile.display_name !== target.profile.display_name) {
      return true;
    }
    return false;
  });
  if (results.length > 0) {
    showNewStatuses(results);
  }
  Logger.log(JSON.stringify(results));
  saveStatusData(members.map(function(member) {
    return {
      id: member.id, // ユーザーID
      updated: member.updated, // 更新日
      profile: {
        title: member.profile.title, // いわゆるプロフィール文
        display_name: member.profile.display_name // 表示名
      }
    };
  }));
}

function showNewStatuses(users) {
  var messages = users.filter(function(user) {
    return user.profile != null;
  }).map(function(user) {
    return ["<@" + user.id + ">", user.profile.title].filter(function(text) {
      return text;
    }).join(' ');
  }).filter(function(text) {
    return text;
  });
  var message = messages.join('\n');
  if (message && message.length > 0) {
    chatPostMessage(message);
  }
}

function sameUser(element, index, array) {
  if (this.id === element.id) {
    return true;
  }
  return false;
}