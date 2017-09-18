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

let UpdateGroupModule = proxyquire('../../group/update-group', {
    "request": MockRequestModule,
    "../util/response": MockResponseUtilModule
});

describe('Update Group', () => {

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

        UpdateGroupModule.UpdateGroup.execute({
            host: 'https://api.fake.wink.com',
            group_id: '3456789',
            access_token: 'JUNKTOKEN'
        }, {
            position: 1
        }).then(() => {
            fail();
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            expect(getErrorFromResponseSpy).toHaveBeenCalledWith(200, "string error", { statusCode: 404 }, {});
            expect(updateSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/groups/3456789', json: { position: 1 }, headers: { Authorization: 'Bearer JUNKTOKEN' } }, jasmine.any(Function));
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

        UpdateGroupModule.UpdateGroup.execute({
            host: 'https://api.fake.wink.com',
            group_id: '3456789',
            access_token: 'JUNKTOKEN'
        }, {
            position: 1
        }).then(() => {
            expect(getErrorFromResponseSpy).toHaveBeenCalledWith(200, null, { statusCode: 200 }, {});
            expect(updateSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/groups/3456789', json: { position: 1 }, headers: { Authorization: 'Bearer JUNKTOKEN' } }, jasmine.any(Function));
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            fail(err);
            done();
        });
    });
});