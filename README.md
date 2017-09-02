# Wink API

## Installation

```bash
npm install wink-api
```

for typescript users, this can install the module's typings globally:

```bash
typings install file:node_modules/wink-api/@types/wink-api.d.ts --save --global
```

An example module usage:

```typescript
import {Devices, SetDesiredState} from "wink-api";

Devices.list('https://api.wink.com', access_token).then((devicesResponse: WinkAPI.IUserDevicesResponse) => {
    // do something
}).catch((err) => {
    // error handling 
});
```

## Setup
Add an app at developer.wink.com and wait under a day for acceptance.  
You'll need a client ID and secret