import * as bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import { Routes } from "./routes/petRoutes";

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

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
        this.swaggerSetup();
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
        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "mongoDB connection error"));
        console.log('connected successfully');
    }
    private swaggerSetup(): void {
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        // this.app.use('/pets', this.routes.routes);
    }
}
