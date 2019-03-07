import app from 'app';
// tslint:disable-next-line:ordered-imports
import {Request, Response, NextFunction} from "express";
import {petController} from '../controllers/petController';

export class Routes {
    public PetController: petController = new petController();

    // tslint:disable-next-line:no-shadowed-variable
    public routes(app): void {
        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request successfull!',
            });
        });
        app.route('/pets')
        .get(this.PetController.getPet)
        .post(this.PetController.addPet);
        app.route('/pets/petById/:petId')
        .get(this.PetController.getPetById)
        .put(this.PetController.updatePet)
        .delete(this.PetController.deletePet);
        app.route('/pets/petByName/:petName')
        .get(this.PetController.getPetByName);

    }
}
