import * as request from 'request';
import {ObjectTypeUtil} from "./object-type-util";
import {ResponseUtil} from "../util/response";

export class ShareDevice {

    public static execute(params: WinkAPI.IObjectIdRequestParameters, email: string): Promise<WinkAPI.IDeviceUser[]> {
        return new Promise<WinkAPI.IDeviceUser[]>((resolve, reject) => {
            request.post({
                url: params.host +
                '/' + ObjectTypeUtil.pluralizeObjectType(params.object_type) +
                '/' + params.object_id +
                '/users',
                json: {
                    email: email
                },
                headers: {
                    Authorization: 'Bearer ' + params.access_token
                }
            }, (error, response, body) => {
                let responseCodeError: WinkAPI.IRequestError = ResponseUtil.getErrorFromResponse(200, error, response, body);
                if (responseCodeError) {
                    return reject(responseCodeError);
                }

                resolve(body);
            });
        });
    }
}