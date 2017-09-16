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

let CreateUserModule = proxyquire('../../user/create-user', {
    "request": MockRequestModule,
    "../util/response": MockResponseUtilModule
});

describe('Create User', () => {

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

        CreateUserModule.CreateUser.execute({
            host: 'https://api.fake.wink.com',
            access_token: 'JUNKTOKEN',
            first_name: "sample"
        }).then(() => {
            fail();
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            expect(getErrorFromResponseSpy).toHaveBeenCalledWith(201, "string error", { statusCode: 404 }, {});
            expect(postSpy).toHaveBeenCalledWith({
                    url: 'https://api.fake.wink.com/users',
                    json: { client_id: undefined, client_secret: undefined, email: undefined, first_name: 'sample', last_name: undefined, locale: undefined, new_password: undefined  },
                    headers: { Authorization: 'Bearer JUNKTOKEN' }
                },
                jasmine.any(Function)
            );
            expect(err.statusCode).toEqual(404);
            expect(err.message).toEqual('string error');
            done();
        });
    });

    it('should handle a 200 status code properly', (done) => {
        let getErrorFromResponseSpy = spyOn(MockResponseUtilModule.ResponseUtil, 'getErrorFromResponse').and.returnValue(null);

        let postSpy = spyOn(MockRequestModule, 'post').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb(null, {
                statusCode: 201
            } as any, {
            });
        });

        CreateUserModule.CreateUser.execute({
            host: 'https://api.fake.wink.com',
            access_token: 'JUNKTOKEN',
            first_name: "sample"
        }).then(() => {
            expect(getErrorFromResponseSpy).toHaveBeenCalledWith(201, null, { statusCode: 201 }, {});
            expect(postSpy).toHaveBeenCalledWith({
                    url: 'https://api.fake.wink.com/users',
                    json: { client_id: undefined, client_secret: undefined, email: undefined, first_name: 'sample', last_name: undefined, locale: undefined, new_password: undefined },
                    headers: { Authorization: 'Bearer JUNKTOKEN' }
                },
                jasmine.any(Function)
            );
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            fail(err);
            done();
        });
    });
});