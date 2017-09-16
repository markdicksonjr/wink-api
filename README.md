# Wink API

[![Build Status](https://travis-ci.org/markdicksonjr/wink-api.svg?branch=master)](https://travis-ci.org/markdicksonjr/wink-api)

A typescript/javascript binding for Wink's v2 API.

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
import {GetDevices} from "wink-api";

GetDevices.execute({
    host: 'https://api.wink.com',
    access_token: access_token
}).then((devices) => {
    // do something
}).catch((err) => {
    // error handling 
});
```

## Available Requests

The following requests are supported via the wink-api module (each with "execute" as the method that queries):

- ActivateScene
- CreateGroup
- CreateRobot
- CreateScene
- CreateUser
- DeleteGroup
- DeleteRobot
- DeleteScene
- GetDevice
- GetDeviceUsers
- GetDevices
- GetGroup
- GetGroups
- GetRobot
- GetRobots
- GetScene
- GetScenes
- SetDesiredState
- ShareDevice
- UnshareDevice
- UpdateGroup
- UpdateGroupState
- UpdateRobot
- UpdateScene
- UpdateUser
