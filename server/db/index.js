//this is the access point for all things database related!

const db = require('./db')
const User = require('./models/User')
const DogPark = require('./models/DogPark')
const Favorite = require('./models/Favorite')

//associations could go here!

//Many-to-Many
User.belongsToMany(DogPark, {
  through: {
    model: Favorite,
  }
});
DogPark.belongsToMany(User, {
  through: {
    model: Favorite,
  }
});

module.exports = {
  db,
  models: {
    User,
    DogPark,
    Favorite
  },
}
