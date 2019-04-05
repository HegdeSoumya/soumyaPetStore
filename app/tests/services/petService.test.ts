import chai from 'chai';
import sinon from 'sinon';
import { PetRepository } from './../../repositories/petRepository';
import { PetService } from './../../services/petService';
import ServiceError from '../../errors/ServiceError';
import appConstants from '../../constants/appConstants';
const expect = chai.expect;

describe('Pet Service Test', () => {
    let stubPetRepository;
    let pets;

    beforeEach(() => {
        stubPetRepository = sinon.stub(new PetRepository());

        pets = [
            {
                id: 1,
                name: 'ANIMAL',
                category: {
                    categoryName: 'ANIMAL_CATEGORY',
                },
                photoUrl: 'PHOTO',
                status: 'STATUS',
            },
        ];
    });
    describe('get pets from respository', () => {

        it('should return pets from repository', async () => {
            stubPetRepository.getPet.returns(pets);

            const response = await new PetService(stubPetRepository).getPet();

            sinon.assert.calledOnce(stubPetRepository.getPet);
            expect(response).equals(pets);
        });

        it('should catch error', async () => {
            const error = new Error();
            await stubPetRepository.getPet.throws(error);
            await expect(new PetService(stubPetRepository).getPet()).to.be.rejected;
        });
    });

    describe('get pets by Search from repository', () => {

        it('should return pets by Search from Repository', async () => {
            stubPetRepository.getPetBySearch.returns(pets);
            const response = await new PetService(stubPetRepository).getPetBySearch(pets[0].id, pets[0].name);
            sinon.assert.calledOnce(stubPetRepository.getPetBySearch);
            expect(response).equals(pets);
        });
        it('should catch error', async () => {
            const error = new Error();
            await stubPetRepository.getPetBySearch.throws(error);
            await expect(new PetService(stubPetRepository).getPetBySearch(pets[0].id, pets[0].name)).to.be.rejected;
        });
    });

    describe('Create a new pet detail into the database', () => {

        it('should add a new single pet details', async () => {
            stubPetRepository.addPet.returns(pets);
            const response = await new PetService(stubPetRepository).addPet(pets);
            sinon.assert.calledOnce(stubPetRepository.addPet);
            expect(response).equals(pets[0].body);
        });
        it('should catch error', async () => {
            const error = new Error();
            await stubPetRepository.addPet.throws(error);
            await expect(new PetService(stubPetRepository).addPet(pets)).to.be.rejected;
        });
    });

    describe('Update the pet detail in the database', () => {

        it('should update a single pet details', async () => {
            stubPetRepository.updatePet.returns(pets);
            const response = await new PetService(stubPetRepository).updatePet(pets[0].id, pets);
            sinon.assert.calledOnce(stubPetRepository.updatePet);
            expect(response).equals(pets);
        });
        it('should throw not found error', async () => {
            const error = new ServiceError (
                appConstants.ERROR_CODES.BAD_REQUEST,
                appConstants.ERROR_MESSAGES.BAD_REQUEST,
            );
            await stubPetRepository.updatePet.throws(error);
            await expect(new PetService(stubPetRepository).updatePet(pets[0].id, pets)).to.be.rejected;
        });
        it('should catch error', async () => {
            const error = new ServiceError (
                appConstants.ERROR_CODES.NOT_FOUND,
                appConstants.ERROR_MESSAGES.NOT_FOUND,
            );
            await stubPetRepository.updatePet.throws(error);
            await expect(new PetService(stubPetRepository).updatePet(pets[0].id, pets)).to.be.rejected;
        });
    });

    describe('Delete the pet detail from the database', () => {

        it('should delete a single pet details', async () => {
            stubPetRepository.deletePet.returns(pets);
            const response = await new PetService(stubPetRepository).deletePet(pets[0].id);
            sinon.assert.calledOnce(stubPetRepository.deletePet);
            expect(response).equals(pets);
        });
        it('should catch error', async () => {
            const error = new Error();
            await stubPetRepository.deletePet.throws(error);
            await expect(new PetService(stubPetRepository).deletePet(pets[0].id)).to.be.rejected;
        });
    });
});
