const express = require("express");
const passport = require("passport");
const router = express.Router();

//HIBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!!!!!
// const itineraryModel = require("../model/userModel");
// const userModel = require("../model/itineraryModel");

const userModel = require("../model/userModel");
const itineraryModel = require("../model/itineraryModel");

/*get all cities*/
router.get("/all", (_req, res) => {
  itineraryModel
    .find({})
    .then((itineraries) => {
      res.send(itineraries);
    })
    .catch((err) => console.log(err));
});
//this is how you implement a city route by specific city
router.get("/all/:name", (req, res) => {
  let itineraryRequested = req.params.name;
  // name = req.params.name;
  console.log("itineraryRequested", itineraryRequested);
  itineraryModel
    .find({ name: itineraryRequested })
    .then((itinerary) => {
      res.send(itinerary);
    })
    .catch((err) => console.log(err));
});
/////////////post user to the itenerary
router.post("/:id/favorites", (req, res, next) => {
  let email = req.body.email;

  let id = req.params.id;
  console.log("id", id);
  itineraryModel.findOne({ _id: id }).then((itinerary) => {
    itinerary.favorites.push(email);
    itinerary.save().then((saveditinerary) => {
      userModel.findOne({ email: email }).then((user) => {
        user.favorites.push(id);
        user.save();
        res.status(200).send(saveditinerary);
      });
    });
  });
});
///////////////////delete user from favorite itinerary

router.post("/:id/deletefavorites", (req, res, next) => {
  let id = req.params.id;
  let email = req.body.email;
  console.log("email", email);
  itineraryModel.findOne({ _id: id }).then((itinerary) => {
    console.log("itinerary:", itinerary);
    ///////apply js
    let index = itinerary.favorites.indexOf(email);
    itinerary.favorites.splice(index, 1);
    itinerary.save().then((saveditinerary) => {
      // res.status(200).send(saveditinerary);
      userModel.findOne({ email: email }).then((user) => {
        console.log("user:", user);
        let index = user.favorites.indexOf(id);
        console.log("index:", index);
        user.favorites.splice(index, 1);
        user.save();
        res.status(200).send(saveditinerary);
      });
    });
  });
});
router.post("/userfavorites", (req, res) => {
  // const ids = [
  //   "5e9e34cf78914b185c4df850",
  //   "5ea22907eadb6e55b0fcb76b",
  //   "5ea1e5c6eadb6e55b0fcb761",
  // ];
  console.log("ids", req.body.ids);
  // const ids = JSON.parse(req.body.ids);
  const ids = req.body.ids;

  // let arr = ids.map((ele) => new mongoose.Types.ObjectId(ele));

  itineraryModel
    .find()
    .where("_id")
    .in(ids)
    .exec((err, itineraries) => {
      console.log("err", err);
      console.log("object", itineraries);
      res.send(itineraries);
    });
});
/////////////post comment to the itenerary
router.post("/:id/comments", (req, res, next) => {
  const id = req.params.id;
  let comments = { msg: req.body.comments, email: req.body.email };

  itineraryModel.findOne({ _id: id }).then((itinerary) => {
    itinerary.comments.push(comments);
    itinerary.save().then((saveditinerary) => {
      res.status(200).send(saveditinerary);
    });
  });
});

/////////////delete  comment from the itenerary
router.delete("/:id/comments", (req, res, next) => {
  const id = req.params.id;
  let comments = { msg: req.body.comments, email: req.body.email };

  itineraryModel.findOne({ _id: id }).then((itinerary) => {
    let index = itinerary.comments.indexOf(comments);
    itinerary.comments.splice(index, 1);

    itinerary.save().then((saveditinerary) => {
      res.status(200).send(saveditinerary);
    });
  });
});
/////////Add itinerary
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body);
    const {
      name,
      profile,
      hashtags,
      price,
      rating,
      duration,
      activities,
    } = req.body;

    const newItinerary = new itineraryModel({
      name,
      profile,
      hashtags,
      price,
      rating,
      duration,
      activities,
    });
    newItinerary
      .save()
      .then((itinerary) => {
        res.send(itinerary);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Server error");
      });
  }
);

router.get("/test", (req, res) => {
  res.send({ msg: "itinerary test route." });
});
module.exports = router;
