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

}

export default PetRepository;
