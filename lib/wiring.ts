import { petController } from './controllers/petController';
import PetRepository from './repositories/petRepository';
import { PetService } from './services/petService';

class Wiring {
    public petController() {
        return new petController(this.petService());
    }
    public petService() {
        return new PetService(this.petRepository());
    }
    public petRepository() {
        return new PetRepository();
    }
}
export default new Wiring();
