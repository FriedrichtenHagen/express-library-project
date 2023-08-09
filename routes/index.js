var express = require('express');
var router = express.Router();

require("dotenv").config()
const mongoose = require("mongoose");
const app = require('../app');


mongoose.set("strictQuery", false);
const Schema = mongoose.Schema
const testSchema = new Schema({
  name: {
    type: String,
    min: 2,
    max: 10,
    required: true, 
  }, 
  birthday: Date,
  alive: Boolean, 
  friends: [], 
})
const FriendModel = mongoose.model("Friends", testSchema)



async function addFriendToCollection(name){
  const newFriend = new FriendModel({ 
    name: name, 
    birthday: new Date(),
    alive: true,
  });
  newFriend
    .save()
    .then(
      () => console.log(`${name} was added to your friend collection. `),
      (err) => console.log(err)
    )
}


// Define the database URL to connect to.
const mongoDB = process.env.MONGODB_URL
// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
}
router.get('/', async (req, res) => {
  try{
    const friendsFromDB = await FriendModel.find({})
    res.send(friendsFromDB)
  } catch(err){
    console.log(err)
  }

});

module.exports = router;
