const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { user } = require("../models/user");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
opts.secretOrKey = "secret";
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      user
        .findById(jwt_payload._id)
        .then((data) => {
          if (data) {
            return done(null, data);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};
