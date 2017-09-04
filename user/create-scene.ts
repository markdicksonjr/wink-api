import * as request from 'request';

export class CreateScene {

    public static execute(auth: WinkAPI.IAuthenticatedRequestParameters, scene: WinkAPI.IScene): Promise<WinkAPI.IUserResponse> {
        return new Promise<WinkAPI.IUserResponse>((resolve, reject) => {
            request.post({
                url: auth.host + '/users/me/scenes',
                json: scene,
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
                        message: body && body.errors ? body.errors[0] : 'response code = ' + response.statusCode
                    });
                }

                resolve(body);
            });
        });
    }
}