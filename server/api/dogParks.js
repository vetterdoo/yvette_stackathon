const express = require("express");
const router = express.Router();
const DogPark = require("../db/models/DogPark");
const Favorite = require("../db/models/Favorite");
const User = require("../db/models/User");
const { user } = require("pg/lib/defaults");


const hasToken = async (req, res, next) => {
  const user = await User.findByToken(req.headers.authorization);
  if (user) {
    req.user = user;
    next();
  } else {
    next(new Error("User is not logged in"));
  }
};

router.get("/", async (req, res, next) => {
  try {
    const user = req.user;
    const favorites = await DogPark.findAll(
      {where: {favorite: 1}}
    );
    res.send(dogParks);
  } catch (err) {
    next(err);
  }
});



module.exports = router;
