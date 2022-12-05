const mongoose = require('mongoose');

//added Mongo atlas route in the code below. 
const DB_URL = process.env.DB_URL;
console.log(DB_URL); // check if working now --> now working. 
const connectDB = async () =>{
    try{
        const db = await mongoose.connect(DB_URL);
        const { name, host } = db.connection;
    console.log(`Conectado con éxito a la db: ${name} en ${host}`);
        

    }catch (error){
        console.log("unable to connect with database",error);
    }
}

module.exports = {connectDB};