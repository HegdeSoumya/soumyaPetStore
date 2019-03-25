import chai from 'chai';
import sinon from 'sinon';
import { PetRepository } from './../../repositories/petRepository';
import { PetService } from './../../services/petService';
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

    describe('gets pets by ID from repository', () => {

        it('should return pets by ID from repository', async () => {
            stubPetRepository.getPetById.returns(pets);
            const response = await new PetService(stubPetRepository).getPetById(pets[0].id);
            sinon.assert.calledOnce(stubPetRepository.getPetById);
            expect(response).equals(pets);
        });
        it('should catch error', async () => {
            const error = new Error();
            await stubPetRepository.getPetById.throws(error);
            await expect(new PetService(stubPetRepository).getPetById(pets[0].id)).to.be.rejected;
        });
    });

    describe('get pets by Name from repository', () => {

        it('should return pets by Name from Repository', async () => {
            stubPetRepository.getPetByName.returns(pets);
            const response = await new PetService(stubPetRepository).getPetByName(pets[0].name);
            sinon.assert.calledOnce(stubPetRepository.getPetByName);
            expect(response).equals(pets);
        });
        it('should catch error', async () => {
            const error = new Error();
            await stubPetRepository.getPetByName.throws(error);
            await expect(new PetService(stubPetRepository).getPetByName(pets[0].name)).to.be.rejected;
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
        it('should catch error', async () => {
            const error = new Error();
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
