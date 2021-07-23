const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/User");
const cookie = require('cookie-parser');

router.post("/register", async (req,res) => {
	const userName = req.body.user;
	const userEmail = req.body.email;
    const userPass = req.body.password;
    console.log(req.body);

    const validatePassword = (pass) => {
	    errors = [];
	    if (pass.length < 8) {
	        errors.push("Your password must be at least 8 characters"); 
	    }
	    if (pass.search(/[a-z]/i) < 0) {
	        errors.push("Your password must contain at least one letter.");
	    }
	    if (pass.search(/[0-9]/) < 0) {
	        errors.push("Your password must contain at least one digit."); 
	    }
	    if (errors.length > 0) {
	        //alert(errors.join("\n"));
	        return errors[0];
	    }
	    return true;
}

    try {
    	console.log(userName);
    	const emailExists = await User.findOne({email: userEmail});
    	const userExists = await User.findOne({username: userName});
    	console.log("user:");
    	console.log(validatePassword(userPass));
    	if(validatePassword(userPass)!=true) {
    		console.log("Weak Password");
    		throw new Error(validatePassword(userPass));
    	}
    	if(emailExists) {
            console.log("This Email already exists!");
            throw new Error("This Email already exists!");
        } 
        if(userExists) {
            console.log("This Username is already taken!");
            throw new Error("This Username is already taken!");
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
    	res.json({"error": err.message});
    }
})

router.post("/login", async (req,res) => {
	const userName = req.body.user;
	const userPass = req.body.password;

	try {
		const userExists = await User.findOne({username: userName});
		if(!userExists) {
			console.log(userName + " User does not exists!");
			throw new Error("User does not exists!");
		} else {
			if(userPass===userExists.password) {
				console.log(userExists);
				res.cookie('user', userName, {path: '/', maxAge: 1000*60*10});
				res.json(userExists);
			} else {
				console.log("Incorrect Password!");
				throw new Error("Incorrect Password!");
			}
		}
	} catch(err) {
		res.json({"error": err.message});
	}
})

router.post("/logout", async (req,res) => {
	res.cookie('user', '', {expires: new Date(0)});
	res.send("Cookie Deleted!");
})

module.exports = router;