require("dotenv").config()
const mongoose = require("mongoose");

const mongoDB = process.env.MONGODB_URL


// Wait for database to connect, logging an error if there is a problem
async function dbConnection() {
    try{
        await mongoose.connect(mongoDB);
        console.log("You successfully connected to MongoDB!");
    }
    catch( error ){
        console.log(error)
    }
}

module.exports = dbConnection;