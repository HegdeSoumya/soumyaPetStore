import Pet from '../models/pets';

export class PetRepository {
    public getPet = async () => {
        return await Pet.find({});
    }
}

export default PetRepository;
