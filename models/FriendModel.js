const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const Schema = mongoose.Schema
const friendSchema = new Schema({
  name: {
    type: String,
    min: 2,
    max: 10,
    required: true, 
  }, 
  birthday: Date,
  alive: Boolean, 
  city: String, 
})
const FriendModel = mongoose.model("Friends", friendSchema)


module.exports = FriendModel;
