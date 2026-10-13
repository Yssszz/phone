const express = require("express");
const Luxury = require("../models/Luxury");
const auth = require("../middleware/auth");
const admin = require("../middleware/adminOnly");

const router = express.Router();

// check all
router.get("/", async (req, res) => {
    res.json(await Luxury.find());
});

// add
router.post("/", auth, admin, async (req, res) => {
    try {
        res.status(201).json(await Luxury.create(req.body));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// change
router.put("/:id", auth, admin, async (req, res) => {
    try {
        const item = await Luxury.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) return res.status(404).json({ message: "Luxury item not found" });
        res.json(item);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// delete
router.delete("/:id", auth, admin, async (req, res) => {
    try {
        const item = await Luxury.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: "Luxury item not found" });
        res.json({ message: "Luxury item deleted" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
