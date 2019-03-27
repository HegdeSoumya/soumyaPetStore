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

        it('should throw error', async () => {
            const error = new Error();
            await stubPetService.getPet.throws(error);
            await expect(petController.getPet(req as any, res as any)).to.be.rejected;
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

    describe('get pets by ID Controller', () => {
        before(() => {
            req = {
                params: {
                    petId: 'wiqrt',
                },
            };
        });
        it('should return pets by ID', async () => {
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
            await stubPetService.getPetById.returns(pets);
            const stubSuccess = await sinon.stub(petController.appResponse, 'success').returns(successResponse);
            const response = await petController.getPetById(req as any, res);
            sinon.assert.calledOnce(stubPetService.getPetById);
            sinon.assert.calledOnce(stubSuccess);
            expect(response).to.be.a('object');
            expect(response.status).to.be.eql('SUCCESS');
            expect(response.data).to.be.a('object');
            expect(response.data.pets).to.be.an('array');
            expect(response.data.pets).deep.equals(pets);
            expect(response).equal(successResponse);
        });

        it('should throw error', async () => {
            const error = new Error();
            await stubPetService.getPetById.throws(error);
            await expect(petController.getPetById(req as any, res as any)).to.be.rejected;
        });
        it('should throw error in case of page not found', async () => {
            const failedResponse = {
                status: 'ERROR',
                data: { error: { code: 'ERR_NOT_FOUND', message: 'Page Not Found', description: '' } },
            };
            const error = {
                code: AppConstants.ERROR_CODES.NOT_FOUND,
            };
            stubPetService.getPetById.throws(error);
            const stubError = await sinon.stub(petController.appResponse, 'notFound')
                .returns(failedResponse);
            const response = await petController.getPetById(req as any, res as any);
            sinon.assert.calledOnce(stubPetService.getPetById);
            sinon.assert.calledOnce(stubError);
            expect(response).equal(failedResponse);
        });
        it('should throw error in case of unprocessable entity', async () => {
            const failedResponse = {
                status: 'ERROR',
                data: { error: { code: 'ERR_UNPROCESSABLE_ENTITY', message: 'Unprocessable Entity', description: '' } },
            };
            const error = {
                code: AppConstants.ERROR_CODES.UNPROCESSABLE_ENTITY,
            };
            stubPetService.getPetById.throws(error);
            const stubError = await sinon.stub(petController.appResponse, 'unprocessableEntity')
                .returns(failedResponse);
            const response = await petController.getPetById(req as any, res as any);
            sinon.assert.calledOnce(stubPetService.getPetById);
            sinon.assert.calledOnce(stubError);
            expect(response).equal(failedResponse);
        });
    });

    describe('get pets by Name Controller', () => {
        before(() => {
            req = {
                params: {
                    name: 'ANIMAL',
                },
            };
        });
        it('should return pets by name', async () => {
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
            await stubPetService.getPetByName.returns(pets);
            const stubSuccess = await sinon.stub(petController.appResponse, 'success').returns(successResponse);
            const response = await petController.getPetByName(req as any, res);
            sinon.assert.calledOnce(stubPetService.getPetByName);
            sinon.assert.calledOnce(stubSuccess);
            expect(response).to.be.a('object');
            expect(response.status).to.be.eql('SUCCESS');
            expect(response.data).to.be.a('object');
            expect(response.data.pets).to.be.an('array');
            expect(response.data.pets).deep.equals(pets);
            expect(response).equal(successResponse);
        });

        it('should throw error', async () => {
            const error = new Error();
            await stubPetService.getPetByName.throws(error);
            await expect(petController.getPetByName(req as any, res as any)).to.be.rejected;
        });
        it('should throw error in case of page not found', async () => {
            const failedResponse = {
                status: 'ERROR',
                data: { error: { code: 'ERR_NOT_FOUND', message: 'Page Not Found', description: '' } },
            };
            const error = {
                code: AppConstants.ERROR_CODES.NOT_FOUND,
            };
            stubPetService.getPetByName.throws(error);
            const stubError = await sinon.stub(petController.appResponse, 'notFound')
                .returns(failedResponse);
            const response = await petController.getPetByName(req as any, res as any);
            sinon.assert.calledOnce(stubPetService.getPetByName);
            sinon.assert.calledOnce(stubError);
            expect(response).equal(failedResponse);
        });
        it('should throw error in case of unprocessable entity', async () => {
            const failedResponse = {
                status: 'ERROR',
                data: { error: { code: 'ERR_UNPROCESSABLE_ENTITY', message: 'Unprocessable Entity', description: '' } },
            };
            const error = {
                code: AppConstants.ERROR_CODES.UNPROCESSABLE_ENTITY,
            };
            stubPetService.getPetByName.throws(error);
            const stubError = await sinon.stub(petController.appResponse, 'unprocessableEntity')
                .returns(failedResponse);
            const response = await petController.getPetByName(req as any, res as any);
            sinon.assert.calledOnce(stubPetService.getPetByName);
            sinon.assert.calledOnce(stubError);
            expect(response).equal(failedResponse);
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

        it('should throw error', async () => {
            const error = new Error();
            await stubPetService.addPet.throws(error);
            await expect(petController.addPet(req as any, res as any)).to.be.rejected;
        });
        it('should throw error in case of unprocessable entity', async () => {
            const failedResponse = {
                status: 'ERROR',
                data: { error: { code: 'ERR_UNPROCESSABLE_ENTITY', message: 'Unprocessable Entity', description: '' } },
            };
            const error = {
                code: AppConstants.ERROR_CODES.UNPROCESSABLE_ENTITY,
            };
            stubPetService.addPet.throws(error);
            const stubError = await sinon.stub(petController.appResponse, 'unprocessableEntity')
                .returns(failedResponse);
            const response = await petController.addPet(req as any, res as any);
            sinon.assert.calledOnce(stubPetService.addPet);
            sinon.assert.calledOnce(stubError);
            expect(response).equal(failedResponse);
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

        it('should throw error', async () => {
            const error = new Error();
            await stubPetService.updatePet.throws(error);
            await expect(petController.updatePet(req as any, res as any)).to.be.rejected;
        });
        it('should throw error in case of unprocessable entity', async () => {
            const failedResponse = {
                status: 'ERROR',
                data: { error: { code: 'ERR_UNPROCESSABLE_ENTITY', message: 'Unprocessable Entity', description: '' } },
            };
            const error = {
                code: AppConstants.ERROR_CODES.UNPROCESSABLE_ENTITY,
            };
            stubPetService.updatePet.throws(error);
            const stubError = await sinon.stub(petController.appResponse, 'unprocessableEntity')
                .returns(failedResponse);
            const response = await petController.updatePet(req as any, res as any);
            sinon.assert.calledOnce(stubPetService.updatePet);
            sinon.assert.calledOnce(stubError);
            expect(response).equal(failedResponse);
        });
        it('should throw error in case of page not found', async () => {
            const failedResponse = {
                status: 'ERROR',
                data: { error: { code: 'ERR_NOT_FOUND', message: 'Page Not Found', description: '' } },
            };
            const error = {
                code: AppConstants.ERROR_CODES.NOT_FOUND,
            };
            stubPetService.updatePet.throws(error);
            const stubError = await sinon.stub(petController.appResponse, 'notFound')
                .returns(failedResponse);
            const response = await petController.updatePet(req as any, res as any);
            sinon.assert.calledOnce(stubPetService.updatePet);
            sinon.assert.calledOnce(stubError);
            expect(response).equal(failedResponse);
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

        it('should throw error', async () => {
            const error = new Error();
            await stubPetService.deletePet.throws(error);
            await expect(petController.deletePet(req as any, res as any)).to.be.rejected;
        });
        it('should throw error in case of unprocessable entity', async () => {
            const failedResponse = {
                status: 'ERROR',
                data: { error: { code: 'ERR_UNPROCESSABLE_ENTITY', message: 'Unprocessable Entity', description: '' } },
            };
            const error = {
                code: AppConstants.ERROR_CODES.UNPROCESSABLE_ENTITY,
            };
            stubPetService.deletePet.throws(error);
            const stubError = await sinon.stub(petController.appResponse, 'unprocessableEntity')
                .returns(failedResponse);
            const response = await petController.deletePet(req as any, res as any);
            sinon.assert.calledOnce(stubPetService.deletePet);
            sinon.assert.calledOnce(stubError);
            expect(response).equal(failedResponse);
        });
        it('should throw error in case of page not found', async () => {
            const failedResponse = {
                status: 'ERROR',
                data: { error: { code: 'ERR_NOT_FOUND', message: 'Page Not Found', description: '' } },
            };
            const error = {
                code: AppConstants.ERROR_CODES.NOT_FOUND,
            };
            stubPetService.deletePet.throws(error);
            const stubError = await sinon.stub(petController.appResponse, 'notFound')
                .returns(failedResponse);
            const response = await petController.deletePet(req as any, res as any);
            sinon.assert.calledOnce(stubPetService.deletePet);
            sinon.assert.calledOnce(stubError);
            expect(response).equal(failedResponse);
        });
    });
});
