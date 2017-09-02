import * as request from 'request';

export class GetDevice {

    public static get(host: string, access_token: string, object_id: string, object_type: string): Promise<WinkAPI.IDevice> {
        return new Promise<WinkAPI.IDevice>((resolve, reject) => {
            request.get({
                url: host + '/' + object_type + 's/' + object_id,
                json: {},
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

                resolve(body);
            });
        });
    }
}