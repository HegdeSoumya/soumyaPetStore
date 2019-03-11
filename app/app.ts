import * as bodyParser from "body-parser";
import * as express from "express";
import * as mongoose from "mongoose";
import { Routes } from "./routes/petRoutes";

export default class App {

    public app: express.Application;
    public routes: Routes = new Routes();
    // public routePrv: Routes = new Routes();
    // public mongoUrl: string = 'mongodb://localhost/CRMdb';
    public mongoUrl: string = 'mongodb://127.0.0.1:27017/petstore';

    constructor() {
        this.app = express();
        this.config();
        this.mongoSetup();
        this.routes.routes(this.app);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files
        this.app.use(express.static('public'));
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, {useNewUrlParser: true});
    }

}
