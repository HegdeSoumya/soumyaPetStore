import chai from 'chai';
import sinon from 'sinon';
import Pet from '../../models/pet';
import {PetRepository} from './../../repositories/petRepository';
const expect = chai.expect;

describe('Pet Repository Test', () => {
    let stubPetModel;

    before( () => {
        stubPetModel = sinon.stub(Pet);
    });
    it('should return pets from databse', async () => {
        const pets = [
            {
                id: 1,
                name: 'ANIMAL',
                category: {
                    categoryId: 'sdfds',
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
    // it('should return pet by ID from database', async () => {
    //     const pets = [
    //         {
    //             id: 'dfsf',
    //             name: 'ANIMAL',
    //             category: {
    //                 categoryId: 'sdfds',
    //                 categoryName: 'ANIMAL_CATEGORY',
    //             },
    //             photoUrl: 'PHOTO',
    //             status: 'STATUS',
    //         },
    //     ];
    //     stubPetModel.findById.returns(pets);
    //     const response = await new PetRepository().getPetById(pets[0].id);
    //     sinon.assert.calledOnce(stubPetModel.findById);
    //     expect(response).equals(pets);
    // });
    it('should return pet by search by id and name from database', async () => {
        const pets = [
            {
                id: 'dfsf',
                name: 'ANIMAL',
                category: {
                    categoryId: 'sdfds',
                    categoryName: 'ANIMAL_CATEGORY',
                },
                photoUrl: 'PHOTO',
                status: 'STATUS',
            },
        ];
        stubPetModel.find.returns(pets);
        const response = await new PetRepository().getPetBySearch(pets[0].id, pets[0].name);
        sinon.assert.calledTwice(stubPetModel.find);
        expect(response).equals(pets);
    });
    it('should return pet by search by id from database', async () => {
        const pets = [
            {
                id: 'dfsf',
                name: 'ANIMAL',
                category: {
                    categoryId: 'sdfds',
                    categoryName: 'ANIMAL_CATEGORY',
                },
                photoUrl: 'PHOTO',
                status: 'STATUS',
            },
        ];
        stubPetModel.find.returns(pets);
        const response = await new PetRepository().getPetBySearch(pets[0].id, undefined);
        sinon.assert.calledThrice(stubPetModel.find);
        expect(response).equals(pets);
    });

    it('should return pet by search by name from database', async () => {
        const pets = [
            {
                id: 'dfsf',
                name: 'ANIMAL',
                category: {
                    categoryId: 'sdfds',
                    categoryName: 'ANIMAL_CATEGORY',
                },
                photoUrl: 'PHOTO',
                status: 'STATUS',
            },
        ];
        stubPetModel.find.returns(pets);
        const response = await new PetRepository().getPetBySearch(undefined, pets[0].name);
        sinon.assert.callCount(stubPetModel.find, 4);
        expect(response).equals(pets);
    });
    it('should create pets and store in databasee', async () => {
        const newPet = [
            {
                id: 'dfsf',
                name: 'ANIMAL',
                category: {
                    categoryId: 'sdfds',
                    categoryName: 'ANIMAL_CATEGORY',
                },
                photoUrl: 'PHOTO',
                status: 'STATUS',
            },
        ];
        stubPetModel.create.returns(newPet);
        const response = await new PetRepository().addPet(newPet);
        sinon.assert.calledOnce(stubPetModel.create);
        expect(response).equals(newPet);
    });
    it('should update pets and store in modify changes in database', async () => {
        const pets = [
            {
                id: 'dfsf',
                name: 'ANIMAL',
                category: {
                    categoryId: 'sdfds',
                    categoryName: 'ANIMAL_CATEGORY',
                },
                photoUrl: 'PHOTO',
                status: 'STATUS',
            },
        ];
        stubPetModel.findByIdAndUpdate.returns(pets);
        const response = await new PetRepository().updatePet(pets[0].id, pets);
        sinon.assert.calledOnce(stubPetModel.findByIdAndUpdate);
        expect(response).equals(pets);
    });
    it('should delete single pet from database', async () => {
        const pets = [
            {
                id: 'dfsf',
                name: 'ANIMAL',
                category: {
                    categoryId: 'sdfds',
                    categoryName: 'ANIMAL_CATEGORY',
                },
                photoUrl: 'PHOTO',
                status: 'STATUS',
            },
        ];
        stubPetModel.findByIdAndDelete.returns('successfully deleted');
        const response = await new PetRepository().deletePet(pets[0].id);
        sinon.assert.calledOnce(stubPetModel.findByIdAndDelete);
        expect(response).equals('successfully deleted');
    });
});
