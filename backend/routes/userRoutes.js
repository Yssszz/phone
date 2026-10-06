const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = await User.create({
            username: req.body.username,
            password: hashedPassword,
            display: req.body.display,
        });

        res.status(201).json({ message: "Register successful", username: newUser.username });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: "Username already taken" });
        }
        res.status(400).json({ message: err.message });
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

        res.json({ message: "Login successful", username: user.username, display: user.display, token: token, balance: user.balance });
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.delete("/me", auth, async (req, res) => {
    try {
        await User.findOneAndDelete(req.userID);
        res.json({ message: "Account Delete" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (req.body.display) {
            user.display = req.body.display;
        }

        if (req.body.password) {
            const isSame = await bcrypt.compare(req.body.password, user.password);

            if (isSame) {
                return res.status(400).json({ message: "New password must be different from the old one" });
            }

            user.password = await bcrypt.hash(req.body.password, 10);
        }

        await user.save();

        res.json({ message: "Profile updated", display: user.display });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
