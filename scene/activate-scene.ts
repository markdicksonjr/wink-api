import * as request from 'request';
import {ResponseUtil} from "../util/response";

export class ActivateScene {

    public static execute(params: WinkAPI.ISceneIdRequestParameters): Promise<WinkAPI.IUserSceneResponse> {
        return new Promise<WinkAPI.IUserSceneResponse>((resolve, reject) => {
            request.post({
                url: params.host +
                '/scenes' +
                '/' + params.scene_id +
                '/activate',
                json: {},
                headers: {
                    Authorization: 'Bearer ' + params.access_token
                }
            }, (error, response, body) => {
                let responseCodeError: WinkAPI.IRequestError = ResponseUtil.getErrorFromResponse(200, error, response, body);
                if (responseCodeError) {
                    return reject(responseCodeError);
                }

                resolve(body);
            });
        });
    }
}