const express = require("express");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const connectDB = require("./controller/db");

connectDB();

const app = express();
const port = 5000

app.listen(port,() => console.log(`Server up and running at localhost:${port}`))