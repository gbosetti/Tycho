document.addEventListener("DOMContentLoaded", function restoreOptions() {
    
  browser.storage.local.get("config").then(function setCurrentChoice(result) {
    document.querySelector("#storage-startegy").value = result.config["storageStartegy"];
    document.querySelector("#api-url").value = result.config["apiUrl"];
    updateOptions();
  });

  document.querySelector("form").addEventListener("submit", function saveOptions(e) {
    e.preventDefault();
    browser.storage.local.set({
      "config": {
        "storageStartegy": document.querySelector("#storage-startegy").value,
        "apiUrl": document.querySelector("#api-url").value
      }
    });
  });

  document.querySelector("#storage-startegy").onchange = function(){
    updateOptions();
  };

  function updateOptions(){
    if ( document.querySelector("#storage-startegy").value == "LocalItemsRepository" ){
      document.querySelector("#api-url").parentNode.style.display = "none";
    }else{
      document.querySelector("#api-url").parentNode.style.display = "block";
    }
  }

});