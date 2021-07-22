const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const mongoose = require("mongoose");
const connectDB = require("./db");
const scraper = require("../scraper");

const Game = require("../models/Game");

connectDB();

const insertData = async () => {
	try {
		//await Game.deleteMany({});
		const gameData = await scraper("https://www.epicgames.com/store/en-US/collection/most-popular");
		await Game.insertMany(gameData);

		console.log("Data Inserted Successfully");
	} catch(err) {
		console.log(err);
	}
}

insertData();