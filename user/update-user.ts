import * as request from 'request';

export class UpdateUser {

    public static execute(auth: WinkAPI.IUserRequestParameters): Promise<WinkAPI.IUserResponse> {
        return new Promise<WinkAPI.IUserResponse>((resolve, reject) => {
            request.put({
                url: auth.host + '/users',
                json: {

                },
                headers: {
                    Authorization: 'Bearer ' + auth.access_token
                }
            }, (error, response, body) => {
                if (error) {
                    return reject({
                        statusCode: (response ? response.statusCode || 500 : 500),
                        message: error.message || error.stack || error
                    } as WinkAPI.IRequestError);
                }

                if (!response || response.statusCode !== 200) {
                    return reject({
                        statusCode: (response ? response.statusCode || 500 : 500),
                        message: body && body.errors && body.errors[0] ? body.errors[0] : 'response code = ' + response.statusCode
                    } as WinkAPI.IRequestError);
                }

                resolve(body);
            });
        });
    }
}