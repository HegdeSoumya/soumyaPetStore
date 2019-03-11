import Pet from '../models/pets';

export class PetRepository {
    public getPet = () => {
        return Pet.find({});
    }

}

export default PetRepository;
