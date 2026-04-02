const express = require('express');
const dotenv = require('dotenv');
const connectDb = require("./config/db.js");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDb();

app.listen(port, () => {
    console.log(`Server started at ${port}`);
});