const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        itemId: { type: String, default: "" }, // 买的是哪一件(车/房/奢侈品的 _id)
        name: { 
            type: String,
            required: [true, "Please enter an asset name"],
            trim: true,
        },
        category: {
            type: String,
            enum: ["Car", "House", "Luxury", "Other"],
            default: "Other",
        },
        price: {
            type: Number,
            required: [true, "Please enter a price"],
            min: [0, "Price cannot be negative"],
        },
        image: {
            type: String,
            default: "",
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Asset", assetSchema);
