import wiring from '../wiring';

export class Routes {
    public routes(app): void {
        app.get('/pets', wiring.petController().getPet);
    }
}
