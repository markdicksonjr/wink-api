import * as request from 'request';

export class Devices {

    public static list(auth: WinkAPI.IAuthenticatedRequestParameters): Promise<WinkAPI.IUserDevicesResponse> {
        return new Promise<WinkAPI.IUserDevicesResponse>((resolve, reject) => {
            request.get({
                url: auth.host + '/users/me/wink_devices',
                json: {},
                headers: {
                    Authorization: 'Bearer ' + auth.access_token
                }
            }, (error, response, body) => {
                if (error) {
                    return reject(error.message || error.stack || error);
                }

                if (response.statusCode !== 200) {
                    return reject('non-200 status code received: ' + response.statusCode);
                }

                resolve(body);
            });
        });
    }
}