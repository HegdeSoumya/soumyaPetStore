import wiring from '../wiring';

export class Routes {
    public routes(app): void {
        app.get('/pets', wiring.petController().getPet);
        app.get('/pets/ById/:petId', wiring.petController().getPetById);
        app.post('/pets', wiring.petController().addPet);
    }
}
