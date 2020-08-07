var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { user } = require("../models/user");
const signin = (req, res) => {
  const { email, password } = req.body;
  user.findOne({ email }).then((data) => {
    if (!data)
      return res.status(401).send({ email: "Wrong email or password.." });
    bcrypt.compare(password, data.password).then((isMatch) => {
      if (isMatch) {
        jwt.sign(
          { _id: data._id, name: data.name, email: data.email },
          "secret",
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            if (token) res.send({ token: "JWT " + token });
            res.status(401).send({ message: err });
          }
        );
      } else {
        res.status(401).send({ password: "Incorrect Password" });
      }
    });
  });
};

const signup = (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.json({ error: "all fields are required....." });
  const { name, email, password } = req.body;
  user.findOne({ email }).then((field) => {
    if (field) return res.status(401).send({ email: "user already exists" });
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        const User = new user({
          name,
          email,
          password: hash,
        });
        User.save(function (err, data) {
          if (err) return res.status(401).json({ err });
          res.json({ message: "user registered successfully...." });
        });
      });
    });
  });
};
module.exports = { signin, signup };
