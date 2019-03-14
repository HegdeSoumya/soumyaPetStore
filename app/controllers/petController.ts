import { Request, Response } from 'express';
import PetService from '../services/petService';
import AppConstants from './../constants/AppConstants';
import BaseController from './baseController';

// tslint:disable-next-line:class-name
export class petController extends BaseController {
    private petService: PetService;

    public constructor(petService: PetService) {
        super();
        this.petService = petService;
    }

    public getPet = async (req: Request, res: Response) => {
        try {
            const pet = await this.petService.getPet();
            return this.appResponse.success(res, {pet});
        } catch (error) {
            return this.appResponse.error (
                res,
                AppConstants.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR,
                res.__(AppConstants.ERROR_MESSAGES.ERR_INTERNAL_SERVER_ERROR),
            );
        }
    }

    public getPetById = async (req: Request, res: Response) => {
        try {
            const id = req.params.petId;
            const pet = await this.petService.getPetById(id);
            return this.appResponse.success(res, {pet});
        } catch (error) {
            return this.appResponse.error (
                res,
                AppConstants.ERROR_CODES.ERR_INTERNAL_SERVER_ERROR,
                res.__(AppConstants.ERROR_MESSAGES.ERR_INTERNAL_SERVER_ERROR),
            );
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
