import {ResponseUtil} from "../../util/response";

describe('Response Util', () => {

    it('should reject when an error is a truthy string', () => {
        let error = ResponseUtil.getErrorFromResponse(200, "test error", { statusCode: 404} as any, null);
        expect(error.message).toEqual("test error");
        expect(error.statusCode).toEqual(404);
    });

    it('should reject with a 500 response code when an error is returned and the response code is not set in the response', () => {
        let error = ResponseUtil.getErrorFromResponse(200, "test error", {} as any, null);
        expect(error.message).toEqual("test error");
        expect(error.statusCode).toEqual(500);
    });

    it('should reject with a 500 response code when an error is returned and the response is not set', () => {
        let error = ResponseUtil.getErrorFromResponse(200, "test error", null, null);
        expect(error.message).toEqual("test error");
        expect(error.statusCode).toEqual(500);
    });

    it('should properly delegate an ultimately non-erroneous result of getErrorFromResponse to getErrorIfStatusCodeIncorrect if no error is set', () => {
        let getErrorIfStatusCodeIncorrectSpy = spyOn(ResponseUtil, 'getErrorIfStatusCodeIncorrect').and.returnValue(null);
        let error = ResponseUtil.getErrorFromResponse(200, null, null, null);
        expect(error).toBeNull();
        expect(getErrorIfStatusCodeIncorrectSpy).toHaveBeenCalled();
    });

    it('should properly delegate an ultimately erroneous result of getErrorFromResponse to getErrorIfStatusCodeIncorrect if no error is set', () => {
        let getErrorIfStatusCodeIncorrectSpy = spyOn(ResponseUtil, 'getErrorIfStatusCodeIncorrect').and.returnValue({
            message: "sample",
            statusCode: 404
        });
        let error = ResponseUtil.getErrorFromResponse(200, null, null, null);
        expect(error.message).toEqual("sample");
        expect(error.statusCode).toEqual(404);
        expect(getErrorIfStatusCodeIncorrectSpy).toHaveBeenCalled();
    });

    // TODO getErrorIfStatusCodeIncorrect results
});