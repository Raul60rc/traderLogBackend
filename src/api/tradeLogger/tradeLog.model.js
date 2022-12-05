const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tradeLogSchema = new Schema(
    // Schema below to add data into the tables.
    {
        trade: {type:Number,required: true},//trade # of the day
        ticker: {type:String,required:true},//Stock Ticker $
        strike:{type:Number,required:true},//Strike Price
        type:{type:String,required:true},// Type Call/Put
        expiration:{type:String, required:true},//
        debit:{type:Number,required:false},//relate between credit & Debit
        credit:{type:Number,required:false},//can be positve or negative.
        quantatity:{type:Number,required:true},
        tradeOpen:{type:String,required:true},
        tradeClosed:{type:String,required:true},
        comment:{type:String,required:false}
    }
)

//ask if needed to build more Schemas for dashboard panel of traders
// or how to display. 


const TradeLog = mongoose.model('TradeLog',tradeLogSchema);
module.exports = TradeLog;