import {RequestResponse} from "request";
let proxyquire = require('proxyquire');

let MockRequestModule = {
    get: () => {}
};

let GetDevicesModule = proxyquire('../../user/get-devices', {
    "request": MockRequestModule
});

describe('Get Group', () => {

    it('should handle an error response with text an reject properly', (done) => {
        let getSpy = spyOn(MockRequestModule, 'get').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb("string error", {
                statusCode: 404
            } as any, {});
        });

        GetDevicesModule.GetDevices.execute({
            host: 'https://api.fake.wink.com',
            access_token: 'JUNKTOKEN'
        }).then(() => {
            fail();
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            expect(getSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/users/me/wink_devices', json: {}, headers: { Authorization: 'Bearer JUNKTOKEN' } }, jasmine.any(Function));
            expect(err.statusCode).toEqual(404);
            expect(err.message).toEqual('string error');
            done();
        });
    });

    it('should handle an error response with a stack and reject properly', (done) => {
        let getSpy = spyOn(MockRequestModule, 'get').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb({
                stack: "error stack"
            }, {
                statusCode: 404
            } as any, {});
        });

        GetDevicesModule.GetDevices.execute({
            host: 'https://api.fake.wink.com',
            access_token: 'JUNKTOKEN'
        }).then(() => {
            fail();
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            expect(getSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/users/me/wink_devices', json: {}, headers: { Authorization: 'Bearer JUNKTOKEN' } }, jasmine.any(Function));
            expect(err.statusCode).toEqual(404);
            expect(err.message).toEqual('error stack');
            done();
        });
    });

    it('should handle an error response with a message property and reject properly', (done) => {
        let getSpy = spyOn(MockRequestModule, 'get').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb({
                message: "error message"
            }, {
                statusCode: 404
            } as any, {});
        });

        GetDevicesModule.GetDevices.execute({
            host: 'https://api.fake.wink.com',
            access_token: 'JUNKTOKEN'
        }).then(() => {
            fail();
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            expect(getSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/users/me/wink_devices', json: {}, headers: { Authorization: 'Bearer JUNKTOKEN' } }, jasmine.any(Function));
            expect(err.statusCode).toEqual(404);
            expect(err.message).toEqual('error message');
            done();
        });
    });

    it('should handle a non-200 status code with an error in the body from the response properly', (done) => {
        let getSpy = spyOn(MockRequestModule, 'get').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb(null, {
                statusCode: 204
            } as any, {
                errors: ["some error"]
            });
        });

        GetDevicesModule.GetDevices.execute({
            host: 'https://api.fake.wink.com',
            access_token: 'JUNKTOKEN'
        }).then(() => {
            fail();
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            expect(getSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/users/me/wink_devices', json: {}, headers: { Authorization: 'Bearer JUNKTOKEN' } }, jasmine.any(Function));
            expect(err.statusCode).toEqual(204);
            expect(err.message).toEqual('some error');
            done();
        });
    });

    it('should handle a non-200 status code with an empty error list in the body from the response properly', (done) => {
        let getSpy = spyOn(MockRequestModule, 'get').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb(null, {
                statusCode: 204
            } as any, {
                errors: []
            });
        });

        GetDevicesModule.GetDevices.execute({
            host: 'https://api.fake.wink.com',
            access_token: 'JUNKTOKEN'
        }).then(() => {
            fail();
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            expect(getSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/users/me/wink_devices', json: {}, headers: { Authorization: 'Bearer JUNKTOKEN' } }, jasmine.any(Function));
            expect(err.statusCode).toEqual(204);
            expect(err.message).toEqual('response code = 204');
            done();
        });
    });

    it('should handle a non-200 status code with no error list in the body from the response properly', (done) => {
        let getSpy = spyOn(MockRequestModule, 'get').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb(null, {
                statusCode: 204
            } as any, {
            });
        });

        GetDevicesModule.GetDevices.execute({
            host: 'https://api.fake.wink.com',
            access_token: 'JUNKTOKEN'
        }).then(() => {
            fail();
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            expect(getSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/users/me/wink_devices', json: {}, headers: { Authorization: 'Bearer JUNKTOKEN' } }, jasmine.any(Function));
            expect(err.statusCode).toEqual(204);
            expect(err.message).toEqual('response code = 204');
            done();
        });
    });

    it('should handle a 200 status code properly', (done) => {
        let getSpy = spyOn(MockRequestModule, 'get').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb(null, {
                statusCode: 200
            } as any, {
            });
        });

        GetDevicesModule.GetDevices.execute({
            host: 'https://api.fake.wink.com',
            access_token: 'JUNKTOKEN'
        }).then(() => {
            expect(getSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/users/me/wink_devices', json: {}, headers: { Authorization: 'Bearer JUNKTOKEN' } }, jasmine.any(Function));
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            fail(err);
            done();
        });
    });
});