import * as request from 'request';
import {ObjectTypeUtil} from "./object-type-util";

export class ShareDevice {

    public static execute(params: WinkAPI.IObjectIdRequestParameters, email: string): Promise<WinkAPI.IUser[]> {
        return new Promise<WinkAPI.IUser[]>((resolve, reject) => {
            request.post({
                url: params.host +
                '/' + params.object_type + ObjectTypeUtil.pluralizeObjectType(params.object_type) +
                '/' + params.object_id +
                '/users',
                json: {
                    email: email
                },
                headers: {
                    Authorization: 'Bearer ' + params.access_token
                }
            }, (error, response, body) => {
                if(error) {
                    return reject(error.message || error.stack || error);
                }

                if(response.statusCode !== 200) {
                    return reject('non-200 status code received: ' + response.statusCode);
                }

                resolve(body);
            });
        });
    }
}