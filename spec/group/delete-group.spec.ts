import {RequestResponse} from "request";
let proxyquire = require('proxyquire');

let MockRequestModule = {
    delete: () => {}
};

let DeleteGroupModule = proxyquire('../../group/delete-group', {
    "request": MockRequestModule
});

describe('Delete Group', () => {

    it('should handle an error response with text an reject properly', (done) => {
        let deleteSpy = spyOn(MockRequestModule, 'delete').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb("string error", {
                statusCode: 404
            } as any, {});
        });

        DeleteGroupModule.DeleteGroup.execute({
            host: 'https://api.fake.wink.com',
            group_id: '987345',
            access_token: 'BUNKTOKEN'
        }).then(() => {
            fail();
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            expect(deleteSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/groups/987345', json: {}, headers: { Authorization: 'Bearer BUNKTOKEN' } }, jasmine.any(Function));
            expect(err.statusCode).toEqual(404);
            expect(err.message).toEqual('string error');
            done();
        });
    });

    it('should handle an error response with a stack and reject properly', (done) => {
        let deleteSpy = spyOn(MockRequestModule, 'delete').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb({
                stack: "error stack"
            }, {
                statusCode: 404
            } as any, {});
        });

        DeleteGroupModule.DeleteGroup.execute({
            host: 'https://api.fake.wink.com',
            group_id: '987345',
            access_token: 'BUNKTOKEN'
        }).then(() => {
            fail();
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            expect(deleteSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/groups/987345', json: {}, headers: { Authorization: 'Bearer BUNKTOKEN' } }, jasmine.any(Function));
            expect(err.statusCode).toEqual(404);
            expect(err.message).toEqual('error stack');
            done();
        });
    });

    it('should handle an error response with a message property and reject properly', (done) => {
        let deleteSpy = spyOn(MockRequestModule, 'delete').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb({
                message: "error message"
            }, {
                statusCode: 404
            } as any, {});
        });

        DeleteGroupModule.DeleteGroup.execute({
            host: 'https://api.fake.wink.com',
            group_id: '987345',
            access_token: 'BUNKTOKEN'
        }).then(() => {
            fail();
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            expect(deleteSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/groups/987345', json: {}, headers: { Authorization: 'Bearer BUNKTOKEN' } }, jasmine.any(Function));
            expect(err.statusCode).toEqual(404);
            expect(err.message).toEqual('error message');
            done();
        });
    });

    it('should handle a non-204 status code with an error in the body from the response properly', (done) => {
        let deleteSpy = spyOn(MockRequestModule, 'delete').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb(null, {
                statusCode: 200
            } as any, {
                errors: ["some error"]
            });
        });

        DeleteGroupModule.DeleteGroup.execute({
            host: 'https://api.fake.wink.com',
            group_id: '987345',
            access_token: 'BUNKTOKEN'
        }).then(() => {
            fail();
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            expect(deleteSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/groups/987345', json: {}, headers: { Authorization: 'Bearer BUNKTOKEN' } }, jasmine.any(Function));
            expect(err.statusCode).toEqual(200);
            expect(err.message).toEqual('some error');
            done();
        });
    });

    it('should handle a non-204 status code with an empty error list in the body from the response properly', (done) => {
        let deleteSpy = spyOn(MockRequestModule, 'delete').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb(null, {
                statusCode: 200
            } as any, {
                errors: []
            });
        });

        DeleteGroupModule.DeleteGroup.execute({
            host: 'https://api.fake.wink.com',
            group_id: '987345',
            access_token: 'BUNKTOKEN'
        }).then(() => {
            fail();
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            expect(deleteSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/groups/987345', json: {}, headers: { Authorization: 'Bearer BUNKTOKEN' } }, jasmine.any(Function));
            expect(err.statusCode).toEqual(200);
            expect(err.message).toEqual('response code = 200');
            done();
        });
    });

    it('should handle a non-204 status code with no error list in the body from the response properly', (done) => {
        let deleteSpy = spyOn(MockRequestModule, 'delete').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb(null, {
                statusCode: 200
            } as any, {
            });
        });

        DeleteGroupModule.DeleteGroup.execute({
            host: 'https://api.fake.wink.com',
            group_id: '987345',
            access_token: 'BUNKTOKEN'
        }).then(() => {
            fail();
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            expect(deleteSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/groups/987345', json: {}, headers: { Authorization: 'Bearer BUNKTOKEN' } }, jasmine.any(Function));
            expect(err.statusCode).toEqual(200);
            expect(err.message).toEqual('response code = 200');
            done();
        });
    });

    it('should handle a 204 status code properly', (done) => {
        let deleteSpy = spyOn(MockRequestModule, 'delete').and.callFake((params: any, cb: (error: any, response: RequestResponse, body: any) => void) => {
            cb(null, {
                statusCode: 204
            } as any, {
            });
        });

        DeleteGroupModule.DeleteGroup.execute({
            host: 'https://api.fake.wink.com',
            group_id: '987345',
            access_token: 'BUNKTOKEN'
        }).then(() => {
            expect(deleteSpy).toHaveBeenCalledWith({ url: 'https://api.fake.wink.com/groups/987345', json: {}, headers: { Authorization: 'Bearer BUNKTOKEN' } }, jasmine.any(Function));
            done();
        }).catch((err: WinkAPI.IRequestError) => {
            fail(err);
            done();
        });
    });
});