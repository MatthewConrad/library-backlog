import express from "express";

const app: express.Application = express();

app.use(express.static("build"));

app.listen(5000, () => {
    console.log("Server started on port 5000.");
});
