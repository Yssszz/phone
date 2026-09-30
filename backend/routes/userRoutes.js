const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = await User.create({
            username: req.body.username,
            password: hashedPassword,
        });

        res.status(201).json({ message: "Register successful", username: newUser.username });
    } catch (err) {
        res.status(400).json(err.message);
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const ismatch = await bcrypt.compare(req.body.password, user.password);

        if (!ismatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ message: "Login successful", username: user.username, token: token });
    } catch (err) {
        res.status(500).json(err.message);
    }
});

module.exports = router;
