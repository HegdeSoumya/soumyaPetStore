"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PetService {
    constructor(petRepository) {
        this.getPet = () => {
            try {
                return this.petRepository.getPet();
            }
            catch (error) {
                throw error;
            }
        };
        this.petRepository = petRepository;
    }
}
exports.PetService = PetService;
exports.default = PetService;
//# sourceMappingURL=petService.js.map