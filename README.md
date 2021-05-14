# Hue Control
A clone of the hue app, works together with a dummy api.

## Requirements
- Node
- Ionic CLI

Note: Have hardware acceleration enabled in the bios, to run the Android Emulator.

## First steps:
Pull dependencies:
```bash
npm i
```

## Run
Since this app aims to be a cross-platform app, the app can be ran within the browser, android and ios.

### Browser
The Browser doesn't require much setup, just the basic requirements.
Preview:

```bash
ionic serve
```

You will find more details under: https://ionicframework.com/docs/developing/previewing

### Android
Requires Android Studio and the Android SDK. You find more Information here: https://ionicframework.com/docs/developing/android

### IOS
Currently not officially supported, but you might try it out. You find more Information here: https://ionicframework.com/docs/developing/ios

## Configure the dummy API
You need to enter the Address of the Dummy API in the configuration page of the App.

The Port is listed in the given docker-compose file or if you run
```bash
docker ps
```
Afterwards search for the Dummy API Container and the exposed port is listed underneath the Port section. 


The default user of the dummy API is:
```
root
```
