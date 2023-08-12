var express = require('express');
var router = express.Router();
const app = require('../app');
const dbConnection = require('../database/dbConnection')
const FriendModel = require('../models/FriendModel')



async function addFriendToCollection(){
  const popularNames = ['James', 'Robert', 'John', 'Michael', 'David', 'William', 'Richard', 'Joseph', 'Thomas', 'Christopher', 'Charles', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Andrew', 'Paul', 'Joshua', 'Kenneth', 'Kevin', 'Brian', 'George', 'Timothy', 'Ronald', 'Jason', 'Edward', 'Jeffrey', 'Ryan', 'Jacob', 'Gary', 'Nicholas', 'Eric', 'Jonathan', 'Stephen', 'Larry', 'Justin', 'Scott', 'Brandon', 'Benjamin', 'Samuel', 'Gregory', 'Alexander', 'Patrick', 'Frank', 'Raymond', 'Jack', 'Dennis', 'Jerry', 'Tyler', 'Aaron', 'Jose', 'Adam', 'Nathan', 'Henry', 'Zachary', 'Douglas', 'Peter', 'Kyle', 'Noah', 'Ethan', 'Jeremy', 'Walter', 'Christian', 'Keith', 'Roger', 'Terry', 'Austin', 'Sean', 'Gerald', 'Carl', 'Harold', 'Dylan', 'Arthur', 'Lawrence', 'Jordan', 'Jesse', 'Bryan', 'Billy', 'Bruce', 'Gabriel', 'Joe', 'Logan', 'Alan', 'Juan', 'Albert', 'Willie', 'Elijah', 'Wayne', 'Randy', 'Vincent', 'Mason', 'Roy', 'Ralph', 'Bobby', 'Russell', 'Bradley', 'Philip', 'Eugene']

  const popularCities = ['Tokyo', 'London', 'New York', 'Paris', 'Singapore', 'Los Angeles', 'Boston', 'Seoul', 'San Francisco - San Jose', 'Houston', 'Berlin', 'Chicago', 'Stockholm', 'Dubai', 'Toronto', 'Munich', 'Vienna', 'Sydney', 'Madrid', 'Amsterdam', 'Seattle', 'Dallas-Fort Worth', 'Melbourne', 'Montréal', 'Atlanta', 'Barcelona', 'Milan', 'Beijing', 'Vancouver', 'Copenhagen', 'Miami', 'Washington DC', 'Philadelphia', 'Oslo', 'Osaka', 'Dublin', 'San Diego', 'Brisbane', 'Helsinki', 'Tel Aviv', 'Hamburg', 'Denver', 'Portland', 'Austin', 'Las Vegas', 'Shanghai', 'Detroit', 'Rome', 'Brussels', 'Newark', 'Baltimore', 'Taipei', 'Istanbul', 'Zürich', 'Phoenix', 'Oakland', 'Orlando', 'Hong Kong', 'Prague', 'Lisbon', 'Mexico City', 'Buenos Aires', 'Perth', 'Kyoto', 'Basel', 'Athens', 'Sacramento', 'Frankfurt', 'Tampa', 'Minneapolis-St Paul', 'Pittsburgh', 'San Antonio', 'Riverside', 'Shenzhen', 'Abu Dhabi', 'Moscow', 'Auckland', 'Budapest', 'Oporto', 'São Paulo', 'Nagoya', 'Düsseldorf', 'Yokohama', 'Québec', 'Stuttgart', 'Manchester', 'Rotterdam', 'Lyon', 'Warsaw', 'Charlotte', 'Nashville', 'Cleveland', 'Gothenburg', 'Santa Ana-Anaheim', 'Cincinnati', 'Kansas City', 'Cologne', 'Geneva']

  popularNames.forEach(name => {
    const newFriend = new FriendModel({ 
      name: name, 
      birthday: new Date(),
      alive: (Math.random() < 0.5),
      city: popularCities[Math.floor(Math.random() * popularCities.length) + 1]
    });
    newFriend
    .save()
    .then(
      () => console.log(`${name} was added to your friend collection. `),
      (err) => console.log(err)
    )
  })
}

function deleteDatabase(){
  FriendModel.deleteMany({}).then(function(){
    console.log("All the documents deleted"); // Success
 }).catch(function(error){
    console.log(error); // Failure
 });
}


dbConnection()


router.get('/', async (req, res) => {
  try{
    const friendsFromDB = await FriendModel
      .find({ city: "London"})      
    res.send(friendsFromDB)
  } catch(err){
    console.log(err)
  }
});

module.exports = router;
