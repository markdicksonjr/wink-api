import * as request from 'request';
import {ResponseUtil} from "../util/response";

export class UpdateRobot {

    public static execute(params: WinkAPI.IRobotIdRequestParameters, robot: WinkAPI.IRobot): Promise<WinkAPI.IRobot> {
        return new Promise<WinkAPI.IRobot>((resolve, reject) => {
            request.post({
                url: params.host +
                '/robots' +
                '/' + params.robot_id,
                json: robot,
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