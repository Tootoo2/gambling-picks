const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0-rz9ov.mongodb.net/gambling-picks?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("connected to atlas db"))
  .catch((err) => console.log(err));

app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" }));
router(app);

const server = http.createServer(app);

server.listen(process.env.PORT);
console.log("Server listening on: ", process.env.PORT);

