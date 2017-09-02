# Wink API

## Installation

```bash
npm install wink-api
```

for typescript users, this can install the module's typings globally:

```bash
typings install file:node_modules/wink-api/@types/wink-api.d.ts --save --global
```

## Setup
Add an app at https://developer.wink.com and wait under a day for acceptance.  
You'll need to get the client ID and secret.

Your app should get the access token via OAuth.  More details are at http://docs.winkapiv2.apiary.io/#reference/oauth

## Examples

Get the devices for a user:

```typescript
import {Devices} from "wink-api";

Devices.list('https://api.wink.com', access_token).then((devicesResponse: WinkAPI.IUserDevicesResponse) => {
    // do something
}).catch((err) => {
    // error handling 
});
```
