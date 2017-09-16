import * as request from 'request';
import {ObjectTypeUtil} from "./object-type-util";
import {ResponseUtil} from "../util/response";

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
                let responseCodeError: WinkAPI.IRequestError = ResponseUtil.getErrorFromResponse(204, error, response, body);
                if (responseCodeError) {
                    return reject(responseCodeError);
                }

                resolve(body);
            });
        });
    }
}