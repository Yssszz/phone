const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Please enter a properties name"], trim: true },
    location: { type: String, required: [true, "Please enter a location name"], trim: true },
    sqft: { type: Number, required: [true, "Please enter a sqft"], min: [1, "sqft cannot be negative"] },
    price: { type: Number, required: [true, "Please enter a price"], min: [0, "Price cannot be negative"] },
    year: { type: Number, required: [true, "Please enter a year"], min: [1800, "year cannot be less than 1800 years"] },
    image: { type: String, default: "" },
});

module.exports = mongoose.model("Home", homeSchema);
