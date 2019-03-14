"use strict";
// import * as http from 'http';
// import app from './app';
// const PORT = 3000;
Object.defineProperty(exports, "__esModule", { value: true });
// http.createServer(app).listen(PORT, () => {
//     console.log('Express server listening on port ' + PORT);
// });
const app_1 = require("./app");
const PORT = 8080;
const app = new app_1.default().app;
app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});
//# sourceMappingURL=server.js.map