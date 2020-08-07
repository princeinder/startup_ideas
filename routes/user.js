const express = require("express");
const route = express.Router();
const { signin, signup } = require("../controllers/user");

route.post("/signup", signup);
route.post("/signin", signin);

module.exports = route;
