import * as request from 'request';
import {ResponseUtil} from "../util/response";

export class GetScenes {

    public static execute(auth: WinkAPI.IAuthenticatedRequestParameters): Promise<WinkAPI.IUserScenesResponse> {
        return new Promise<WinkAPI.IUserScenesResponse>((resolve, reject) => {
            request.get({
                url: auth.host + '/users/me/scenes',
                json: {},
                headers: {
                    Authorization: 'Bearer ' + auth.access_token
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