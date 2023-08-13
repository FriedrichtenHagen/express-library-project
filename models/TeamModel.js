const mongoose = require("mongoose")

const Schema = mongoose.Schema
mongoose.set("strictQuery", true);

const TeamSchema = new Schema({
    name: {type: String, required: true, maxLength: 10}, 
    members: [{type: Schema.Types.ObjectId, ref: "Member"}], 
})