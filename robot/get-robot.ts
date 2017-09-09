import * as request from 'request';

export class GetRobot {

    public static execute(params: WinkAPI.IRobotIdRequestParameters): Promise<WinkAPI.IRobot> {
        return new Promise<WinkAPI.IRobot>((resolve, reject) => {
            request.get({
                url: params.host + '/users/robots/' + params.robot_id,
                json: {},
                headers: {
                    Authorization: 'Bearer ' + params.access_token
                }
            }, (error, response, body) => {
                if (error) {
                    return reject({
                        statusCode: response.statusCode,
                        message: error.message || error.stack || error
                    });
                }

                if (response.statusCode !== 200) {
                    return reject({
                        statusCode: response.statusCode,
                        message: body && body.errors ? body.errors[0] : 'response code = ' + response.statusCode
                    });
                }

                resolve(body);
            });
        });
    }
}