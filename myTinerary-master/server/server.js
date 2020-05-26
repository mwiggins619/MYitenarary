const express = require("express");
const cors = require("cors");
const app = express();
const passport = require("passport");

const db = require("./keys").mongoURI;

const port = process.env.PORT || 5000;

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("Connection to Mongo DB established"))
  .catch((err) => console.log(err));

app.use(cors());

app.use(bodyParser.json()); // for parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
); // for parsing application/x-www-form-urlencoded
// Passport middleware
app.use(passport.initialize());
// // Passport config
require("./passport")(passport);
app.use("/api/cities", require("./routes/cities"));
app.use("/api/itineraries", require("./routes/itinerary"));
// app.use("/api/activities", require("./routes/activity"));
app.use("/api/users", require("./routes/users"));
// app.use("/api/users/login", require("./routes/users"));

// app.use("/api/users/register", require("./routes/users"));
// process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});
