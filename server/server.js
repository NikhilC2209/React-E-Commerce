const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const connectDB = require("./controller/db");

connectDB();

const app = express();
const port = 5000
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }))
app.use(bodyParser.json())
app.use(cors({credentials: true, origin: "http://localhost:3000"}))

const loginRouter = require("./routes/login");
const gameRouter = require("./routes/gameData");
const cartRouter = require("./routes/cart");
app.use("/account",loginRouter);	
app.use("/game",gameRouter);
app.use("/cart",cartRouter);	

app.get("/", (req,res) => {
	res.send("<h1>Hello World!</h1>")
})

app.listen(port,() => console.log(`Server up and running at localhost:${port}`))