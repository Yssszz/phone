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

        // 按品牌（不分大小写）
        if (req.query.brand) {
            filter.brand = { $regex: req.query.brand, $options: "i" };
        }

        // 按价钱范围
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
        const vehicle = await Vehicle.findById(req.params.id);

        if (!vehicle) {
            return res.status(400).json({ message: "Vehicle not found" });
        }

        // undefined = 有barang !==有东西
        if (req.body.name !== undefined) {
            vehicle.name = req.body.name;
        }
        if (req.body.brand !== undefined) {
            vehicle.brand = req.body.brand;
        }
        if (req.body.price !== undefined) {
            vehicle.price = req.body.price;
        }
        if (req.body.year !== undefined) {
            vehicle.year = req.body.year;
        }

        await vehicle.save();

        res.json(vehicle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete("/:id", auth, admin, async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

        if (!vehicle) {
            res.status(400).json({ message: "Vehicle not found" });
        }

        res.json({ message: "Vehicle Deleted", vehicle: vehicle });
    } catch (err) {
        res.status({ message: err.meesage });
    }
});

module.exports = router;
