const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: [true, "Please enter a username"], unique: true, trim: true, minLength: [6, "Username must be at least 6 characters"], maxLength: [10, "Username Maximum only 10 characters"] },
    display: { type: String, required: [true, "Please enter a Display Name"], maxLength: [20, "Display name maximum 20 characters"], trim: true },
    password: { type: String, required: [true, "Please enter a password"], minLength: [6, "Password must be at least 6 characters"] },

    balance: {
        type: Number,
        default: 10000000,
        min: 0,
    },
});

module.exports = mongoose.model("User", userSchema);
