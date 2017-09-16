import {RequestResponse} from "request";
let proxyquire = require('proxyquire');

let MockRequestModule = {
    delete: () => {}
};

let MockResponseUtilModule = {
    ResponseUtil: {
        getErrorFromResponse: () => {}
    }
};

let UnshareDeviceModule = proxyquire('../../object-type/unshare-device', {
    "request": MockRequestModule,
    "../util/response": MockResponseUtilModule
});

describe('Unshare Device', () => {

    it('should reject when the response utility handler says it should', (done) => {
        let getErrorFromResponseSpy = spyOn(MockResponseUtilModule.ResponseUtil, 'getErrorFromResponse').and.returnValue({
            statusCode: 404,
            message: 'string error'
        });

        let updateSpy = spyOn(MockRequestModule, 'delete').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb("string error", {
                statusCode: 404
            } as any, {});
        });

        UnshareDeviceModule.UnshareDevice.execute({
            host: 'https://api.fake.wink.com',
            object_type: 'lock',
            object_id: '564',
            access_token: 'JUNKTOKEN'
        }, "test@example.com").then(() => {
            fail();
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            expect(getErrorFromResponseSpy).toHaveBeenCalledWith(204, "string error", { statusCode: 404 }, {});
            expect(updateSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/locks/564/users/test@example.com', json: {}, headers: { Authorization: 'Bearer JUNKTOKEN' } }, jasmine.any(Function));
            expect(err.statusCode).toEqual(404);
            expect(err.message).toEqual('string error');
            done();
        });
    });

    it('should handle a 200 status code properly', (done) => {
        let getErrorFromResponseSpy = spyOn(MockResponseUtilModule.ResponseUtil, 'getErrorFromResponse').and.returnValue(null);

        let updateSpy = spyOn(MockRequestModule, 'delete').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb(null, {
                statusCode: 204
            } as any, {
            });
        });

        UnshareDeviceModule.UnshareDevice.execute({
            host: 'https://api.fake.wink.com',
            object_type: 'lock',
            object_id: '564',
            access_token: 'JUNKTOKEN'
        }, "test@example.com").then(() => {
            expect(getErrorFromResponseSpy).toHaveBeenCalledWith(204, null, { statusCode: 204 }, {});
            expect(updateSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/locks/564/users/test@example.com', json: {}, headers: { Authorization: 'Bearer JUNKTOKEN' } }, jasmine.any(Function));
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            fail(err);
            done();
        });
    });
});