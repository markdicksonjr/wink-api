import * as request from 'request';

export class DeleteScene {

    public static execute(params: WinkAPI.ISceneIdRequestParameters): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            request.delete({
                url: params.host +
                '/scenes' +
                '/' + params.scene_id,
                json: {},
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

                if(response.statusCode !== 204) {
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