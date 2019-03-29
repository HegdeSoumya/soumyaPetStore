import App from './app';
const PORT = 3010;
const app = new App().app;
app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT );
});
