import chai from 'chai';
import sinon from 'sinon';
import Pet from './../../models/pets';
import {PetRepository} from './../../repositories/petRepository';
const expect = chai.expect;

describe('Pet Repository Test', () => {
    let stubPetModel;

    beforeEach( () => {
        stubPetModel = sinon.stub(Pet);
    });

    it('should return pets from databse', async () => {
        const pets = [
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
        stubPetModel.find.returns(pets);

        const response = await new PetRepository().getPet();
        sinon.assert.calledOnce(stubPetModel.find);
        expect(response).equals(pets);
    });
});
