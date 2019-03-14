"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wiring_1 = require("../wiring");
class Routes {
    routes(app) {
        app.get('/pets', wiring_1.default.petController().getPet);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=petRoutes.js.map