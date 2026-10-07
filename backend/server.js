require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect("mongodb://localhost:27017/phone")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB error", err.message));

app.use("/users", userRoutes);
app.use("/vehicles", vehicleRoutes);

app.listen(3000, () => {
    console.log("Port 3000 is running");
});
