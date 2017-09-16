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

let DeleteGroupModule = proxyquire('../../group/delete-group', {
    "request": MockRequestModule,
    "../util/response": MockResponseUtilModule
});

describe('Delete Group', () => {

    it('should reject when the response utility handler says it should', (done) => {
        let getErrorFromResponseSpy = spyOn(MockResponseUtilModule.ResponseUtil, 'getErrorFromResponse').and.returnValue({
            statusCode: 404,
            message: 'string error'
        });

        let deleteSpy = spyOn(MockRequestModule, 'delete').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb(null, null, null);
        });

        DeleteGroupModule.DeleteGroup.execute({
            host: 'https://api.fake.wink.com',
            group_id: '987345',
            access_token: 'JUNKTOKEN'
        }).then(() => {
            fail();
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            expect(getErrorFromResponseSpy).toHaveBeenCalledWith(204, null, null, null);
            expect(deleteSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/groups/987345', json: {}, headers: { Authorization: 'Bearer JUNKTOKEN' } }, jasmine.any(Function));
            expect(err.statusCode).toEqual(404);
            expect(err.message).toEqual('string error');
            done();
        });
    });

    it('should handle a 204 status code with a response body properly', (done) => {
        let getErrorFromResponseSpy = spyOn(MockResponseUtilModule.ResponseUtil, 'getErrorFromResponse').and.returnValue(null);

        let deleteSpy = spyOn(MockRequestModule, 'delete').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb(null, {
                statusCode: 204
            } as any, {
            });
        });

        DeleteGroupModule.DeleteGroup.execute({
            host: 'https://api.fake.wink.com',
            group_id: '987345',
            access_token: 'JUNKTOKEN'
        }).then(() => {
            expect(getErrorFromResponseSpy).toHaveBeenCalledWith(204, null, { statusCode: 204 }, {});
            expect(deleteSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/groups/987345', json: {}, headers: { Authorization: 'Bearer JUNKTOKEN' } }, jasmine.any(Function));
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            fail(err);
            done();
        });
    });
});