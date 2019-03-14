"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const petController_1 = require("./controllers/petController");
const petRepository_1 = require("./repositories/petRepository");
const petService_1 = require("./services/petService");
class Wiring {
    petController() {
        return new petController_1.petController(this.petService());
    }
    petService() {
        return new petService_1.PetService(this.petRepository());
    }
    petRepository() {
        return new petRepository_1.PetRepository();
    }
}
exports.default = new Wiring();
//# sourceMappingURL=wiring.js.map