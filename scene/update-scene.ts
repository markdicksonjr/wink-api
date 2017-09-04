import * as request from 'request';

export class UpdateScene {

    public static execute(params: WinkAPI.ISceneIdRequestParameters, scene: WinkAPI.IScene): Promise<WinkAPI.IUserSceneResponse> {
        return new Promise<WinkAPI.IUserSceneResponse>((resolve, reject) => {
            request.post({
                url: params.host +
                '/scenes' +
                '/' + params.scene_id,
                json: scene,
                headers: {
                    Authorization: 'Bearer ' + params.access_token
                }
            }, (error, response, body) => {
                if(error) {
                    return reject({
                        statusCode: response.statusCode,
                        message: error.message || error.stack || error
                    });
                }

                if(response.statusCode !== 200) {
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