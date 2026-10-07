const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Please enter a vehicle name"], trim: true },
    brand: { type: String, required: [true, "Please enter a brand"], trim: true },
    price: { type: Number, required: [true, "Please enter a price"], min: [0, "Price cannot be negative"] },
    year: { type: Number, required: [true, "Please enter a year"] },
    image: { type: String, default: "" },
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
