import * as request from 'request';
import {ObjectTypeUtil} from "./object-type-util";

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
                if(error) {
                    return reject({
                        statusCode: (response ? response.statusCode || 500 : 500),
                        message: error.message || error.stack || error
                    } as WinkAPI.IRequestError);
                }

                if(!response || response.statusCode !== 200) {
                    return reject({
                        statusCode: (response ? response.statusCode || 500 : 500),
                        message: body && body.errors && body.errors[0] ? body.errors[0] : 'response code = ' + response.statusCode
                    } as WinkAPI.IRequestError);
                }

                resolve();
            });
        });
    }
}