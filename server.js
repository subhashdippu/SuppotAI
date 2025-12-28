const express = require("express");
const connectDB = require("./config/db");
const { connectRedis } = require("./config/redis");
require("dotenv").config();

const app = express();

connectDB();
connectRedis();
app.use(express.json());

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
