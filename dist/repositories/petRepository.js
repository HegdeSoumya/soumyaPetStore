"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pets_1 = require("../models/pets");
class PetRepository {
    constructor() {
        this.getPet = () => {
            return pets_1.default.find({});
        };
    }
}
exports.PetRepository = PetRepository;
exports.default = PetRepository;
//# sourceMappingURL=petRepository.js.map