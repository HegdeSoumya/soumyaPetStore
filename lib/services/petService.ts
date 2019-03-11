import PetRepository from '../repositories/petRepository';

export class PetService {
    private petRepository: PetRepository;

    public constructor(petRepository: PetRepository) {
        this.petRepository = petRepository;
    }
    public getPet = () => {
        try {
            return this.petRepository.getPet();
        } catch (error) {
            throw error;
        }
    }
}

export default PetService;
