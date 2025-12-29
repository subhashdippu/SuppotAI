"use strict";

var express = require("express");

var connectDB = require("./configs/db");

var _require = require("./configs/redis"),
    connectRedis = _require.connectRedis;

var chatRoutes = require("./routes/chat");

require("dotenv").config();

var cors = require("cors");

var app = express();
connectDB();
connectRedis(); // app.use(express.json());

app.use(cors());
app.use(express.json());
app.use("/chat", chatRoutes);
var PORT = process.env.PORT || 5001;
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
});