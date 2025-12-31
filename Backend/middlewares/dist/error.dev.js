"use strict";

function errorHandler(err, req, res, next) {
  console.error("Error:", err);
  var statusCode = err.statusCode || 500;
  var message = err.message || "Something went wrong. Please try again later.";
  res.status(statusCode).json({
    success: false,
    message: message
  });
}

module.exports = errorHandler;