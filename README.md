# Chronos JS SDK
## Introduction
This is SDK can be used by Chronos jobs to update job's status with custom data.

```
npm i chronos-js-sdk
```

## Initialize SDK
To instantiate Chronos SDK:

```
let chronos = new Chronos(Config);
```

Config should contain the following information:

```
{
  "authManagerURL": "http:s//<AuthManagerURL",
  "chronosURL": "https://<chronosURL>",
  "appkey": "",
  "appsecret": ""
}
```

## Update job status
```
chronos.updateJobStatus(instanceID, status)
```
