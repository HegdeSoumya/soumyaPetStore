import * as chai from "chai";
import chaiHttp = require("chai-http");
import * as mocha from "mocha";
import app from '../lib/app';
chai.use(chaiHttp);
const expect = chai.expect;

describe('baseRoute', () => {
    it('should respond with HTTP 200 status', () => {
        return chai.request(app)
            // tslint:disable-next-line:align
            .get('/')
            .then((res) => {
                expect(res.status).to.be.equal(200);
            });
    });
});
