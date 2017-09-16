import * as request from 'request';
import {ResponseUtil} from "../util/response";

export class GetRobot {

    public static execute(params: WinkAPI.IRobotIdRequestParameters): Promise<WinkAPI.IRobot> {
        return new Promise<WinkAPI.IRobot>((resolve, reject) => {
            request.get({
                url: params.host + '/robots/' + params.robot_id,
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