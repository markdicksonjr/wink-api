import * as request from 'request';
import {ObjectTypeUtil} from "./object-type-util";

export class GetDevice {

    public static execute(params: WinkAPI.IObjectIdRequestParameters): Promise<WinkAPI.IDevice> {
        return new Promise<WinkAPI.IDevice>((resolve, reject) => {
            request.get({
                url: params.host +
                    '/' + params.object_type + ObjectTypeUtil.pluralizeObjectType(params.object_type) +
                    '/' + params.object_id,
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
                        message: body && body.errors ? body.errors[0] : 'response code = ' + response.statusCode
                    });
                }

                resolve(body);
            });
        });
    }
}