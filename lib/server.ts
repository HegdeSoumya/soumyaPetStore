import app from "./app";
const PORT = 8080;

app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log("Express server listening on port" + PORT);
});
