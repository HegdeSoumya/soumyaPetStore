import PetRepository from '../repositories/petRepository';

export class PetService {
    private petRepository: PetRepository;

    public constructor(petRepository: PetRepository) {
        this.petRepository = petRepository;
    }
    public getPet = async () => {
        try {
            return await this.petRepository.getPet();
        } catch (error) {
            throw error;
        }
    }
    public getPetById = async (id: string) => {
        try {
            return await this.petRepository.getPetById(id);
        } catch (error) {
            throw error;
        }
    }
    public addPet = async (newPet: any) => {
        try {
            await this.petRepository.addPet(newPet);
        } catch (error) {
            throw error;
        }
    }
    public getPetByName = async (name: string) => {
        try {
            return await this.petRepository.getPetByName(name);
        } catch (error) {
            throw error;
        }
    }
    public deletePet = async (id: string) => {
        try {
            return await this.petRepository.deletePet(id);
        } catch (error) {
            throw error;
        }
    }

    public updatePet = async (id: string, body: any) => {
        try {
            return await this.petRepository.updatePet(id, body);
        } catch (error) {
            throw error;
        }
    }
}

export default PetService;
