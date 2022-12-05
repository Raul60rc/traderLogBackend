// Code is FINISHED need to try out now by running the server 
const express = require('express');
// add remaining const upload,{deleteFile}, {isAuth, isAdmin}!!!!!!!
const router = express.Router();
//use populate for ID & traders to relate them 

const TradeLog = require('../tradeLogger/tradeLog.model');

router.get('/', async(req,res,next)=>{
    try{
        const tradeLog = await TradeLog.find();
        return res.status(200).json(tradeLog);
    }catch(error){
        return next (error)
    }
});

router.get('/getbyticker/:ticker',async (req,res)=>{
    try{
        const ticker = req.params.ticker;
        const tickerToFind = await TradeLog.findOne({ticker: ticker})
        return res.status(200).json(tickerToFind);
    }catch(error){
        return next (error)
    }
});

router.get('/getidbyuser/:user',async (req,res)=>{
    try{
        const user = req.params.user;
        const userToFind = await TradeLog.findOne({user:id})
        return res.status(200).json(userToFind);
    }catch(error){
        return next (error)
    }
});

// add post so we can submit trades
router.post('/create', async (req,res)=>{
    try{
    const newData = new TradeLog(req.body);
    const submited = await newData.save();
    return res.status(200).json(submited)
    }catch (error){
        return res.status(500).json('Failed to submit')
    }

});

//the delete is perfomed when logged in (Authenticated)
router.delete('/delete/:id', async (req,res)=>{ // build a schema to delete data later fix to add data.
    try{
        const id = req.params.id;
        const dataToDelete = await TradeLog.findByIdAndDelete(id);
        return res.status(200).json(dataToDelete);
    }catch (error){
        return res.status(500).json(error);
    }
});

// edit data code below is perfomed when logged in (Authenticated)
router.put('edit/:id',async (req,res)=>{
    try{
        const id = req.params.id;
        const dataModify = req.body;
        
        const dataUpdated = await TradeLog.findByIdAndUpdate(id,dataModify);
        return res.status(200).json({message: "data has been edited succesfuly", dataModified: dataUpdated});
    }catch (error){
        return res.status(500).json("Error while editing data");
    }
});

module.exports = router;