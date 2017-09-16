import * as request from 'request';
import {ResponseUtil} from "../util/response";

export class CreateGroup {

    public static execute(auth: WinkAPI.IAuthenticatedRequestParameters, group: WinkAPI.IGroup): Promise<WinkAPI.IUserResponse> {
        return new Promise<WinkAPI.IUserResponse>((resolve, reject) => {
            request.post({
                url: auth.host + '/users/me/groups',
                json: group,
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