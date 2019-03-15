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
    public getPetById = (id: string) => {
        try {
            return this.petRepository.getPetById(id);
        } catch (error) {
            throw error;
        }
    }
    public addPet = (newPet: any) => {
        try {
            this.petRepository.addPet(newPet);
        } catch (error) {
            throw error;
        }
    }
    public getPetByName = (name: string) => {
        try {
            return this.petRepository.getPetByName(name);
        } catch (error) {
            throw error;
        }
    }
    public deletePet = (id: string) => {
        try {
            return this.petRepository.deletePet(id);
        } catch (error) {
            throw error;
        }
    }
}

export default PetService;
