class LogsRepository {
  pushItems(uri, itemType, params) {} 
};
window.LogsRepository = LogsRepository;

class RemoteLogsRepository extends LogsRepository {

  pushItems(uri, itemType, params) {

    //TODO: this method should return a Promise 
    return new Promise((resolve, reject) => {

      browser.storage.local.get("config").then(function(result) {

        var endpoint = result.config["items-repo-uri"];
        const payload = Object.assign({}, { //TODO: this is the same step as in the local strategy 
          owner: 'no_reply@lifia.info.unlp.edu.ar',
          type: itemType,
          url: uri,
          groups: ['public'],
        }, params);

        const req = new XMLHttpRequest();
        req.open('PATCH', endpoint, false);
        req.setRequestHeader("Content-type", "application/json");
        const postItemRequest = JSON.stringify(payload);
        req.send(postItemRequest);

        resolve(req);
      });
    });
  }
};
window.RemoteLogsRepository = RemoteLogsRepository;

class LocalLogsRepository extends LogsRepository {
  
  pushItems(uri, itemType, params) {

    var payload = Object.assign({}, {
      type: itemType,
      url: uri
    }, params);

    browser.storage.local.get("config").then(function(result) {
      console.log(result.config["items-storage-local-plugin-id"]);
      browser.runtime
        .sendMessage(result.config["items-storage-local-plugin-id"], {
            methodName: "store", arguments: payload 
        })
        .catch((error) => {
            console.log("Could not talk to the storage", error);
            return Promise.reject("Could not talk to the storage");
        });
        return Promise.resolve(payload);
    });
  }
}
window.LocalLogsRepository = LocalLogsRepository;