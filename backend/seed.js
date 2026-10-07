const mongoose = require("mongoose");
const Vehicle = require("./models/Vehicle");

const vehicles = [
    { name: "Civic", brand: "Honda", price: 150000, year: 2022, image: "https://paultan.org/image/2024/07/2025-Honda-Civic-Si-1-e1721896143360.jpg" },
    { name: "City", brand: "Honda", price: 90000, year: 2023, image: "https://www.automachi.com/wp-content/uploads/2026/05/2026-Honda-City-5-1.jpg" },
    { name: "Accord", brand: "Honda", price: 190000, year: 2024, image: "https://hips.hearstapps.com/hmg-prod/images/2025-toyota-camry-xse-awd-vs-2024-honda-accord-sport-hybrid-102-673b8094b2198.jpg?crop=0.540xw:0.458xh;0.348xw,0.415xh&resize=2048:*" },
    { name: "330i", brand: "BMW", price: 320000, year: 2024, image: "https://images.carexpert.com.au/resize/960/-/cms/v1/media/2023-06-2023-bmw-330i-m-sport-sedan-hero-16x9-1.jpg" },
    { name: "M4", brand: "BMW", price: 780000, year: 2025, image: "https://www.bmw-m.com/content/dam/bmw/marketBMW_M/www_bmw-m_com/all-models/m-automobile/m4coupe/2024/bmw-m4-coupe-posi-disclaimer-ig-02-4x3.jpg" },
    { name: "C300", brand: "Mercedes", price: 350000, year: 2023, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-lBR5PwNXs8QHyAYvay3ZiVTZRJfwikKqbBRBZm92pZmP4aSDGaJmmLY&s=10" },
    { name: "G63", brand: "Mercedes", price: 1800000, year: 2024, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt7VUawxXtUXK3AjPsQcJXRKNok-IbWVIniY-cpmS8P6QSJSVdheErqiE&s=10" },
    { name: "SF90", brand: "Ferrari", price: 2500000, year: 2023, image: "https://hips.hearstapps.com/hmg-prod/images/2023-ferrari-sf90-spider-101-1673279831.jpg?crop=0.670xw:0.668xh;0.250xw,0.304xh&resize=2048:*" },
    { name: "Roma", brand: "Ferrari", price: 1600000, year: 2022, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAlR-9fjeJLYLBb5Q0Mw6rHFQ9P6ZBluOo_uNq_K6oEuiQ8595tlZ2IUQo&s=10" },
    { name: "Defender", brand: "Land Rover", price: 900000, year: 2024, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2M5dNJ6kmwB-QyGMEGtarPaZP_OrvuW3Z_7DQgYa8Cwc0JZ9rO7oi-I2N&s=10" },
    { name: "Copen Gr", brand: "Toyota", price: 120000, year: 2024, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuilfC2pFcT-As80vhhkq7tvaXw8yB4ePIJfj3J33Gk7dcS4Frqz3T1-mu&s=10" },
    { name: "Myvi", brand: "Perodua", price: 50000, year: 2024, image: "https://preview.redd.it/new-myvi-2024-v0-uixj1pjkds2e1.jpeg?auto=webp&s=3e3b3282d349f899067e88fc091f051d598f1b37" },
];

const seed = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/phone");
        console.log("MongoDB connected");

        await Vehicle.deleteMany();
        console.log("Old vehicles deleted");

        await Vehicle.insertMany(vehicles);
        console.log("Vehicles seeded:", vehicles.length);
    } catch (err) {
        console.log("Seed error:", err.message);
    } finally {
        await mongoose.disconnect();
    }
};

seed();
