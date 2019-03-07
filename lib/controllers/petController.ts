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
        newPet.save((err, pet) => {
            if (err) {
                res.send(err);
            }
            res.json(pet);
        });
    }
}
