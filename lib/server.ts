// import * as http from 'http';
// import app from './app';
// const PORT = 3000;

// http.createServer(app).listen(PORT, () => {
//     console.log('Express server listening on port ' + PORT);
// });

import App from './app';
const PORT = 8080;
const app = new App().app;
app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT );
});
