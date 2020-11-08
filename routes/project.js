const express = require("express");
const passport = require("passport");
const route = express.Router();
const {
  getProjects,
  addProject,
  likeProject,
  unlikeProject,
  superlikeProject,
  favouriteProject,
} = require("../controllers/project");

route.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  addProject
);
route.post(
  "/like",
  passport.authenticate("jwt", { session: false }),
  likeProject
);

route.post(
  "/unlike",
  passport.authenticate("jwt", { session: false }),
  unlikeProject
);

route.post(
  "/superlike",
  passport.authenticate("jwt", { session: false }),
  superlikeProject
);
route.post(
  "/favourite",
  passport.authenticate("jwt", { session: false }),
  favouriteProject
);

route.get("/get", getProjects);

module.exports = route;
