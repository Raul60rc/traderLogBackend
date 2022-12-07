const express = require("express");
const User = require("./users.model");
const router = express.Router();
const bcrypt = require("bcrypt");
const { generateSign } = require("../../utils/jwt/jwt.js");
const { verifyJwt } = require("../../utils/jwt/jwt.js");

router.post("/create", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const created = await newUser.save();
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json("Error in creating user");
  }
});

router.post("/login", async (req, res) => {
  try {
    const userDB = await User.findOne({ email: req.body.email });
    if (!userDB) {
      return res.status(404).json("User doesn't exist");
    }
    if (bcrypt.compareSync(req.body.password, userDB.password)) {
      const token = generateSign(userDB._id, userDB.email);
      return res.status(200).json({ token, userDB });
    } else {
      return res.status(200).json("Incorrect password");
    }
  } catch (error) { console.log(error); // need to find error.
    return res.status(500).json("Error loging in");
  }
});

router.get("/all", async (req, res) => {
  try {
    const authorization = req.headers.authorization || "";

    if (!authorization || authorization === "") {
      return res.status(401).json("Unauthorized");
    }

    const verify = verifyJwt(authorization.replace("Bearer ", ""));

    if (!verify) {
      return res.status(401).json("Unauthorized");
    }

    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/delete", async (req, res) => {
  try {
    const authorization = req.headers.authorization || "";

    if (!authorization || authorization === "") {
      return res.status(401).json("Unauthorized");
    }

    const verify = verifyJwt(authorization.replace("Bearer ", ""));

    if (!verify) {
      return res.status(401).json("Unauthorized");
    }

    const user = await User.findByIdAndDelete(req.body.id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/getbyid/:id", async (req, res) => {
  try {
    const authorization = req.headers.authorization || "";

    if (!authorization || authorization === "") {
      return res.status(401).json("Unauthorized");
    }

    const verify = verifyJwt(authorization.replace("Bearer ", ""));

    if (!verify) {
      return res.status(401).json("Unauthorized");
    }

    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/edit", async (req, res) => {
  try {
    const authorization = req.headers.authorization || ""; // the code below is for AUTH this code looks for 

    if (!authorization || authorization === "") { // Verify to check if a token exists
      return res.status(401).json("Unauthorized");
    }

    const verify = verifyJwt(authorization.replace("Bearer ", "")); // to verify token so it is valid

    if (!verify) {
      return res.status(401).json("Unauthorized");
    }

    const data = {
      name: req.body.name,
      email: req.body.email,
    };

    if (req.body.password && req.body.password !== "") {
      data.password = bcrypt.hashSync(req.body.password, 10);
    }

    const user = await User.findOneAndUpdate({ _id: req.body.id }, data, {
      new: true,
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
