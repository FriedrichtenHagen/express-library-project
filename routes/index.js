var express = require('express');
var router = express.Router();
const app = require('../app');
const dbConnection = require('../database/dbConnection')
const FriendModel = require('../models/FriendModel')



async function addFriendToCollection(name){
  const newFriend = new FriendModel({ 
    name: name, 
    birthday: new Date(),
    alive: true,
  });
  newFriend.name = "Friedrich"
  newFriend.alive = false
  newFriend
    .save()
    .then(
      () => console.log(`${name} was added to your friend collection. `),
      (err) => console.log(err)
    )
}

dbConnection()

router.get('/', async (req, res) => {
  try{
    const friendsFromDB = await FriendModel
      .find({})
      .where("name")
      .equals('Friedrich')
      
    res.send(friendsFromDB)
  } catch(err){
    console.log(err)
  }
});

module.exports = router;
