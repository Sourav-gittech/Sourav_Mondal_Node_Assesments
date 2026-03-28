require('dotenv').config();

const express = require('express');
const cors = require('cors');
const DbConnection = require('./app/config/mongoConfig');
const productRouter = require('./app/routes/productRoute');

const port = 4000;

const app = express();
DbConnection();

app.use(express.json());
app.use(cors());

app.use('/v2/product', productRouter);

app.listen(port, () => {
    console.log('Server is running on port', port);
})