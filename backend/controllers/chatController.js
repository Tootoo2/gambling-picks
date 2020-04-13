const Message = require("../models/message");

exports.getMessages = function (req, res, next) {
  const sort = { timestamp: -1 };

  Message.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
    .sort(sort)
    .limit(100);
};

exports.postMessage = function (req, res, next) {
  const message = req.body.message;
  if (!message) return res.json({ success: false });

  const newMessage = new Message({
    message: message,
  });

  newMessage.save(function (err) {
    if (err) {
      return next(err);
    }
    res.json({ success: true });
  });
};
