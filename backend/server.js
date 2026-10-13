require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const houseRoutes = require("./routes/houseRoutes");
const luxuryRoutes = require("./routes/luxuryRoutes");
const assetRoutes = require("./routes/assetRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI || "mongodb://localhost:27017/phone")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB error", err.message));

app.use("/users", userRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/home", houseRoutes);
app.use("/luxury", luxuryRoutes);
app.use("/assets", assetRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Port " + PORT + " is running");
});
