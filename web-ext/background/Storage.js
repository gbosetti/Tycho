class StorageStrategy {
  submit(payload, service) {};
  submitTaskReport(report) {
    this.submit(report, "/task-results/");
  }
  getExperimentDesignFromServer(id) {};
};
window.StorageStrategy = StorageStrategy;

class RemoteLogsRepository extends StorageStrategy {
   
  constructor(data){
    super();
    this.apiUrl = data.apiUrl;
  }

  submit(payload, service) {
    
    axios
      .post(this.apiUrl + service, payload) 
      .catch(function(error) {
        console.log("Error posting: ", error);
      });
  }

  /**
   * @id the id of the session to retrieve
   * @returns a Promise that resolves to the server response
   */
  getExperimentDesignFromServer(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(this.apiUrl + "/experiments/" + id)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          console.log("catched the error");
          reject(error);
        });
    });
  }
};
window.RemoteLogsRepository = RemoteLogsRepository;

class LocalLogsRepository extends StorageStrategy {

  submit(payload, service) {
    
    browser.storage.local.get("experimentLogs").then(function(result) {

      if(result.experimentLogs){
        console.log(result.experimentLogs);
      }else result.experimentLogs = [console.log(payload)];

      console.log(result.experimentLogs);
    });
  }

  /**
   * @id the id of the session to retrieve
   * @returns a Promise that resolves to the server response
   */
  getExperimentDesignFromServer(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(this.apiUrl + "/experiments/" + id)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          console.log("catched the error");
          reject(error);
        });
    });
  }
  
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