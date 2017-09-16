import * as request from 'request';
import {ResponseUtil} from "../util/response";

export class CreateUser {

    public static execute(params: WinkAPI.ICreateUserRequestParameters): Promise<WinkAPI.IUserResponse> {
        return new Promise<WinkAPI.IUserResponse>((resolve, reject) => {
            request.post({
                url: params.host + '/users',
                json: {
                    "client_id": params.client_id,
                    "client_secret": params.client_secret,
                    "email": params.email,
                    "first_name": params.first_name,
                    "last_name": params.last_name,
                    "locale": params.locale,
                    "new_password": params.new_password
                },
                headers: {
                    Authorization: 'Bearer ' + params.access_token
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