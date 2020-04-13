const jwt = require("jwt-simple");
const User = require("../models/user");
const config = require("../config");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timestamp }, config.secret);
}

exports.signin = function (req, res) {
  // User already been auth'd by middleware. We just need to give them a token
  res.send({
    token: tokenForUser(req.user),
    user: { _id: req.user._id, username: req.user.username },
  });
};

exports.signup = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  /*await User.find({}, (err) => {
    if (err) {
      return next(err);
    }
    User.countDocuments({}, (err, count) => {
      if (err) {
        return next(err);
      }
      if (count >= 10) {
        return res.status(400).send({ error: "Max amount of users registred" });
      }
    });
	});*/

  User.findOne({ username: username }, (err, existingUser) => {
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

    user.save((err) => {
      if (err) {
        return next(err);
      }
      res.send({
        token: tokenForUser(user),
        user: { _id: user._id, username: user.username },
      });
    });
  });
};

exports.getUser = (req, res) => {
  const decoded = jwt.decode(req.headers.authorization, config.secret);
  User.findById(decoded.sub, (err, user) => {
    if (err) {
      return res.status(400).send({ error: "no user found" });
    }
    if (user) {
      return res.status(200).send({ _id: user._id, username: user.username });
    }
    return res.status(404).send("Not Found");
  });
};
