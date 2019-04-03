import chai from 'chai';

import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import { PetRepository } from './../../repositories/petRepository';
import { PetService } from './../../services/petService';
const expect = chai.expect;
import { PetController } from './../../controllers/petController';
import locales from './../../locales/en.json';
chai.use(chaiAsPromised);
import ServiceError from '../../errors/ServiceError';
import appConstants from './../../constants/appConstants';

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

        it('should throw error in case of page not found', async () => {
            const failedResponse = {
                status: 'ERROR',
                data: { error: { code: 'ERR_NOT_FOUND', message: 'Page Not Found', description: '' } },
            };
            const notFoundError = new ServiceError (
                appConstants.ERROR_CODES.NOT_FOUND,
                appConstants.ERROR_MESSAGES.NOT_FOUND,
            );

            stubPetService.getPet.throws(notFoundError);

            const stubError = await sinon.stub(petController.appResponse, 'notFound')
                .returns(failedResponse);
            const response = await petController.getPet(req as any, res as any);
            sinon.assert.calledOnce(stubPetService.getPet);
            sinon.assert.calledOnce(stubError);
            expect(response).equal(failedResponse);
        });

        it('should throw error', async () => {
            const error = new Error();
            await stubPetService.getPet.throws(error);
            await expect(petController.getPet(req as any, res as any)).to.be.rejected;
        });
    });

    describe('Add pets Controller', () => {
        before(() => {
            req = {
                body: {
                    _id: 'sdfs',
                    name: 'ANIMAL',
                    category: {
                        categoryName: 'ANIMAL_CATEGORY',
                    },
                    photoUrl: 'PHOTO',
                    status: 'STATUS',
                },
            };
        });
        it('should add pet', async () => {
            const successResponse = {
                status: 'SUCCESS',
                data: {
                    pets: [
                        {
                            _id: 'sdfs',
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
                    _id: 'sdfs',
                    name: 'ANIMAL',
                    category: {
                        categoryName: 'ANIMAL_CATEGORY',
                    },
                    photoUrl: 'PHOTO',
                    status: 'STATUS',
                }];
            await stubPetService.addPet.returns(pets);
            const stubSuccess = await sinon.stub(petController.appResponse, 'success').returns(successResponse);
            const response = await petController.addPet(req as any, res);
            sinon.assert.calledOnce(stubPetService.addPet);
            sinon.assert.calledOnce(stubSuccess);
            expect(response).to.be.a('object');
            expect(response.status).to.be.eql('SUCCESS');
            expect(response.data).to.be.a('object');
            expect(response.data.pets).to.be.an('array');
            expect(response.data.pets).deep.equals(pets);
            expect(response).equal(successResponse);
        });

        it('should throw error in case of internal server error', async () => {
            const failedResponse = {
                status: 'ERROR',
                data: { error: { code: 'ERR_INTERNAL_SERVER_ERROR', message: 'Internal Server Error', description: '' } },
            };

            const serverError = new ServiceError (
                appConstants.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR,
                appConstants.ERROR_MESSAGES.ERR_INTERNAL_SERVER_ERROR,
            );

            stubPetService.addPet.throws(serverError);
            const stubError = await sinon.stub(petController.appResponse, 'error')
                .returns(failedResponse);
            const response = await petController.addPet(req as any, res as any);
            sinon.assert.calledOnce(stubPetService.addPet);
            sinon.assert.calledOnce(stubError);
            expect(response).equal(failedResponse);
        });
        it('should throw error', async () => {
            const error = new Error();
            await stubPetService.addPet.throws(error);
            await expect(petController.addPet(req as any, res as any)).to.be.rejected;
        });
    });

    describe('Update pet by Id Controller', () => {
        before(() => {
            req = {
                params: {
                    _id: 'sdfs',
                },
            };
        });
        it('should update pet details by Id', async () => {
            const successResponse = {
                status: 'SUCCESS',
                data: {
                    pets: [
                        {
                            _id: 'sdfs',
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
                    _id: 'sdfs',
                    name: 'ANIMAL',
                    category: {
                        categoryName: 'ANIMAL_CATEGORY',
                    },
                    photoUrl: 'PHOTO',
                    status: 'STATUS',
                }];
            await stubPetService.updatePet.returns(pets);
            const stubSuccess = await sinon.stub(petController.appResponse, 'success').returns(successResponse);
            const response = await petController.updatePet(req as any, res);
            sinon.assert.calledOnce(stubPetService.updatePet);
            sinon.assert.calledOnce(stubSuccess);
            expect(response).to.be.a('object');
            expect(response.status).to.be.eql('SUCCESS');
            expect(response.data).to.be.a('object');
            expect(response.data.pets).to.be.an('array');
            expect(response.data.pets).deep.equals(pets);
            expect(response).equal(successResponse);
        });

        it('should throw error in case of page not found', async () => {
            const failedResponse = {
                status: 'ERROR',
                data: { error: { code: 'ERR_NOT_FOUND', message: 'Page Not Found', description: '' } },
            };
            const notFoundError = new ServiceError (
                appConstants.ERROR_CODES.NOT_FOUND,
                appConstants.ERROR_MESSAGES.NOT_FOUND,
            );
            stubPetService.updatePet.throws(notFoundError);
            const stubError = await sinon.stub(petController.appResponse, 'notFound')
                .returns(failedResponse);
            const response = await petController.updatePet(req as any, res as any);
            sinon.assert.calledOnce(stubPetService.updatePet);
            sinon.assert.calledOnce(stubError);
            expect(response).equal(failedResponse);
        });
        it('should throw error', async () => {
            const error = new Error();
            await stubPetService.updatePet.throws(error);
            await expect(petController.updatePet(req as any, res as any)).to.be.rejected;
        });
    });

    describe('Delete pet by Id Controller', () => {
        before(() => {
            req = {
                params: {
                    _id: 'sdfs',
                },
            };
        });
        it('should delete pet details by Id', async () => {
            const successResponse = {
                status: 'SUCCESS',
                data: {
                    pets: [
                        {
                            _id: 'sdfs',
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
                    _id: 'sdfs',
                    name: 'ANIMAL',
                    category: {
                        categoryName: 'ANIMAL_CATEGORY',
                    },
                    photoUrl: 'PHOTO',
                    status: 'STATUS',
                }];
            await stubPetService.deletePet.returns(pets);
            const stubSuccess = await sinon.stub(petController.appResponse, 'success').returns(successResponse);
            const response = await petController.deletePet(req as any, res);
            sinon.assert.calledOnce(stubPetService.deletePet);
            sinon.assert.calledOnce(stubSuccess);
            expect(response).to.be.a('object');
            expect(response.status).to.be.eql('SUCCESS');
            expect(response.data).to.be.a('object');
            expect(response.data.pets).to.be.an('array');
            expect(response.data.pets).deep.equals(pets);
            expect(response).equal(successResponse);
        });

        it('should throw error in case of page not found', async () => {
            const failedResponse = {
                status: 'ERROR',
                data: { error: { code: 'ERR_NOT_FOUND', message: 'Page Not Found', description: '' } },
            };

            const notFoundError = new ServiceError (
                appConstants.ERROR_CODES.NOT_FOUND,
                appConstants.ERROR_MESSAGES.NOT_FOUND,
            );

            stubPetService.deletePet.throws(notFoundError);
            const stubError = await sinon.stub(petController.appResponse, 'notFound')
                .returns(failedResponse);
            const response = await petController.deletePet(req as any, res as any);
            sinon.assert.calledOnce(stubPetService.deletePet);
            sinon.assert.calledOnce(stubError);
            expect(response).equal(failedResponse);
        });
        it('should throw error', async () => {
            const error = new Error();
            await stubPetService.deletePet.throws(error);
            await expect(petController.deletePet(req as any, res as any)).to.be.rejected;
        });
    });

    describe('get pets by Search Controller', () => {
        before(() => {
            req = {
                query: {
                    petId: 'sdfs',
                    name: 'ANIMAL',
                },
            };
        });
        it('should return pets by search', async () => {
            const successResponse = {
                status: 'SUCCESS',
                data: {
                    pets: [
                        {
                            _id: 'sdfs',
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
                    _id: 'sdfs',
                    name: 'ANIMAL',
                    category: {
                        categoryName: 'ANIMAL_CATEGORY',
                    },
                    photoUrl: 'PHOTO',
                    status: 'STATUS',
                }];
            await stubPetService.getPetBySearch.returns(pets);
            const stubSuccess = await sinon.stub(petController.appResponse, 'success').returns(successResponse);
            const response = await petController.getPetBySearch(req as any, res);
            sinon.assert.calledOnce(stubPetService.getPetBySearch);
            sinon.assert.calledOnce(stubSuccess);
            expect(response).to.be.a('object');
            expect(response.status).to.be.eql('SUCCESS');
            expect(response.data).to.be.a('object');
            expect(response.data.pets).to.be.an('array');
            expect(response.data.pets).deep.equals(pets);
            expect(response).equal(successResponse);
        });

        it('should throw error in case of page not found', async () => {
            req = {
                query: {
                    petId: 'sdfs',
                    name: 'ANIMAL',
                },
            };
            const failedResponse = {
                status: 'ERROR',
                data: { error: { code: 'ERR_NOT_FOUND', message: 'Page Not Found', description: '' } },
            };
            const notFoundError = new ServiceError (
                appConstants.ERROR_CODES.NOT_FOUND,
                appConstants.ERROR_MESSAGES.NOT_FOUND,
            );
            stubPetService.getPetBySearch.throws(notFoundError);
            const stubError = await sinon.stub(petController.appResponse, 'notFound')
                .returns(failedResponse);
            const response = await petController.getPetBySearch(req as any, res as any);
            sinon.assert.calledOnce(stubPetService.getPetBySearch);
            sinon.assert.calledOnce(stubError);
            expect(response).equal(failedResponse);
        });
        it('should throw error', async () => {
            const error = new Error();
            await stubPetService.getPetBySearch.throws(error);
            await expect(petController.getPetBySearch(req as any, res as any)).to.be.rejected;
        });
        // it('should throw error in case of bad request', async () => {
        //     req = {
        //         query: {
        //             petId: 'sdfs',
        //             name: 'ANIMAL',
        //         },
        //     };
        //     const failedResponse = {
        //         status: 'ERROR',
        //         data: { error: { code: 'BAD_REQUEST', message: 'Bad Request', description: '' } },
        //     };
        //     const badRequestError = new ServiceError (
        //         appConstants.ERROR_CODES.BAD_REQUEST,
        //         appConstants.ERROR_MESSAGES.BAD_REQUEST,
        //     );
        //     stubPetService.getPetBySearch.throws(badRequestError);
        //     const stubError = await sinon.stub(petController.appResponse, 'badRequest')
        //         .returns(failedResponse);
        //     const response = await petController.getPetBySearch(req as any, res as any);
        //     sinon.assert.calledThrice(stubPetService.getPetBySearch);
        //     sinon.assert.calledTwice(stubError);
        //     expect(response).equal(failedResponse);
        // });
    });
});
