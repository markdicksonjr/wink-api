import * as request from 'request';

export class Groups {

    public static list(auth: WinkAPI.IAuthenticatedRequestParameters): Promise<WinkAPI.IUserGroupsResponse> {
        return new Promise<WinkAPI.IUserGroupsResponse>((resolve, reject) => {
            request.get({
                url: auth.host + '/users/me/groups',
                json: {},
                headers: {
                    Authorization: 'Bearer ' + auth.access_token
                }
            }, (error, response, body) => {
                if (error) {
                    return reject(error.message || error.stack || error);
                }

                if (response.statusCode !== 200) {
                    return reject('non-200 status code received: ' + response.statusCode);
                }

                resolve(body);
            });
        });
    }
}