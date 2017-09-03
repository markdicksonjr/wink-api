import * as request from 'request';
import {ObjectTypeUtil} from "./object-type-util";

export class GetDeviceUsers {

    public static execute(params: WinkAPI.IObjectIdRequestParameters): Promise<WinkAPI.IDeviceUser[]> {
        return new Promise<WinkAPI.IDeviceUser[]>((resolve, reject) => {
            request.get({
                url: params.host +
                '/' + params.object_type + ObjectTypeUtil.pluralizeObjectType(params.object_type) +
                '/' + params.object_id +
                '/users',
                json: {},
                headers: {
                    Authorization: 'Bearer ' + params.access_token
                }
            }, (error, response, body) => {
                if(error) {
                    return reject({
                        statusCode: response.statusCode,
                        message: error.message || error.stack || error
                    });
                }

                if(response.statusCode !== 200) {
                    return reject({
                        statusCode: response.statusCode,
                        message: error.message || error.stack || error
                    });
                }

                resolve(body);
            });
        });
    }
}