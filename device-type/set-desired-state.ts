import * as request from 'request';

export class SetDesiredState {

    public static set(host: string, access_token: string, object_id: string, object_type: string, state: any) {
        return new Promise<void>((resolve, reject) => {
            request.put({
                url: host + '/' + object_type + '/' + object_id + '/desired_state',
                json: {
                    desired_state: state
                },
                headers: {
                    Authorization: 'Bearer ' + access_token
                }
            }, (error, response, body) => {
                if(error) {
                    return reject(error.message || error.stack || error);
                }

                if(response.statusCode !== 200) {
                    return reject('non-200 status code received: ' + response.statusCode);
                }

                resolve();
            });
        });
    }
}