const mongoose = require("mongoose");
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB connected successfully");
	} catch(err) {
		console.log(process.env.MONGO_URI);
		console.log(err);
		process.exit(1);
	}
}

module.exports = connectDB