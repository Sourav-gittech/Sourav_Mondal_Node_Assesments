require("dotenv").config();

const express = require("express");
const path = require("path");
const DbConnection = require("./app/config/dbConfig");
const employeeRouter = require("./app/routes/employeeRoute");

const port = 4000;

const app = express();

DbConnection();

app.set("view engine","ejs");
app.set("views","views");

app.use(express.json());

app.use(express.static(path.join(__dirname,'public')));

// app.use(express.static(path.join(__dirname,'uploads')));

app.use('uploads',express.static(path.join(__dirname,'/uploads')))
app.use('/uploads',express.static('uploads')); 

app.use(express.urlencoded({ extended: false }));

app.use('/employee',employeeRouter);

app.listen(port, () => {
    console.log("Server is running on port", port);
})