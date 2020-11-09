const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "react-client/build")))

require("./config/db")(mongoose);
require("./config/passport")(passport);
app.use("/api/user", require("./routes/user"));
app.use("/api/project", require("./routes/project"));

app.get("/", (req, res) => {
  res.send("Projects Ideas");
});

var port = process.env.PORT || 8000;
app.listen(port, function (req, res) {
  console.log(`Server running at ${port}`);
});
