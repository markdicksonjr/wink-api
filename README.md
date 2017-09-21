# Wink API

[![Build Status][travis-img]][travis-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Test Coverage][coveralls-img]][coveralls-url]

[travis-img]: https://travis-ci.org/markdicksonjr/wink-api.svg?branch=master
[travis-url]: https://travis-ci.org/markdicksonjr/wink-api
[downloads-image]: https://img.shields.io/npm/dm/wink-api.svg
[downloads-url]: https://npmjs.org/package/wink-api
[coveralls-img]: https://coveralls.io/repos/github/markdicksonjr/wink-api/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/markdicksonjr/wink-api?branch=master

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
}).then((devicesResponse: WinkAPI.IUserDevicesResponse) => {
    // do something
}).catch((err: WinkAPI.IRequestError) => {
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

## Interesting use-cases

Turning off a group of devices:

```typescript
import {UpdateGroupState} from "wink-api";

UpdateGroupState.execute({
    host: 'https://api.wink.com',
    access_token: '<access_token>',
    group_id: '<group id>'
}, {
    powered: false
}).then((groupResponse: WinkAPI.IUserGroupResponse) => {
    // do something
}).catch((err: WinkAPI.IRequestError) => {
      // error handling 
});
```

Toggling power for a group of devices:

```typescript
import {GetGroup, UpdateGroupState} from "wink-api";

GetGroup.execute({
    host: 'https://api.wink.com',
    access_token: '<access_token>',
    group_id: '<group id>'
}).then((group) => {
    
    let allOn: boolean = false;
    if(group && group.data && group.data.reading_aggregation) {
        let aggregation: any = group.data.reading_aggregation;
        allOn = (aggregation.powered && aggregation.connection && aggregation.powered.true_count === aggregation.connection.true_count);
    }

    UpdateGroupState.execute({
        host: 'https://api.wink.com',
        access_token: '<access_token>',
        group_id: '<group id>'
    }, {
        powered: !allOn
    }).then((groupResponse: WinkAPI.IUserGroupResponse) => {
        // TODO: handle group response
    }).catch((err: WinkAPI.IRequestError) => {
        // TODO: handle error
    });
}).catch((err: WinkAPI.IRequestError) => {
    // TODO: handle error
});
```
