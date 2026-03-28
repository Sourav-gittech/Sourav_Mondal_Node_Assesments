require("dotenv").config();

const express = require("express");
const cors = require("cors");

const DbConnect = require("./app/config/dbConfig");
const route = require("./app/routes/indexRoute");

const port = 4000;

const app = express();

DbConnect();

app.use(express.json());

app.use(cors());

app.use(route);

app.listen(port, () => {
    console.log('Server is running on port', port);
});