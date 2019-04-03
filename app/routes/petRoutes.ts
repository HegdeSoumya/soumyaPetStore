import wiring from '../wiring';

export class Routes {
    public routes(app): void {
        app.get('/pets', wiring.petController().getPet);
        // app.get('/pets/ById/:petId', wiring.petController().getPetById);
        app.post('/pets', wiring.petController().addPet);
        // app.get('pets/byName/:name', wiring.petController().getPetByName);
        app.get('/pets/searchBy', wiring.petController().getPetBySearch);
        app.delete('/pets/:petId', wiring.petController().deletePet);
        app.put('/pets/:petId', wiring.petController().updatePet);
    }
}
