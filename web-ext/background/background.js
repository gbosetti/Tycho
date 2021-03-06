//These globals are a very bad idea
var facade = BackgroundFacade.getSingleton();

var updateIcon = function() {
    if (!facade.visible) {
        browser.browserAction.setIcon({ path: "resources/wen-disabled.png" });
    } else {
        browser.browserAction.setIcon({ path: "resources/wen-enabled.png" });
    }
};

var updateFacadeStorage = function(config){
    var storage = new window[config.storageStrategy](config); 
    facade.setStorageStrategy(storage);
}

var startBackground = function(config) {

    updateFacadeStorage(config);

    browser.runtime.onMessage.addListener(rmcRequest => {
        return facade.handle(rmcRequest);
    });

    browser.runtime.onMessageExternal.addListener(rmcRequest => {
        return facade.handle(rmcRequest);
    });

    browser.browserAction.onClicked.addListener(() => {
        facade.visible = !facade.visible;
        facade.setVisible(facade.visible);
        updateIcon();
    });

    browser.storage.onChanged.addListener((change, area) => {
        if (area == "local" && change.config) {
            updateFacadeStorage(change.config.newValue);
        }
    });

    updateIcon();
};

function checkExpectedParameters(config){

    if (config == undefined)
        return false;

    var foundParams = ["storageStrategy", "apiUrl"].filter(param => config.hasOwnProperty(param));
    return (config.length == foundParams.length);
}

browser.storage.local.get("config").then(data => {

    browser.storage.local.set({ "experimentLogs": [] }); //cada vez que se instancia, se borra el local storage
    if (!checkExpectedParameters(data.config)) {

        data.config = {
        "storageStrategy": "LocalLogsRepository",
        "apiUrl": "http://localhost:8080/tycho-api"
        };
        //Si no se setea, se puede perder consistencia con lo que se lee en la pagina de config
        browser.storage.local.set({ "config": data.config }).then(() => startBackground(data.config));
    }
    else startBackground(data.config);
});