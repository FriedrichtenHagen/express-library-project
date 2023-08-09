var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
require("dotenv").config()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



const mongoose = require("mongoose");

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
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
const MongooseModel = mongoose.model("Friends", testSchema)



async function addFriendToCollection(name){
  const newFriend = new MongooseModel({ 
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

addFriendToCollection('Yujeong')






// Define the database URL to connect to.
const mongoDB = process.env.MONGODB_URL
// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
}






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
