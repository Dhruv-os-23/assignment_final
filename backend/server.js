require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const fileRoutes = require("./routes/fileRoute");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();
app.use("/api", fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});