browser.storage.local.get("config").then(function checkDefaultOptions(result) {

  	if(result.config) return;

  	browser.storage.local.set({
	  "config": {
	    "storageStartegy": "LocalItemsRepository",
	    "apiUrl": "http://localhost:8080/tycho-api"
	    }
	});
});