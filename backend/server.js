const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
    console.log("Port 3000 is running");
});

const vehicles = [
    { id: 1, name: "Civic", brand: "Honda", year: 2022 },
    { id: 2, name: "330I", brand: "Bmw", year: 2024 },
    { id: 3, name: "Laferrari", brand: "Ferrari", year: 2011 },
    { id: 4, name: "Defender", brand: "LandRover", year: 2018 },
    { id: 5, name: "City", brand: "Honda", year: 2026 },
];

app.get("/vehicles", (req, res) => {
    const brand = req.query.brand;

    if (!brand) {
        return res.json(vehicles);
    }

    const result = vehicles.filter((car) => car.brand.toLowerCase() === brand.toLowerCase());
    res.json(result);
});

app.get("/vehicles/:carnum", (req, res) => {
    const lol = Number(req.params.carnum);

    const car = vehicles.find((c) => c.id === lol);

    if (!car) {
        return res.status(404).json("vehicle not found");
    }

    res.json(car);
});

// post
app.post("/vehicles", (req, res) => {
    const newVehicle = {
        id: vehicles.length + 1,
        name: req.body.name,
        brand: req.body.brand,
        year: req.body.year,
    };

    vehicles.push(newVehicle);

    res.status(201).json(newVehicle);
});
