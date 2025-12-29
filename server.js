const express = require("express");
const connectDB = require("./configs/db");
const { connectRedis } = require("./configs/redis");
const chatRoutes = require("./routes/chat");
require("dotenv").config();
const cors = require("cors");
const app = express();

connectDB();
connectRedis();
// app.use(express.json());
app.use(cors());
app.use(express.json());
app.use("/chat", chatRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
