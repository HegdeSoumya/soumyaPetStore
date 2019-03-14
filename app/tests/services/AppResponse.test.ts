import chai from 'chai';
import chatAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import {AppResponse} from '../../services/appResponse';
const expect = chai.expect;
chai.use(chatAsPromised);

describe('AppResponse Service Test', async () => {
    let res;
    let appResponse;

    beforeEach(async () => {
        res = mockRes();
        appResponse = await new AppResponse();
    });

    after(async () => {
        sinon.restore();
    });

    it('should test success response format', async () => {
        const statusCode = 200;
        const data = {};
        const envelope = {
            status: 'SUCCESS',
            data,
        };

        await appResponse.success(res, data);
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledOnce(res.send);
        sinon.assert.calledWith(res.status, statusCode);
        sinon.assert.calledWith(res.send, envelope);
    });

    it('should test error response format', async () => {
        const code = 'Code';
        const message = 'Message';
        const description = 'Description';
        const statusCode = 500;
        const envelope = {
            status: 'ERROR',
            data: {
                error: {
                    code,
                    message,
                    description,
                },
            },
        };

        await appResponse.error(res, code, message, description);
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledOnce(res.send);
        sinon.assert.calledWith(res.status, statusCode);
        sinon.assert.calledWith(res.send, envelope);
    });

    it('should test unprocessableEntity response format', async () => {
        const code = 'Code';
        const message = 'Message';
        const description = 'Description';
        const statusCode = 422;
        const envelope = {
            status: 'FAILURE',
            data: {
                error: {
                    code,
                    message,
                    description,
                },
            },
        };

        await appResponse.unprocessableEntity(res, code, message, description);
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledOnce(res.send);
        sinon.assert.calledWith(res.status, statusCode);
        sinon.assert.calledWith(res.send, envelope);
    });

    it('should test badRequest response format', async () => {
        const code = 'Code';
        const message = 'Message';
        const description = 'Description';
        const statusCode = 400;
        const envelope = {
            status: 'FAILURE',
            data: {
                error: {
                    code,
                    message,
                    description,
                },
            },
        };

        await appResponse.badRequest(res, code, message, description);
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledOnce(res.send);
        sinon.assert.calledWith(res.status, statusCode);
        sinon.assert.calledWith(res.send, envelope);
    });

    it('should test conflict response format', async () => {
        const code = 'Code';
        const message = 'Message';
        const description = 'Description';
        const statusCode = 409;
        const envelope = {
            status: 'FAILURE',
            data: {
                error: {
                    code,
                    message,
                    description,
                },
            },
        };

        await appResponse.conflict(res, code, message, description);
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledOnce(res.send);
        sinon.assert.calledWith(res.status, statusCode);
        sinon.assert.calledWith(res.send, envelope);
    });

    it('should test noContent response format', async () => {
        const code = 'Code';
        const message = 'Message';
        const description = 'Description';
        const statusCode = 204;
        const envelope = {};

        await appResponse.noContent(res, code, message, description);
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledOnce(res.send);
        sinon.assert.calledWith(res.status, statusCode);
        sinon.assert.calledWith(res.send, envelope);
    });

    it('should test notFound response format', async () => {
        const code = 'Code';
        const message = 'Message';
        const description = 'Description';
        const statusCode = 404;
        const envelope = {
            status: 'FAILURE',
            data: {
                error: {
                    code,
                    message,
                    description,
                },
            },
        };

        await appResponse.notFound(res, code, message, description);
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledOnce(res.send);
        sinon.assert.calledWith(res.status, statusCode);
        sinon.assert.calledWith(res.send, envelope);
    });
});
