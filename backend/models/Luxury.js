const mongoose = require("mongoose");

const luxurySchema = new mongoose.Schema({
    name: { type: String, required: [true, "Please enter a name"], trim: true },
    price: { type: Number, required: [true, "Please enter a price"], min: [0, "Price cannot be negative"] },
    image: { type: String, default: "" },
});

module.exports = mongoose.model("Luxury", luxurySchema);
