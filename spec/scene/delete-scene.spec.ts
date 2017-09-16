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

let DeleteSceneModule = proxyquire('../../scene/delete-scene', {
    "request": MockRequestModule,
    "../util/response": MockResponseUtilModule
});

describe('Delete Scene', () => {

    it('should reject when the response utility handler says it should', (done) => {
        let getErrorFromResponseSpy = spyOn(MockResponseUtilModule.ResponseUtil, 'getErrorFromResponse').and.returnValue({
            statusCode: 404,
            message: 'string error'
        });

        let deleteSpy = spyOn(MockRequestModule, 'delete').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb("string error", {
                statusCode: 404
            } as any, {});
        });

        DeleteSceneModule.DeleteScene.execute({
            host: 'https://api.fake.wink.com',
            access_token: 'JUNKTOKEN',
            scene_id: '709'
        }).then(() => {
            fail();
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            expect(getErrorFromResponseSpy).toHaveBeenCalledWith(204, "string error", { statusCode: 404 }, {});
            expect(deleteSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/scenes/709', json: { }, headers: { Authorization: 'Bearer JUNKTOKEN' } }, jasmine.any(Function));
            expect(err.statusCode).toEqual(404);
            expect(err.message).toEqual('string error');
            done();
        });
    });

    it('should handle a 204 status code properly', (done) => {
        let getErrorFromResponseSpy = spyOn(MockResponseUtilModule.ResponseUtil, 'getErrorFromResponse').and.returnValue(null);

        let deleteSpy = spyOn(MockRequestModule, 'delete').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb(null, {
                statusCode: 204
            } as any, {
            });
        });

        DeleteSceneModule.DeleteScene.execute({
            host: 'https://api.fake.wink.com',
            access_token: 'JUNKTOKEN',
            scene_id: '709'
        }).then(() => {
            expect(getErrorFromResponseSpy).toHaveBeenCalledWith(204, null, { statusCode: 204 }, {});
            expect(deleteSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/scenes/709', json: {}, headers: { Authorization: 'Bearer JUNKTOKEN' } }, jasmine.any(Function));
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            fail(err);
            done();
        });
    });
});