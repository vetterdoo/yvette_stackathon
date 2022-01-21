const express = require("express");
const router = express.Router();
const DogPark = require("../db/models/DogPark");

router.get("/", async (req, res, next) => {
  try {
    const dogParks = await DogPark.findAll();
    res.send(dogParks);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
