# Tycho
Simple Tool for designing remote web experiments, running them, and recording the results.
Requires MongoDB.

## Installation
Start with a clear Pharo6.0 image and run the following expresion in a playground. The save your image. 
```smalltalk
Metacello new
	baseline: 'TasksLogger';
	repository: 'github://juliangrigera/Tycho';
	load.
```

## Run the server
To setup and run the server in __development mode__, evaluate the following expresion in a playground.

```smalltalk
TasksLoggerScriptsRunner prepareForDevelopmentOnPort: 8080 . 	
```

To prepare your server __for deployment__, evaluate the following expresion in a playground.

```smalltalk
TasksLoggerScriptsRunner prepareForDeploymentOnPort: 8080 . 	
```

## Test the server
Tycho should be accesible at http://yourserver-ip:port/tycho

To test that the REST api is also working, point your browser at http://yourserver-ip:port/tycho-api/ping

## Prepare the web extension
Inside the web-ext subdirectory run:
```javascript
npm install
```
Install the extensión on your browser. 

The extension uses a local storage by defatult. 

The local storage retrieves the definition of the experiment from a file from the extension's root directory called "experiment-definition.json". You can change its content. By default, such file contains a demo experiment specification. You can use it by clicking on the extension button and entering "demo" in the input to join the experiment. The logs are pushed to the local storage of the browser, under the key "experimentLogs". By now, you can open a BROWSER console (not the web console) and run:
```javascript
browser.storage.local.get("experimentLogs").then(data => console.log(data));
```

The extension can be also configured with a remote storage strategy. Edit the file web-ext/manifest.json . In the content_security_policy property and replace both occurrences of "localhost:8080" by the server name and port where you will run the Tycho server. Edit the file web-ext/background/background.js . Replace "localhost:8080" by the server name and port where you will run the Tycho server (this almost at the end of the file).