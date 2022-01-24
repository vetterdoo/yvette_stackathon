const express = require("express");
const router = express.Router();
const DogPark = require("../db/models/DogPark");
const Favorite = require("../db/models/Favorite");
const User = require("../db/models/User");
const { user } = require("pg/lib/defaults");
const { redirect } = require("express/lib/response");

const hasToken = async (req, res, next) => {
  const user = await User.findByToken(req.headers.authorization);
  if (user) {
    req.user = user;
    next();
  } else {
    next(new Error("User is not logged in"));
  }
};

router.get("/", hasToken, async (req, res, next) => {
  try {
    const user = req.user;
    const dogParks = await DogPark.findAll({
      include: [
        {
          model: Favorite,
          where: { userId: user.id },
        },
      ],
    });
    res.send(dogParks);
  } catch (err) {
    next(err);
  }
});

router.post("/:dogParkId", hasToken, async (req, res, next) => {
  try {
    const user = req.user;
    //console.log(req.body.coordinates)
    const dogPark = await DogPark.findOrCreate({
      where: {
        id: req.params.dogParkId,
        name: req.body.name,
        lat: req.body.coordinates.latitude,
        lng: req.body.coordinates.longitude,
      },
    });
    const favorite = await Favorite.findOrCreate({
      where: {
        userId: user.id,
        dogParkId: req.params.dogParkId,
      },
    });
    res.send(favorite);
  } catch (err) {
    next(err);
  }
});

router.delete("/:dogParkId", hasToken, async (req, res, next) => {
  try {
    const user = req.user;
    const dogPark = await Favorite.findOne({
      where: {
        userId: user.id,
        dogParkId: req.params.dogParkId,
      },
    });
    console.log(dogPark);
    if (dogPark) {
      await dogPark.destroy();
    }
    res.send(dogPark);
  } catch (err) {
    next(err);
  }
});

router.get("/:dogParkId", hasToken, async (req, res, next) => {
  try {
    const user = req.user;
    const favorite = await Favorite.findOne({
      where: {
        userId: user.id,
        dogParkId: req.params.dogParkId,
      },
    });
    res.send(favorite);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
