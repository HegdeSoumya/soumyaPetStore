import Pet from '../models/pets';

export class PetRepository {
    public getPet = () => {
        return Pet.find({});
    }

    public getPetById = (id: string) => {
        return Pet.findById(id);
    }

}

export default PetRepository;
