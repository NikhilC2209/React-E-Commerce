const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Game = require("../models/Game");

router.post('/data', async(req,res) => {
	try {
		const data = await Game.find({});
		console.log(data);
		res.json(data);
	} catch(err) {
		console.log(err);
	}
})

module.exports = router;