'use strict'

const {db, models: {User, DogPark, Favorite} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])

  const dogParks = await Promise.all([
    DogPark.create({ id: '2CLCE65vUePNNiQ3kZF17Q', name: 'Channel Center Dog Park', lat:42.3433904799243, lng: -71.0530727068265, image_url: 'https://www.yelp.com/biz_photos/2CLCE65vUePNNiQ3kZF17Q?select=xFarx8japToDqLQDAh3HCQ', address_1: '', address_2: '' }),
    DogPark.create({ id:'4zBSwkwFXzMomxdXIduXUg', name: 'East First Street Dog Park', lat:42.34006279277675, lng: -71.03091894026134, image_url: 'https://s3-media0.fl.yelpcdn.com/bphoto/5KRKzB_CUs1SA_RG8hNpQQ/o.jpg', address_1: '', address_2: '' }),
  ])

  // const favorites = await Promise.all([
  //   Favorite.create({ dogParkId: '2CLCE65vUePNNiQ3kZF17Q', userId: 1 , favorite: 1}),
  //   Favorite.create({ dogParkId:'4zBSwkwFXzMomxdXIduXUg', userId: 1, favorite: 1}),
  // ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      John: users[0],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
