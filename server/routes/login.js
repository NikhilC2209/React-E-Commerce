const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/User");

router.post("/", async (req,res) => {
	const userName = req.body.username;
	const userEmail = req.body.email;
    const userPass = req.body.password;

    try {
    	const emailExists = await User.findOne({email: userEmail});
    	if(emailExists) {
            //error = "User does not exist!";
            console.log("User exists!");
        } else {
            const user = new User({
	            username: userName,
	            email: userEmail,
	            password: userPass,
	        });
	        console.log(user);
	        const saveUser = await user.save(); 
	        console.log("User data inserted successfully!");
        }
    } catch(err) {
    	console.log(err);
    }
})

module.exports = router;