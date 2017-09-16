import * as request from 'request';

export class GetScene {

    public static execute(params: WinkAPI.ISceneIdRequestParameters): Promise<WinkAPI.IUserSceneResponse> {
        return new Promise<WinkAPI.IUserSceneResponse>((resolve, reject) => {
            request.get({
                url: params.host + '/users/me/scenes/' + params.scene_id,
                json: {},
                headers: {
                    Authorization: 'Bearer ' + params.access_token
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