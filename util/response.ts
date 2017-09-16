import {RequestResponse} from "request";

export class ResponseUtil {

    public static getErrorFromResponse(desiredStatusCode: number, error: any, response: RequestResponse, body: any) {
        if (error) {
            return {
                statusCode: (response ? response.statusCode || 500 : 500),
                message: error.message || error.stack || error
            } as WinkAPI.IRequestError;
        }

        let responseCodeError: WinkAPI.IRequestError = ResponseUtil.getErrorIfStatusCodeIncorrect(desiredStatusCode, response, body);
        if (responseCodeError) {
            return responseCodeError;
        }

        return null;
    }

    public static getErrorIfStatusCodeIncorrect(desiredStatusCode: number, response: RequestResponse, body: any) {
        if(!response || response.statusCode !== desiredStatusCode) {
            return {
                statusCode: (response ? response.statusCode || 500 : 500),
                message: body && body.errors && body.errors[0] ? body.errors[0] : 'response code = ' + (response ? response.statusCode || 500 : 500)
            } as WinkAPI.IRequestError;
        }

        return null;
    }
}