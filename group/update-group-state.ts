import * as request from 'request';

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
                if(error) {
                    return reject({
                        statusCode: (response ? response.statusCode || 500 : 500),
                        message: error.message || error.stack || error
                    } as WinkAPI.IRequestError);
                }

                if(!response || response.statusCode !== 200) {
                    return reject({
                        statusCode: (response ? response.statusCode || 500 : 500),
                        message: body && body.errors && body.errors[0] ? body.errors[0] : 'response code = ' + response.statusCode
                    } as WinkAPI.IRequestError);
                }

                resolve(body);
            });
        });
    }
}