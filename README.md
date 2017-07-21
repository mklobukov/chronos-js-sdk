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

You can get the value of instanceID from SDK with this call:
```
chronos.getShortInstanceID()
```

or if you are in the shell of your container with:
```
cat /etc/hostname
```
