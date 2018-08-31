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
        result.experimentLogs.push(payload);
      }else result.experimentLogs = [payload];

      console.log("SUBMITTING", result.experimentLogs);

      browser.storage.local.set({
        "experimentLogs": result.experimentLogs
      });
    });
  }

  /**
   * @id the id of the session to retrieve
   * @returns a Promise that resolves to the server response
   */
  getExperimentDesignFromServer(id) {
    return new Promise((resolve, reject) => {

      var experimentSpecUrl = browser.extension.getURL("experiment-definition.json");
      var xhr = new XMLHttpRequest();
      xhr.addEventListener("load", function(evt) {

        try{
          var expSpec = JSON.parse(evt.target.response);
          if(expSpec.id == id)
            resolve({ "data": expSpec });
          else {
            console.log("The ids do not match");
            reject()
          }
        }catch(err){ reject(err) }
      });

      // open synchronously
      xhr.open("GET", experimentSpecUrl, false);
      xhr.send();
    });
  }
}
window.LocalLogsRepository = LocalLogsRepository;