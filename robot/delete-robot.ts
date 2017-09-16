import * as request from 'request';
import {RequestResponse} from "request";
import {ResponseUtil} from "../util/response";

export class DeleteRobot {

    public static execute(params: WinkAPI.IRobotIdRequestParameters): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            request.delete({
                url: params.host +
                '/robots' +
                '/' + params.robot_id,
                json: {},
                headers: {
                    Authorization: 'Bearer ' + params.access_token
                }
            }, (error: any, response: RequestResponse, body: any) => {
                let responseCodeError: WinkAPI.IRequestError = ResponseUtil.getErrorFromResponse(204, error, response, body);
                if (responseCodeError) {
                    return reject(responseCodeError);
                }

                resolve(body);
            });
        });
    }
}