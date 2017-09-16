import * as request from 'request';
import {ObjectTypeUtil} from "./object-type-util";
import {ResponseUtil} from "../util/response";

export class GetDevice {

    public static execute(params: WinkAPI.IObjectIdRequestParameters): Promise<WinkAPI.IUserDeviceResponse> {
        return new Promise<WinkAPI.IUserDeviceResponse>((resolve, reject) => {
            request.get({
                url: params.host +
                    '/' + ObjectTypeUtil.pluralizeObjectType(params.object_type) +
                    '/' + params.object_id,
                json: {},
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