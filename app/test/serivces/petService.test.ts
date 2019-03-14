import chai from 'chai';
import sinon from 'sinon';
import {PetRepository} from './../../repositories/petRepository';
import {PetService} from './../../services/petService';
const expect = chai.expect;

describe('Pet Service Test', () => {
    let stubPetRepository;
    let pets;

    beforeEach( () => {
        stubPetRepository = sinon.stub(new PetRepository());

        pets = [
            {
                id: 1,
                name: 'ANIMAL',
                // tslint:disable-next-line:object-literal-sort-keys
                category: {
                    categoryName: 'ANIMAL_CATEGORY',
                },
                photoUrl: 'PHOTO',
                status: 'STATUS',
            },
        ];
    });

    it('should return roles from repository', async () => {
        stubPetRepository.getPet.returns(pets);

        const response = await new PetService(stubPetRepository).getPet();

        sinon.assert.calledOnce(stubPetRepository.getPet);
        expect(response).equals(pets);
    });

    it('should catch error', async () => {
        const error = new Error();
        await stubPetRepository.getPet.throws(error);
        await expect(new PetService(stubPetRepository).getPet()).to.be.rejected;
        // sinon.assert.calledOnce(stubPetRepository.getPet);
    });
});
