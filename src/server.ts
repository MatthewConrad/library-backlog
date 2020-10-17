import express from "express";
import dotenv from "dotenv";
import dbClient from "./api/dbClient";
import { BookData } from "./types/BookData";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const reload = require("reload");

dotenv.config();
if (!process.env.DB_HOST) {
    throw new Error("Cannot connect to DB, no host was specified.");
}
if (!process.env.DB_NAME) {
    throw new Error("Cannot connect to DB, no name was specified.");
}
if (!process.env.DB_USER) {
    throw new Error("Cannot connect to DB, no user was specified.");
}
if (!process.env.DB_KEY) {
    throw new Error("Cannot connect to DB, no key was specified.");
}
if (!process.env.DB_PORT) {
    throw new Error("Cannot connect to DB, no port was specified.");
}

const app: express.Application = express();
const database: any = new dbClient(
    process.env.DB_HOST,
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_KEY,
    parseInt(process.env.DB_PORT)
);

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5000");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,DELETE,OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Access-Control-Allow-Headers"
    );
    next();
});

app.use(express.static("build"));
app.get("/books", (req, res) => {
    database
        .getBooks()
        .then((response: BookData) => {
            res.status(200).send(response);
        })
        .catch((error: any) => {
            res.status(500).send(error);
        });
});

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
