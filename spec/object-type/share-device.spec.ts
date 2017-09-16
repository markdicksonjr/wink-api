import {RequestResponse} from "request";
let proxyquire = require('proxyquire');

let MockRequestModule = {
    post: () => {}
};

let MockResponseUtilModule = {
    ResponseUtil: {
        getErrorFromResponse: () => {}
    }
};

let ShareDeviceModule = proxyquire('../../object-type/share-device', {
    "request": MockRequestModule,
    "../util/response": MockResponseUtilModule
});

describe('Share Device', () => {

    it('should reject when the response utility handler says it should', (done) => {
        let getErrorFromResponseSpy = spyOn(MockResponseUtilModule.ResponseUtil, 'getErrorFromResponse').and.returnValue({
            statusCode: 404,
            message: 'string error'
        });

        let updateSpy = spyOn(MockRequestModule, 'post').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb("string error", {
                statusCode: 404
            } as any, {});
        });

        ShareDeviceModule.ShareDevice.execute({
            host: 'https://api.fake.wink.com',
            object_type: 'lock',
            object_id: '564',
            access_token: 'JUNKTOKEN'
        }, "test@example.com").then(() => {
            fail();
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            expect(getErrorFromResponseSpy).toHaveBeenCalledWith(200, "string error", { statusCode: 404 }, {});
            expect(updateSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/locks/564/users', json: { email: "test@example.com"}, headers: { Authorization: 'Bearer JUNKTOKEN' } }, jasmine.any(Function));
            expect(err.statusCode).toEqual(404);
            expect(err.message).toEqual('string error');
            done();
        });
    });

    it('should handle a 200 status code properly', (done) => {
        let getErrorFromResponseSpy = spyOn(MockResponseUtilModule.ResponseUtil, 'getErrorFromResponse').and.returnValue(null);

        let updateSpy = spyOn(MockRequestModule, 'post').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb(null, {
                statusCode: 200
            } as any, {
            });
        });

        ShareDeviceModule.ShareDevice.execute({
            host: 'https://api.fake.wink.com',
            object_type: 'lock',
            object_id: '564',
            access_token: 'JUNKTOKEN'
        }, "test@example.com").then(() => {
            expect(getErrorFromResponseSpy).toHaveBeenCalledWith(200, null, { statusCode: 200 }, {});
            expect(updateSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/locks/564/users', json: { email: "test@example.com"}, headers: { Authorization: 'Bearer JUNKTOKEN' } }, jasmine.any(Function));
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            fail(err);
            done();
        });
    });
});