import * as request from 'request';

export class GetDevices {

    public static execute(auth: WinkAPI.IAuthenticatedRequestParameters): Promise<WinkAPI.IUserDevicesResponse> {
        return new Promise<WinkAPI.IUserDevicesResponse>((resolve, reject) => {
            request.get({
                url: auth.host + '/users/me/wink_devices',
                json: {},
                headers: {
                    Authorization: 'Bearer ' + auth.access_token
                }
            }, (error, response, body) => {
                if (error) {
                    return reject({
                        statusCode: response.statusCode,
                        message: error.message || error.stack || error
                    } as WinkAPI.IRequestError);
                }

                if (response.statusCode !== 200) {
                    return reject({
                        statusCode: response.statusCode,
                        message: body && body.errors && body.errors[0] ? body.errors[0] : 'response code = ' + response.statusCode
                    } as WinkAPI.IRequestError);
                }

                resolve(body);
            });
        });
    }
}