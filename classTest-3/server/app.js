require("dotenv").config();

const express = require("express");
const DbConnection = require("./app/config/dbConfig");
const path = require("path");
const cors = require('cors');

const authRouter = require("./app/routes/authRouting");
const productRouter = require("./app/routes/productRouting");
const userRouter = require("./app/routes/userRouting");

const app = express();

const port = 4000;

DbConnection();
app.use(express.json());

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// app.use('view engine', 'ejs');
// app.use('views', 'views');

app.use('/auth', authRouter);
app.use('/product', productRouter);
app.use('/user', userRouter);

app.listen(port, () => {
    console.log('Server is running on port', port);
});