import * as request from 'request';
import {ResponseUtil} from "../util/response";

export class CreateUser {

    public static execute(auth: WinkAPI.ICreateUserRequestParameters): Promise<WinkAPI.IUserResponse> {
        return new Promise<WinkAPI.IUserResponse>((resolve, reject) => {
            request.post({
                url: auth.host + '/users',
                json: {

                },
                headers: {
                    Authorization: 'Bearer ' + auth.access_token
                }
            }, (error, response, body) => {
                let responseCodeError: WinkAPI.IRequestError = ResponseUtil.getErrorFromResponse(201, error, response, body);
                if(responseCodeError) {
                    return reject(responseCodeError);
                }

                resolve(body);
            });
        });
    }
}