require("dotenv").config();

const express = require("express");
const cors = require("cors");

const DbConnection = require("./app/config/dbConfig");
const indexRouter = require("./app/routes/indexRoute");

const port = 4000;

const app = express();

DbConnection();

app.use(cors());

app.use(express.json());

app.use(indexRouter);

app.listen(port, (err) => {
    if (err) {
        console.log("Server stops running");
    }
    else {
        console.log("Server is running on", port);
    }
});