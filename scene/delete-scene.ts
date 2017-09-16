import * as request from 'request';
import {ResponseUtil} from "../util/response";

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
                let responseCodeError: WinkAPI.IRequestError = ResponseUtil.getErrorFromResponse(204, error, response, body);
                if(responseCodeError) {
                    return reject(responseCodeError);
                }

                resolve(body);
            });
        });
    }
}