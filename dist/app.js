"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const petRoutes_1 = require("./routes/petRoutes");
class App {
    constructor() {
        this.routes = new petRoutes_1.Routes();
        // public routePrv: Routes = new Routes();
        // public mongoUrl: string = 'mongodb://localhost/CRMdb';
        this.mongoUrl = 'mongodb://127.0.0.1:27017/petstore';
        this.app = express();
        this.config();
        this.mongoSetup();
        this.routes.routes(this.app);
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files
        this.app.use(express.static('public'));
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map