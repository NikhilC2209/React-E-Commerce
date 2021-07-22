const express = require("express");
require("dotenv").config();

const app = express();
const port = 5000

app.listen(port,() => console.log(`Server up and running at localhost:${port}`))