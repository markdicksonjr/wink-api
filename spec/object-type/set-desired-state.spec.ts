import {RequestResponse} from "request";
let proxyquire = require('proxyquire');

let MockRequestModule = {
    put: () => {}
};

let MockResponseUtilModule = {
    ResponseUtil: {
        getErrorFromResponse: () => {}
    }
};

let SetDesiredStateModule = proxyquire('../../object-type/set-desired-state', {
    "request": MockRequestModule,
    "../util/response": MockResponseUtilModule
});

describe('Set Desired State', () => {

    it('should reject when the response utility handler says it should', (done) => {
        let getErrorFromResponseSpy = spyOn(MockResponseUtilModule.ResponseUtil, 'getErrorFromResponse').and.returnValue({
            statusCode: 404,
            message: 'string error'
        });

        let updateSpy = spyOn(MockRequestModule, 'put').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb("string error", {
                statusCode: 404
            } as any, {});
        });

        SetDesiredStateModule.SetDesiredState.execute({
            host: 'https://api.fake.wink.com',
            object_type: 'lock',
            object_id: '564',
            access_token: 'JUNKTOKEN'
        }, {
            locked: true
        }).then(() => {
            fail();
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            expect(getErrorFromResponseSpy).toHaveBeenCalledWith(200, "string error", { statusCode: 404 }, {});
            expect(updateSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/locks/564/desired_state', json: { desired_state: {locked: true}}, headers: { Authorization: 'Bearer JUNKTOKEN' } }, jasmine.any(Function));
            expect(err.statusCode).toEqual(404);
            expect(err.message).toEqual('string error');
            done();
        });
    });

    it('should handle a 200 status code properly', (done) => {
        let getErrorFromResponseSpy = spyOn(MockResponseUtilModule.ResponseUtil, 'getErrorFromResponse').and.returnValue(null);

        let updateSpy = spyOn(MockRequestModule, 'put').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb(null, {
                statusCode: 200
            } as any, {
            });
        });

        SetDesiredStateModule.SetDesiredState.execute({
            host: 'https://api.fake.wink.com',
            object_type: 'lock',
            object_id: '564',
            access_token: 'JUNKTOKEN'
        }, {
            locked: true
        }).then(() => {
            expect(getErrorFromResponseSpy).toHaveBeenCalledWith(200, null, { statusCode: 200 }, {});
            expect(updateSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/locks/564/desired_state', json: { desired_state: {locked: true}}, headers: { Authorization: 'Bearer JUNKTOKEN' } }, jasmine.any(Function));
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            fail(err);
            done();
        });
    });
});