const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	developer: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	imageUrl: {
		type: String,
		required: true
	},
	price: {
		type: String,
		required: true
	},
	discount: {
		type: String,
		required: true
	},
})

module.exports = mongoose.model('Games', gameSchema);