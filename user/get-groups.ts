import * as request from 'request';

export class GetGroups {

    public static execute(auth: WinkAPI.IAuthenticatedRequestParameters): Promise<WinkAPI.IUserGroupsResponse> {
        return new Promise<WinkAPI.IUserGroupsResponse>((resolve, reject) => {
            request.get({
                url: auth.host + '/users/me/groups',
                json: {},
                headers: {
                    Authorization: 'Bearer ' + auth.access_token
                }
            }, (error, response, body) => {
                if (error) {
                    return reject({
                        statusCode: (response ? response.statusCode || 500 : 500),
                        message: error.message || error.stack || error
                    } as WinkAPI.IRequestError);
                }

                if (!response || response.statusCode !== 200) {
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