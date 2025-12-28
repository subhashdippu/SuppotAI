"use strict";

var express = require("express");

var connectDB = require("./config/db");

require("dotenv").config();

var app = express();
connectDB();
app.use(express.json());
var PORT = process.env.PORT || 5001;
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
});