import * as request from 'request';
import {RequestResponse} from "request";
import {ResponseUtil} from "../util/response";

export class DeleteGroup {

    public static execute(params: WinkAPI.IGroupIdRequestParameters): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            request.delete({
                url: params.host +
                '/groups' +
                '/' + params.group_id,
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