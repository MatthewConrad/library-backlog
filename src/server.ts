import express from "express";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const reload = require("reload");

const app: express.Application = express();

app.use(express.static("build"));

reload(app)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    .then((reloadReturned: any) => {
        app.listen(5000, () => {
            console.log("Server started on port 5000.");
        });
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch(function (err: any) {
        console.error(
            "Reload could not start, could not start server/sample app",
            err
        );
    });
