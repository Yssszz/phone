require("dotenv").config(); // read .env
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // hash password
const User = require("./models/User");
const Asset = require("./models/Asset");
const Vehicle = require("./models/Vehicle");
const Home = require("./models/Home");
const Luxury = require("./models/Luxury");

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

const home = [
    {
        name: "Modern Luxury Villa",
        location: "Penang Island",
        sqft: 2500,
        price: 1200000,
        year: 2020,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    },
    {
        name: "Cozy Suburban Townhouse",
        location: "Butterworth",
        sqft: 1500,
        price: 450000,
        year: 2015,
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    },
    {
        name: "Seaview Condominium",
        location: "Gurney Drive",
        sqft: 1100,
        price: 780000,
        year: 2022,
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
    },
    {
        name: "Heritage Shophouse",
        location: "George Town",
        sqft: 3200,
        price: 2100000,
        year: 1920,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    },
];

const luxury = [
    { name: "Rolex Submariner", price: 60000, image: "" },
    { name: "Patek Philippe Nautilus", price: 450000, image: "" },
    { name: "Cartier Love Bracelet", price: 25000, image: "" },
    { name: "Hermes Birkin 25", price: 80000, image: "" },
    { name: "Sunseeker 76 Yacht", price: 8000000, image: "" },
    { name: "Gulfstream G700 Jet", price: 80000000, image: "" },
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/phone");
        console.log("MongoDB connected");

        await Vehicle.deleteMany();
        console.log("Old vehicles deleted");

        await Home.deleteMany();
        console.log("Old home deleted");

        await Luxury.deleteMany();
        console.log("Old luxury deleted");

        await Vehicle.insertMany(vehicles);
        console.log("Vehicles seeded:", vehicles.length);

        await Home.insertMany(home);
        console.log("Home seed:", home.length);

        await Luxury.insertMany(luxury);
        console.log("Luxury seed:", luxury.length);

        // ===== 用户：没有才建立(已经注册的用户不会被删) =====
        // 账号 admin01 / user01，密码都是 123456
        const hashedPassword = await bcrypt.hash("123456", 10); // 先加密一次,两个账号共用

        const admin = await User.findOne({ username: "admin01" });
        if (!admin) {
            await User.create({
                username: "admin01",
                display: "Admin",
                password: hashedPassword,
                role: "admin",
            });
        }

        const user = await User.findOne({ username: "user01" });
        if (!user) {
            await User.create({
                username: "user01",
                display: "Demo User",
                password: hashedPassword,
            });
        }
        console.log("User seed:", "2")
    } finally {
        await mongoose.disconnect();
    }
};

seed();
