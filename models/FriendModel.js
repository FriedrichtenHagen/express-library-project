const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
const Schema = mongoose.Schema


const friendSchema = new Schema({
  name: {
    type: String,
    min: 2,
    max: 10,
    required: true, 
  }, 
birthday: {
    type: Date, 
    required: true, 
},
  alive: {
    type: Boolean,
    required: true, 
  }, 
  city: {
    type: String,
    required: true,
  }, 
})


// Virtual for friends URL
friendSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/${this._id}`;
});




const FriendModel = mongoose.model("Friends", friendSchema)
module.exports = FriendModel;
