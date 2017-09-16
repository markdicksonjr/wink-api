import * as request from 'request';
import {RequestResponse} from "request";
import {ResponseUtil} from "../util/response";

export class GetGroup {

    public static execute(params: WinkAPI.IGroupIdRequestParameters): Promise<WinkAPI.IUserGroupResponse> {
        return new Promise<WinkAPI.IUserGroupResponse>((resolve, reject) => {
            request.get({
                url: params.host +
                '/groups' +
                '/' + params.group_id,
                json: {},
                headers: {
                    Authorization: 'Bearer ' + params.access_token
                }
            }, (error: any, response: RequestResponse, body: any) => {
                let responseCodeError: WinkAPI.IRequestError = ResponseUtil.getErrorFromResponse(200, error, response, body);
                if (responseCodeError) {
                    return reject(responseCodeError);
                }

                resolve(body);
            });
        });
    }
}