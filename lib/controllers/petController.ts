import {Request, Response} from 'express';
import * as mongoose from 'mongoose';
import {petSchema} from '../models/pets';

const Pet = mongoose.model('Pet', petSchema);

// tslint:disable-next-line:class-name
export class petController {
    public getPet(req: Request, res: Response) {
        Pet.find({}, (err, pet) => {
            if (err) {
                res.send(err);
            }
            res.json(pet);
        });
    }
    public addPet(req: Request, res: Response) {
        const newPet = new Pet(req.body);
        newPet.save((err: any, pet: any) => {
            if (err) {
                res.send(err);
            }
            res.json(pet);
        });
    }
    public getPetById(req: Request, res: Response) {
        Pet.findById(req.params.petId, (err, pet) => {
            if (err) {
                res.status(404).send(err);
            }
            res.status(200).json(pet);
        });
    }
    public getPetByName(req: Request, res: Response) {
        let name = req.params.petName;
        name = '^' + name;
        Pet.find({name: {$regex: name}}, (err, pet) => {
            if (err) {
                res.status(404).send(err);
            }
            res.status(200).json(pet);
        });

    }
    public updatePet(req: Request, res: Response) {
        Pet.findOneAndUpdate({ _id: req.params.petId}, req.body, {new: true}, (err, pet) => {
            if (err) {
                res.send(err);
            }
            res.json(pet);
        });
    }
    public deletePet(req: Request, res: Response) {
        Pet.remove({ _id: req.params.petId}, (err, pet) => {
            if (err) {
                res.send(err);
            }
            res.json({message: 'Successfully deleted the pet entry'});
        });
    }
}
