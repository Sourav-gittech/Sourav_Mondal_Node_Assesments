require("dotenv").config();
const express = require("express");
const studentRoute = require("./app/routes/studentRoute");
const DbConnection = require("./app/config/mongoConfig");

const port = 4000;

const app = express();

DbConnection();

app.use(express.json());
app.use('/student',studentRoute);

app.listen(port, () => {
    console.log("Server is running on port", port);
})