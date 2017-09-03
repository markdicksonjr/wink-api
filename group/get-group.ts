import * as request from 'request';
import {RequestResponse} from "request";

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
                if(error) {
                    return reject({
                        statusCode: response.statusCode,
                        message: error.message || error.stack || error
                    });
                }

                if(response.statusCode !== 200) {
                    return reject({
                        statusCode: response.statusCode,
                        message: error.message || error.stack || error
                    });
                }

                resolve(body);
            });
        });
    }
}