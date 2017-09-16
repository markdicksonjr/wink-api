import * as request from 'request';

export class UpdateRobot {

    public static execute(params: WinkAPI.IRobotIdRequestParameters, robot: WinkAPI.IRobot): Promise<WinkAPI.IRobot> {
        return new Promise<WinkAPI.IRobot>((resolve, reject) => {
            request.post({
                url: params.host +
                '/robots' +
                '/' + params.robot_id,
                json: robot,
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