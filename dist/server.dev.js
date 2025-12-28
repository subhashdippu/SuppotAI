"use strict";

var express = require("express");

var connectDB = require("./config/db");

var _require = require("./config/redis"),
    connectRedis = _require.connectRedis;

require("dotenv").config();

var app = express();
connectDB();
connectRedis();
app.use(express.json());
var PORT = process.env.PORT || 5001;
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
});