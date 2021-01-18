import express from "express";
import dotenv from "dotenv";
import dbClient from "./api/dbClient";
import { BookData } from "./types/BookData";
import searchGoogleBooks from "./api/searchGoogleBooks";
import { GBooksSearchResult } from "./types/GBooksSearchResult";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const reload = require("reload");
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;

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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("build"));

const database: dbClient = new dbClient(
    process.env.DB_HOST,
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_KEY,
    parseInt(process.env.DB_PORT)
);

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", `http://localhost:${port}`);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers");
    next();
});

app.get("/books", (req, res) => {
    database
        .getBooks()
        .then((response: BookData[]) => {
            res.status(200).send(response);
        })
        .catch((error: Error) => {
            res.status(500).send(error);
        });
});

app.get("/books/search", (req, res) => {
    const title = req.query.title as string;
    const author = req.query.author as string;
    searchGoogleBooks(title, author)
        .then((response: GBooksSearchResult[]) => {
            res.status(200).send(response);
        })
        .catch((error: Error) => {
            res.status(500).send(error);
        });
});

app.post("/books", (req, res) => {
    database
        .createBook(req.body)
        .then((response: BookData) => {
            res.status(200).send(response);
        })
        .catch((error: Error) => {
            res.status(500).send(error);
        });
});

app.post("/books/update", (req, res) => {
    database
        .updateBook(req.body)
        .then((response: BookData) => {
            res.status(200).send(response);
        })
        .catch((error: Error) => {
            res.status(500).send(error);
        });
});

app.delete("/books/:id", (req, res) => {
    database
        .deleteBook(parseInt(req.params.id))
        .then(() => {
            res.status(200).send({
                id: parseInt(req.params.id),
                success: true,
            });
        })
        .catch((error: Error) => {
            res.status(500).send(error);
        });
});

reload(app)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    .then((reloadReturned: any) => {
        app.listen(port, () => {
            console.log(`Server started on port ${port}.`);
        });
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch(function (err: any) {
        console.error("Reload could not start, could not start server/sample app", err);
    });
