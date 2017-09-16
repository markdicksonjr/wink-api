import * as request from 'request';
import {ResponseUtil} from "../util/response";

export class UpdateUser {

    public static execute(params: WinkAPI.IUpdateUserRequestParameters): Promise<WinkAPI.IUserResponse> {
        return new Promise<WinkAPI.IUserResponse>((resolve, reject) => {
            request.put({
                url: params.host + '/users/' + params.user_id,
                json: {
                    "email": params.email
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