const express = require("express");
const Vehicle = require("../models/Vehicle");
const auth = require("../middleware/auth");
const admin = require("../middleware/adminOnly");

const router = express.Router();

router.post("/", auth, admin, async (req, res) => {
    try {
        const newVehicle = await Vehicle.create(req.body);
        res.status(201).json(newVehicle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const filter = {};

        // if 有人找名字 ?name="x"（不分大小写）
        if (req.query.brand) {
            filter.brand = { $regex: req.query.brand, $options: "i" };
        }

        if (req.query.minPrice || req.query.maxPrice) {
            filter.price = {};

            if (req.query.minPrice) {
                filter.price.$gte = Number(req.query.minPrice);
            }
            if (req.query.maxPrice) {
                filter.price.$lte = Number(req.query.maxPrice);
            }
        }

        const vehicles = await Vehicle.find(filter);
        res.json(vehicles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const vehicles = await Vehicle.findById(req.params.id);

        if (!vehicles) {
            return res.status(400).json({ message: "Vehicle not found" });
        }
        res.json(vehicles);
    } catch (err) {
        res.status(400).json({ message: "Invalid vehicle ID" });
    }
});

router.put("/:id", auth, admin, async (req, res) => {
    try {
        // 找到并更新：{ new: true } 回传改好的；runValidators 让 model 的规则(必填、不能负数)在修改时也会检查
        const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        res.json(vehicle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete("/:id", auth, admin, async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        res.json({ message: "Vehicle Deleted", vehicle: vehicle });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
