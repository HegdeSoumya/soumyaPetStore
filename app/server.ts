import App from './app';
const PORT = 8080;
const app = new App().app;
app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT );
});
