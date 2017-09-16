import * as request from 'request';
import {ResponseUtil} from "../util/response";

export class UpdateGroupState {

    public static execute(params: WinkAPI.IGroupIdRequestParameters, state: any): Promise<WinkAPI.IUserGroupResponse> {
        return new Promise<WinkAPI.IUserGroupResponse>((resolve, reject) => {
            request.post({
                url: params.host +
                '/groups' +
                '/' + params.group_id +
                '/activate',
                json: {
                    desired_state: state
                },
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