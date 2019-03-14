import chai from 'chai';
import sinon from 'sinon';
import {PetRepository} from './../../repositories/petRepository';
import {PetService} from './../../services/petService';
const expect = chai.expect;
import {PetController} from './../../controllers/petController';
import locales from './../../locales/en.json';

describe('Pet Controller Test', () => {
    let req;
    let stubPetService;
    let petController;
    let stubPetRepository;
    beforeEach( () => {
        stubPetRepository = sinon.stub(new PetRepository());
        stubPetService = sinon.stub(new PetService(stubPetRepository));
        petController = new PetController(stubPetService);
    });
    const res = {
        __(value) { return locales[value]; },
    };
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
        const response = await petController.getPet(req as any, res as any);
        sinon.assert.calledOnce(stubPetService.getPet);
        sinon.assert.calledOnce(stubSuccess);
        expect(response).to.be.a('object');
        expect(response.status).equal('SUCCESS');
        expect(response.data).to.be.a('object');
        expect(response.data.pets).to.be.an('array');
        expect(response.data.pets).deep.equals(pets);
        expect(response).equal(successResponse);
    });

    it('should throw error in case of service error', async () => {
        req = {};
        const failedResponse = {
            status: 'ERROR',
            data: {error: {code: 'ERR_INTERNAL_SERVER_ERROR', message: 'Internal Server Error'}} ,
        };
        const pets = [ { id: 1, name: 'Koli', description: 'You will be a pet' }];
        stubPetService.getPet.returns(pets);
        const stubSuccess = await sinon.stub(petController.appResponse, 'error').returns(failedResponse);
        const response = await petController.getPet(req as any, res as any);
        sinon.assert.calledOnce(stubPetService.getPet);
        sinon.assert.calledOnce(stubSuccess);
        expect(response).equal(failedResponse);
    });
});
