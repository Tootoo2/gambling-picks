const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: String,
  timestamp: { type: Date, default: Date.now },
  //userID: Schema.Types.ObjectId,
});

const messageModel = mongoose.model("message", messageSchema);

module.exports = messageModel;
