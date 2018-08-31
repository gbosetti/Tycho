class ServerAPI {

  setApiUrl(url) {
    this.storageStrategy.setApiUrl(url);
  }

  setStorageStrategy (storage) {
      this.storageStrategy = storage;
  }
  
  submit(payload, service) {

    this.storageStrategy.submit(payload, service);
  }

  submitTaskReport(report) {
    this.storageStrategy.submitTaskReport(report);
  }

  getExperimentDesignFromServer(){
    return this.storageStrategy.getExperimentDesignFromServer();
  }
}
