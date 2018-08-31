class ServerAPI {

  setApiUrl(url) {
    this.storageStrategy.setApiUrl(url);
  }

  setStorageStrategy (storage) {
    this.storageStrategy = storage;
  }
  
  submit(payload, service) {

    console.log("submit");
    this.storageStrategy.submit(payload, service);
  }

  submitTaskReport(report) {
    console.log("submitTaskReport");
    this.storageStrategy.submitTaskReport(report);
  }

  getExperimentDesignFromServer(id){
    console.log("getExperimentDesignFromServer > ", this.storageStrategy.constructor.name);
    return this.storageStrategy.getExperimentDesignFromServer(id);
  }
}
