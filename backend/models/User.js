const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: [true, "Please enter a username"], unique: true, trim: true, minLength: [6, "Username must be at least 6 characters"], maxLength: [10, "Username Maximum only 10 characters"] },
    password: { type: String, required: [true, "Please enter a username"], minLength: [6, "Password must be at least 6 characters"] },
});

module.exports = mongoose.model("User", userSchema);
