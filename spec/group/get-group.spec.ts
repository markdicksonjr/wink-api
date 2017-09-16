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

let GetGroupModule = proxyquire('../../group/get-group', {
    "request": MockRequestModule,
    "../util/response": MockResponseUtilModule
});

describe('Get Group', () => {

    it('should reject when the response utility handler says it should', (done) => {
        let getErrorFromResponseSpy = spyOn(MockResponseUtilModule.ResponseUtil, 'getErrorFromResponse').and.returnValue({
            statusCode: 404,
            message: 'string error'
        });

        let getSpy = spyOn(MockRequestModule, 'get').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb(null, null, null);
        });

        GetGroupModule.GetGroup.execute({
            host: 'https://api.fake.wink.com',
            group_id: '987345',
            access_token: 'BUNKTOKEN'
        }).then(() => {
            fail();
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            expect(getErrorFromResponseSpy).toHaveBeenCalledWith(200, null, null, null);
            expect(getSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/groups/987345', json: {}, headers: { Authorization: 'Bearer BUNKTOKEN' } }, jasmine.any(Function));
            expect(err.statusCode).toEqual(404);
            expect(err.message).toEqual('string error');
            done();
        });
    });

    it('should handle a 200 status code with a response body properly', (done) => {
        let getErrorFromResponseSpy = spyOn(MockResponseUtilModule.ResponseUtil, 'getErrorFromResponse').and.returnValue(null);

        let getSpy = spyOn(MockRequestModule, 'get').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb(null, {
                statusCode: 200
            } as any, {
            });
        });

        GetGroupModule.GetGroup.execute({
            host: 'https://api.fake.wink.com',
            group_id: '3456789',
            access_token: 'JUNKTOKEN'
        }).then(() => {
            expect(getErrorFromResponseSpy).toHaveBeenCalledWith(200, null, { statusCode: 200 }, {});
            expect(getSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/groups/3456789', json: {}, headers: { Authorization: 'Bearer JUNKTOKEN' } }, jasmine.any(Function));
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            fail(err);
            done();
        });
    });
});