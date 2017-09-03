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
                        statusCode: response.statusCode,
                        message: error.message || error.stack || error
                    });
                }

                if (response.statusCode !== 200) {
                    return reject({
                        statusCode: response.statusCode,
                        message: error.message || error.stack || error
                    });
                }

                resolve(body);
            });
        });
    }
}