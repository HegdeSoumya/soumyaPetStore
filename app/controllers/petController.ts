import { Request, Response } from 'express';
import PetService from '../services/petService';

// tslint:disable-next-line:class-name
export class petController {
    private petService: PetService;

    public constructor(petService: PetService) {
        this.petService = petService;
    }

    public getPet = async (req: Request, res: Response) => {
        try {
            const pet = await this.petService.getPet();
            res.status(200).json(pet);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

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

export default petController;
