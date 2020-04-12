const jwt = require("jwt-simple");
const User = require("../models/user");
const config = require("../config");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timestamp }, config.secret);
}

exports.signin = function (req, res, next) {
  // User already been auth'd by middleware. We just need to give them a token
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username }, function (err, existingUser) {
    if (err) {
      return next(err);
    }

    if (!username || !password) {
      return res
        .status(422)
        .send({ error: "You must provide username and password" });
    }

    if (existingUser) {
      return res.status(422).send({ error: "Username in use" });
    }

    const user = new User({
      username: username,
      password: password,
    });

    user.save(function (err) {
      if (err) {
        return next(err);
      }
      res.json({ token: tokenForUser(user) });
    });
  });
};
