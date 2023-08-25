const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/User");
const Game = require("../models/Game");

router.post('/add/:id', async(req,res) => {
	try {
		const userCookie = req.body.userCookie;
		console.log(userCookie);

		const userExists = await User.findOne({"_id": "60fa807a47c1f003a0ba944d"});
		console.log("heyy");
		const upDateString = userExists.cart + " " + req.params.id;

		const checkCart = (_id) => {
			const gameIDArray = userExists.cart.split(" ");
			console.log(gameIDArray.length);
			console.log(gameIDArray);
		    for (let j=0; j<gameIDArray.length; j++) {
		    	if(j==1) {
		    		console.log(gameIDArray[j]);
		    		console.log(_id);
		    	}
		        if (gameIDArray[j]==_id) return true;
		    }
		    return false;
		}

		const updateDocument = async (_id) => {
			try {
				const result = await User.findByIdAndUpdate({_id}, {
				$set: {
					"cart": upDateString
				}
			}, {
				new: true,
				useFindAndModify: false
			})
			console.log(result);
			} catch(err) {
				console.log(err);
			}
		}
		if(checkCart(req.params.id)!=true)  {
			updateDocument(userCookie);
		} else {
			console.log("Already addes to Cart!");
		}
	} catch(err) {
		console.log(err);
	}
	console.log("Yep! got it");
})

router.post('/remove/:id', async(req,res) => {
	try {
		const userCookie = req.body.userCookie;
		console.log(userCookie);

		const userExists = await User.findOne({"_id": "60fa807a47c1f003a0ba944d"});
		console.log("heyy");
		let cartArray  = userExists.cart.split(' ');
		cartArray.shift();
		console.log(cartArray);

		// cartArray.forEach((item,index)=> {
		// 	if(item==req.params.id) {
		// 		cartArray.splice(index,1);
		// 	}
		// })

		const updateDocument = async (_id) => {
			try {
				cartArray = cartArray.filter((item) => item !== req.params.id);
				console.log(cartArray);
				const upDateString = cartArray.join(" ");
				const result = await User.findByIdAndUpdate({_id}, {
				$set: {
					"cart": upDateString
				}
			}, {
				new: true,
				useFindAndModify: false
			})
			console.log(result);
			res.json(result);
			} catch(err) {
				console.log(err);
			}
		}
		updateDocument(userCookie);
	} catch(err) {
		console.log(err);
	}
})

router.post('/view', async(req,res) => {
	console.log("we're here");
	try {
		const userID = req.body.user;
		const userExists = await User.findOne({"_id": "60fa807a47c1f003a0ba944d"});
		const userCart = userExists.cart.split(' ');
		userCart.shift();
		
		const gameJsonArray = [];

		async function fetchGameJSON(item) {
			const gameItem = await Game.findOne({"_id": item})
			console.log(gameItem);
			gameJsonArray.push(gameItem);
		}
		await Promise.all(userCart.map(fetchGameJSON));
		console.log(gameJsonArray);
		res.json(gameJsonArray);
	} catch(err) {
		console.log(err);
	}
})

module.exports = router;