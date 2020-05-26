const express = require("express");
const keys = require("../keys");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

/*get all users*/
router.get("/all", (_req, res) => {
  userModel
    .find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => console.log(err));
});

router.post("/register", async (req, res) => {
  // console.log(req.body);

  //Check if this user already exisits
  let user = await userModel.findOne({ email: req.body.email });
  if (user) {
    return res.status(409).send("That user already exisits!");
  } else {
    // Store hash in your password DB.
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      console.log(req);
      // Insert the new user if they do not exist yet
      try {
        const user = new userModel({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          picture: req.body.picture,
        });
        const payload = {
          id: user.id,
          // name: user.name,
          email: user.email,
          // picture: user.picture,
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },

          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
        await user.save();
        console.log("user saved");
        res.send(user);
      } catch (error) {
        console.log("in catch block", error);
        // res.send(error);
      }
    });
  }
});

////////////////////////////////login user
router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  userModel.findOne({ email }).then((user) => {
    // Check if user exists
    console.log("user", user);
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          picture: user.picture,
          favorites: user.favorites,
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },

          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});
///////////authentication forthe user
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userModel
      .findOne({ _id: req.user.id })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => res.status(404).json({ error: "User does not exist!" }));
  }
);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    const user = req.user;
    console.log(req.user);

    ///////////////////////////////generate token
    //Sign token

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      favorites: user.favorites,
    };

    // Sign token

    jwt.sign(
      payload,
      keys.secretOrKey,
      {
        expiresIn: 31556926, // 1 year in seconds
      },

      (err, token) => {
        // Successful authentication, redirect home.with query code
        res.redirect("http://localhost:3000/?code=" + token);
      }
    );
  }
);

///////////////add route for users favoriate//////////
router.get("/logout", (req, res) => {
  userModel.findOne(req.body.email).then((user) => {
    // Check if user exists
    console.log("user", user);
    //  getItem(token);

    props.history.push("/login");
  });
});

///////////Add Favourite(not used now)
// router.post("/:favorites", (req, res) => {
//   console.log(req.params);
//   let id = req.body.id;
//   let favorite = req.params.favorites;
//   userModel.findOne({ _id: id }).then((user) => {
//     console.log("currentUser", user);
//     user.favorites.push(favorite);
//     user.save();
//     res.send(user);
//   });
// });
// ///////////////////get favourite(not used now)
// router.get("/:favorites", (req, res) => {
//   let favorite = req.params.favorites;
//   let id = req.body.id;

//   userModel
//     .findOne({ _id: id, favorites: favorite })
//     .then((favorite) => {
//       res.json(favorite);
//     })
//     .catch((err) => res.status(404).json({ error: "User does not exist!" }));
// });

// ///////////////get one user(not used now)
// router.get("/:id", (req, res) => {
//   let userId = req.params.id;

//   userModel
//     .findOne({ id: userId })
//     .then((user) => {
//       console.log("user", user);
//       res.send(user);
//     })
//     .catch((err) => console.log(err));
// });

// ///////////Add favorites
// router.post("/:name/favorites", (req, res) => {
//   let name = req.params.name;
//   let email = req.body.email;
//   userModel.findOne({ email: email }).then((user) => {
//     user.favorites.push(name);
//     user.save().then((saveduser) => {
//       res.status(200).send(saveduser);
//     });
//   });
// });

// /////////////delete favourite
// router.delete("/:name/favorites", (req, res) => {
//   let name = req.params.name;
//   let email = req.body.email;
//   userModel.findOne({ email: email }).then((user) => {
//     let index = user.favorites.indexOf(name);
//     user.favorites.splice(index, 1);
//     user.save().then((saveduser) => {
//       res.status(200).send(saveduser);
//     });
//   });
// });

// ///////////Add comments
// router.post("/:name/comments", (req, res) => {
//   let name = req.params.name;
//   let comments = req.body.comments;
//   let email = req.body.email;
//   userModel.findOne({ email: email }).then((user) => {
//     user.comments.push(comments, name);
//     user.save().then((saveduser) => {
//       res.status(200).send(saveduser);
//     });
//   });
// });

// router.get("/Account", (req, res) => {
//   res.send("wellcom");
// });

router.get("/test", (req, res) => {
  res.send({ msg: "Users test route." });
});
module.exports = router;
