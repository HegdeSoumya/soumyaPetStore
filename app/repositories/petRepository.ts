import Pet from '../models/pet';

export class PetRepository {
    public getPet = () => {
        return Pet.find({});
    }

    public getPetById = (id: string) => {
        return Pet.findById(id);
    }

    public addPet = (newPet: any) => {
        return newPet.save();
    }

    public getPetByName = (name: string) => {
        return Pet.find({name: {$regex: name}});
    }

}

export default PetRepository;
