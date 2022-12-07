// Code is FINISHED need to try out now by running the server
const express = require("express");
// add remaining const upload,{deleteFile}, {isAuth, isAdmin}!!!!!!!
const router = express.Router();
//use populate for ID & traders to relate them
const { verifyJwt } = require("../../utils/jwt/jwt.js");

const TradeLog = require("../tradeLogger/tradeLog.model");

router.get("/getbyticker/:ticker", async (req, res) => {
  try {
    const ticker = req.params.ticker;
    const tickerToFind = await TradeLog.findOne({ ticker: ticker });
    return res.status(200).json(tickerToFind);
  } catch (error) {
    return next(error);
  }
});

router.get("/getidbyuser/:user", async (req, res) => {
  try {
    const user = req.params.user;
    const userToFind = await TradeLog.findOne({ user: id });
    return res.status(200).json(userToFind);
  } catch (error) {
    return next(error);
  }
});

router.post("/create", async (req, res) => {
  try {
    const authorization = req.headers.authorization || "";

    if (!authorization || authorization === "") {
      return res.status(401).json("Unauthorized");
    }

    const verify = verifyJwt(authorization.replace("Bearer ", ""));

    if (!verify) {
      return res.status(401).json("Unauthorized");
    }

    const newData = new TradeLog(req.body);
    const submited = await newData.save();
    return res.status(200).json(submited);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Failed to submit");
  }
});

router.post("/edit", async (req, res) => { // to edit. 
  try {
    const authorization = req.headers.authorization || "";

    if (!authorization || authorization === "") {
      return res.status(401).json("Unauthorized");
    }

    const verify = verifyJwt(authorization.replace("Bearer ", ""));

    if (!verify) {
      return res.status(401).json("Unauthorized");
    }

    const data = {
      trade: req.body.trade,
      ticker: req.body.ticker,
      strike: req.body.strike,
      type: req.body.type,
      expiration: req.body.expiration,
      debit: req.body.debit,
      credit: req.body.credit,
      quantatity: req.body.quantatity,
      tradeOpen: req.body.tradeOpen,
      tradeClosed: req.body.tradeClosed,
      comment: req.body.comment,
    };

    const item = await TradeLog.findOneAndUpdate({ _id: req.body.id }, data, {
      new: true,
    });
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/delete", async (req, res) => { // code to delete 
  try {
    const authorization = req.headers.authorization || "";

    if (!authorization || authorization === "") {
      return res.status(401).json("Unauthorized");
    }

    const verify = verifyJwt(authorization.replace("Bearer ", ""));

    if (!verify) {
      return res.status(401).json("Unauthorized");
    }

    const item = await TradeLog.findByIdAndDelete(req.body.id);
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/getbyid/:id", async (req, res) => { //
  try {
    const authorization = req.headers.authorization || "";

    if (!authorization || authorization === "") {
      return res.status(401).json("Unauthorized");
    }

    const verify = verifyJwt(authorization.replace("Bearer ", ""));

    if (!verify) {
      return res.status(401).json("Unauthorized");
    }

    const item = await TradeLog.findById(req.params.id);
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/all", async (req, res) => {
  try {
    const authorization = req.headers.authorization || ""; // same logic as Token

    if (!authorization || authorization === "") {
      return res.status(401).json("Unauthorized");
    }

    const verify = verifyJwt(authorization.replace("Bearer ", ""));

    if (!verify) {
      return res.status(401).json("Unauthorized");
    }

    const items = await TradeLog.find();
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
