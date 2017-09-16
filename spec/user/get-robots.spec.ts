import {RequestResponse} from "request";
let proxyquire = require('proxyquire');

let MockRequestModule = {
    get: () => {}
};

let MockResponseUtilModule = {
    ResponseUtil: {
        getErrorFromResponse: () => {}
    }
};

let GetRobotsModule = proxyquire('../../user/get-robots', {
    "request": MockRequestModule,
    "../util/response": MockResponseUtilModule
});

describe('Get Robots', () => {

    it('should reject when the response utility handler says it should', (done) => {
        let getErrorFromResponseSpy = spyOn(MockResponseUtilModule.ResponseUtil, 'getErrorFromResponse').and.returnValue({
            statusCode: 404,
            message: 'string error'
        });

        let getSpy = spyOn(MockRequestModule, 'get').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb("string error", {
                statusCode: 404
            } as any, {});
        });

        GetRobotsModule.GetRobots.execute({
            host: 'https://api.fake.wink.com',
            access_token: 'JUNKTOKEN'
        }).then(() => {
            fail();
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            expect(getErrorFromResponseSpy).toHaveBeenCalledWith(200, "string error", { statusCode: 404 }, {});
            expect(getSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/users/me/robots', json: {}, headers: { Authorization: 'Bearer JUNKTOKEN' } }, jasmine.any(Function));
            expect(err.statusCode).toEqual(404);
            expect(err.message).toEqual('string error');
            done();
        });
    });

    it('should handle a 200 status code properly', (done) => {
        let getErrorFromResponseSpy = spyOn(MockResponseUtilModule.ResponseUtil, 'getErrorFromResponse').and.returnValue(null);

        let getSpy = spyOn(MockRequestModule, 'get').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb(null, {
                statusCode: 200
            } as any, {
            });
        });

        GetRobotsModule.GetRobots.execute({
            host: 'https://api.fake.wink.com',
            access_token: 'JUNKTOKEN'
        }).then(() => {
            expect(getErrorFromResponseSpy).toHaveBeenCalledWith(200, null, { statusCode: 200 }, {});
            expect(getSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/users/me/robots', json: {}, headers: { Authorization: 'Bearer JUNKTOKEN' } }, jasmine.any(Function));
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            fail(err);
            done();
        });
    });
});