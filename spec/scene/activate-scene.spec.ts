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

let ActivateSceneModule = proxyquire('../../scene/activate-scene', {
    "request": MockRequestModule,
    "../util/response": MockResponseUtilModule
});

describe('Activate Scene', () => {

    it('should reject when the response utility handler says it should', (done) => {
        let getErrorFromResponseSpy = spyOn(MockResponseUtilModule.ResponseUtil, 'getErrorFromResponse').and.returnValue({
            statusCode: 404,
            message: 'string error'
        });

        let postSpy = spyOn(MockRequestModule, 'post').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb("string error", {
                statusCode: 404
            } as any, {});
        });

        ActivateSceneModule.ActivateScene.execute({
            host: 'https://api.fake.wink.com',
            access_token: 'JUNKTOKEN',
            scene_id: '709'
        }).then(() => {
            fail();
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            expect(getErrorFromResponseSpy).toHaveBeenCalledWith(200, "string error", { statusCode: 404 }, {});
            expect(postSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/scenes/709/activate', json: { }, headers: { Authorization: 'Bearer JUNKTOKEN' } }, jasmine.any(Function));
            expect(err.statusCode).toEqual(404);
            expect(err.message).toEqual('string error');
            done();
        });
    });

    it('should handle a 204 status code properly', (done) => {
        let getErrorFromResponseSpy = spyOn(MockResponseUtilModule.ResponseUtil, 'getErrorFromResponse').and.returnValue(null);

        let postSpy = spyOn(MockRequestModule, 'post').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb(null, {
                statusCode: 200
            } as any, {
            });
        });

        ActivateSceneModule.ActivateScene.execute({
            host: 'https://api.fake.wink.com',
            access_token: 'JUNKTOKEN',
            scene_id: '709'
        }).then(() => {
            expect(getErrorFromResponseSpy).toHaveBeenCalledWith(200, null, { statusCode: 200 }, {});
            expect(postSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/scenes/709/activate', json: {}, headers: { Authorization: 'Bearer JUNKTOKEN' } }, jasmine.any(Function));
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            fail(err);
            done();
        });
    });
});