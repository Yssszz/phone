const express = require("express");
const Home = require("../models/Home");
const auth = require("../middleware/auth");
const admin = require("../middleware/adminOnly");

const router = express.Router();

// add new house
router.post("/", auth, admin, async (req, res) => {
    try {
        const newHome = await Home.create(req.body);
        res.status(201).json(newHome);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// check all home and filter
router.get("/", async (req, res) => {
    try {
        const filter = {};

        // if ?name="xx"
        if (req.query.name) {
            filter.name = { $regex: req.query.name, $options: "i" };
        }

        // if ?location=""
        if (req.query.location) {
            filter.location = { $regex: req.query.location, $options: "i" };
        }

        if (req.query.minSqft || req.query.maxSqft) {
            filter.sqft = {};
            if (req.query.minSqft) {
                filter.sqft.$gte = Number(req.query.minSqft);
            }
            if (req.query.maxSqft) {
                filter.sqft.$lte = Number(req.query.maxSqft);
            }
        }

        // price range
        if (req.query.minPrice || req.query.maxPrice) {
            filter.price = {};
            if (req.query.minPrice) {
                filter.price.$gte = Number(req.query.minPrice);
            }
            if (req.query.maxPrice) {
                filter.price.$lte = Number(req.query.maxPrice);
            }
        }

        const homes = await Home.find(filter);
        res.json(homes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// check single one home
router.get("/:id", async (req, res) => {
    try {
        const home = await Home.findById(req.params.id);

        if (!home) {
            return res.status(404).json({ message: "Home not found" });
        }
        res.json(home);
    } catch (err) {
        res.status(400).json({ message: "Invalid Home ID" });
    }
});

// change data
router.put("/:id", auth, admin, async (req, res) => {
    try {
        // 找到并更新：{ new: true } 回传改好的；runValidators 让 model 的规则(必填、不能负数)在修改时也会检查
        const home = await Home.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!home) {
            return res.status(404).json({ message: "Home not found" });
        }

        res.json(home);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// delete home
router.delete("/:id", auth, admin, async (req, res) => {
    try {
        const home = await Home.findByIdAndDelete(req.params.id);

        if (!home) {
            // 改:加了 return,并且状态码改成 404
            return res.status(404).json({ message: "Home not found" });
        }

        res.json({ message: "Home deleted", home: home });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
