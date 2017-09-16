import * as request from 'request';
import {ObjectTypeUtil} from "./object-type-util";
import {ResponseUtil} from "../util/response";

export class SetDesiredState {

    public static execute(params: WinkAPI.IObjectIdRequestParameters, state: any): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            request.put({
                url: params.host +
                '/' + ObjectTypeUtil.pluralizeObjectType(params.object_type) +
                '/' + params.object_id +
                '/desired_state',
                json: {
                    desired_state: state
                },
                headers: {
                    Authorization: 'Bearer ' + params.access_token
                }
            }, (error, response, body) => {
                let responseCodeError: WinkAPI.IRequestError = ResponseUtil.getErrorFromResponse(200, error, response, body);
                if (responseCodeError) {
                    return reject(responseCodeError);
                }

                resolve();
            });
        });
    }
}