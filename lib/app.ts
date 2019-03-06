import * as bodyParser from "body-parser";
import * as express from "express";

class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.get('/', (req, res) => {
            res.send('Hello World!');
        });
    }
}

export default new App().app;
