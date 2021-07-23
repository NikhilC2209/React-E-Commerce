const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const connectDB = require("./controller/db");

connectDB();

const app = express();
const port = 5000
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }))
app.use(bodyParser.json())

const loginRouter = require("./routes/login");
app.use("/login",loginRouter);	

app.get("/", (req,res) => {
	res.send("<h1>Hello World!</h1>")
})

app.listen(port,() => console.log(`Server up and running at localhost:${port}`))