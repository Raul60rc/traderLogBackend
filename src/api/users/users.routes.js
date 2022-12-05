const express = require('express');
const User = require('./users.model');
const router = express.Router();
const bcrypt = require('bcrypt');
const {generateSign} = require('../../utils/jwt/jwt.js')

//add route get by ID of user remaining example getbytrade

router.post("/create",async (req,res)=>{ //Username creation with no roles.
    try{
        const user = req.body;
        const newUser = new User(user);
        console.log(newUser);
            const created = await newUser.save();
            return res.status(201).json(created);
    }catch (error){
        return res.status(500).json("Error in creating user");
    }
});

router.post("/login",async (req,res)=>{ //login
    try{
        const userDB = await User.findOne({email: req.body.email});
        if(!userDB){
            return res.status(404).json("User doesn't exist");
        }
        if (bcrypt.compareSync(req.body.password,userDB.password)){
            const token = generateSign(userDB._id, userDB.email);
            return res.status(200).json({token,userDB});
        }else{
            return res.status(200).json("Incorrect password");
        }
    }catch (error){
        return res.status(500).json("Error loging in");
    }
});

router.post('/logout',async (req,res)=>{ // logout
    try{
        const token = null;
        return res.status(200).json(token);
    }catch (error){
        return res.status(500).json(error)
    }
});

module.exports = router;