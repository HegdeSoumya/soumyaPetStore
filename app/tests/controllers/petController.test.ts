import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import { PetRepository } from './../../repositories/petRepository';
import { PetService } from './../../services/petService';
const expect = chai.expect;
import { PetController } from './../../controllers/petController';
import locales from './../../locales/en.json';
chai.use(chaiAsPromised);
import AppConstants from './../../constants/appConstants';

import MockExpressResponse from 'mock-express-response';
const responseMock = new MockExpressResponse();
describe('Pet Controller Test', () => {
    let req;
    let stubPetService;
    let petController;
    let stubPetRepository;
    beforeEach(() => {
        stubPetRepository = sinon.stub(new PetRepository());
        stubPetService = sinon.stub(new PetService(stubPetRepository));
        petController = new PetController(stubPetService);
    });
    const res = {
        __(value) { return locales[value]; },
    };

    describe('get all pets Controller', () => {

        it('should return pets', async () => {
            req = {};
            const successResponse = {
                status: 'SUCCESS',
                data: {
                    pets: [
                        {
                            id: 1,
                            name: 'ANIMAL',
                            category: {
                                categoryName: 'ANIMAL_CATEGORY',
                            },
                            photoUrl: 'PHOTO',
                            status: 'STATUS',
                        },
                    ],
                },
            };
            const pets = [
                {
                    id: 1,
                    name: 'ANIMAL',
                    category: {
                        categoryName: 'ANIMAL_CATEGORY',
                    },
                    photoUrl: 'PHOTO',
                    status: 'STATUS',
                }];
            await stubPetService.getPet.returns(pets);
            const stubSuccess = await sinon.stub(petController.appResponse, 'success').returns(successResponse);
            const response = await petController.getPet(req as any, responseMock);
            sinon.assert.calledOnce(stubPetService.getPet);
            sinon.assert.calledOnce(stubSuccess);
            expect(response).to.be.a('object');
            expect(response.status).to.be.eql('SUCCESS');
            expect(response.data).to.be.a('object');
            expect(response.data.pets).to.be.an('array');
            expect(response.data.pets).deep.equals(pets);
            expect(response).equal(successResponse);
        });

        it('should throw error in case of service error', async () => {
            req = {};
            const failedResponse = {
                status: 'ERROR',
                data: { error: { code: 'ERR_INTERNAL_SERVER_ERROR', message: 'Internal Server Error', description: '' } },
            };
            const error = {
                code: AppConstants.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR,
            };
            stubPetService.getPet.throws(error);
            const stubError = await sinon.stub(petController.appResponse, 'error')
                .returns(failedResponse);
            const response = await petController.getPet(req as any, res as any);
            sinon.assert.calledOnce(stubPetService.getPet);
            sinon.assert.calledOnce(stubError);
            expect(response).equal(failedResponse);
        });
        it('should throw error in case of page not found', async () => {
            req = {};
            const failedResponse = {
                status: 'ERROR',
                data: { error: { code: 'ERR_NOT_FOUND', message: 'Page Not Found', description: '' } },
            };
            const error = {
                code: AppConstants.ERROR_CODES.NOT_FOUND,
            };
            stubPetService.getPet.throws(error);
            const stubError = await sinon.stub(petController.appResponse, 'notFound')
                .returns(failedResponse);
            const response = await petController.getPet(req as any, res as any);
            sinon.assert.calledOnce(stubPetService.getPet);
            sinon.assert.calledOnce(stubError);
            expect(response).equal(failedResponse);
        });
        it('should throw error in case of bad request', async () => {
            req = {};
            const failedResponse = {
                status: 'ERROR',
                data: { error: { code: 'ERR_BAD_REQUEST', message: 'Bad Request', description: '' } },
            };
            const error = {
                code: AppConstants.ERROR_CODES.BAD_REQUEST,
            };
            stubPetService.getPet.throws(error);
            const stubError = await sinon.stub(petController.appResponse, 'badRequest')
                .returns(failedResponse);
            const response = await petController.getPet(req as any, res as any);
            sinon.assert.calledOnce(stubPetService.getPet);
            sinon.assert.calledOnce(stubError);
            expect(response).equal(failedResponse);
        });
    });
});
