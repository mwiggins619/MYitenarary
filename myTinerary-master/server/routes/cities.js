const express = require("express");

const router = express.Router();
const cityModel = require("../model/cityModel");
const passport = require("passport");
/*get all cities*/
router.get("/all", (_req, res) => {
  cityModel
    .find({})
    .then((cities) => {
      res.send(cities);
    })
    .catch((err) => console.log(err));
});
//this is how you implement a city route by specific city
router.get("/:name", (req, res) => {
  let cityRequested = req.params.name;
  cityModel
    .findOne({ name: cityRequested })
    .then((city) => {
      res.send(city);
    })
    .catch((err) => console.log(err));
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body);
    const newCity = new cityModel({
      name: req.body.name,
      country: req.body.country,
      picture: req.body.picture,
    });
    newCity
      .save()
      .then((city) => {
        res.send(city);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Server error");
      });
  }
);
/////////////
router.get("/test", (req, res) => {
  res.send({ msg: "Cities test route." });
});
module.exports = router;
