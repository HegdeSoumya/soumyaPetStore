"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:class-name
class petController {
    constructor(petService) {
        this.getPet = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const pet = yield this.petService.getPet();
                res.status(200).json(pet);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
        this.petService = petService;
    }
}
exports.petController = petController;
//     public addPet(req: Request, res: Response) {
//         const newPet = new Pet(req.body);
//         newPet.save((err: any, pet: any) => {
//             if (err) {
//                 res.send(err);
//             }
//             res.json(pet);
//         });
//     }
//     public getPetById(req: Request, res: Response) {
//         Pet.findById(req.params.petId, (err, pet) => {
//             if (err) {
//                 res.status(404).send(err);
//             }
//             res.status(200).json(pet);
//         });
//     }
//     public getPetByName(req: Request, res: Response) {
//         let name = req.params.petName;
//         name = '^' + name;
//         Pet.find({name: {$regex: name}}, (err, pet) => {
//             if (err) {
//                 res.status(404).send(err);
//             }
//             res.status(200).json(pet);
//         });
//     }
//     public updatePet(req: Request, res: Response) {
//         Pet.findOneAndUpdate({ _id: req.params.petId}, req.body, {new: true}, (err, pet) => {
//             if (err) {
//                 res.send(err);
//             }
//             res.json(pet);
//         });
//     }
//     public deletePet(req: Request, res: Response) {
//         Pet.remove({ _id: req.params.petId}, (err, pet) => {
//             if (err) {
//                 res.send(err);
//             }
//             res.json({message: 'Successfully deleted the pet entry'});
//         });
//     }
// }
exports.default = petController;
//# sourceMappingURL=petController.js.map