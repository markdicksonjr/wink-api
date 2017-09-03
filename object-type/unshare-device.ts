import * as request from 'request';
import {ObjectTypeUtil} from "./object-type-util";

export class UnshareDevice {

    public static execute(params: WinkAPI.IObjectIdRequestParameters, email: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            request.delete({
                url: params.host +
                '/' + ObjectTypeUtil.pluralizeObjectType(params.object_type) +
                '/' + params.object_id +
                '/users' +
                '/' + email,
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

                if(response.statusCode !== 204) {
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