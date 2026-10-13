const express = require("express");
const Asset = require("../models/Asset");
const User = require("../models/User");
const Vehicle = require("../models/Vehicle");
const Home = require("../models/Home");
const Luxury = require("../models/Luxury");
const auth = require("../middleware/auth");

const router = express.Router();

// 买东西：POST /assets/buy，body 只传 { type, id }
// 价钱不让前端传，一定要后端自己去数据库查，不然别人可以改成 RM 0 买
router.post("/buy", auth, async (req, res) => {
    try {
        const { type, id } = req.body; // type = "Car" / "House" / "Luxury"，id = 那件东西的 _id

        let item; // 数据库里找到的东西
        let name; // 要存进资产的名字

        if (type === "Car") {
            item = await Vehicle.findById(id); // 去车的集合找
            if (item) name = item.brand + " " + item.name; // 车名字 = 品牌 + 名字
        } else if (type === "House") {
            item = await Home.findById(id); // 去房子的集合找
            if (item) name = item.name;
        } else if (type === "Luxury") {
            item = await Luxury.findById(id); // 去奢侈品的集合找
            if (item) name = item.name;
        } else {
            return res.status(400).json({ message: "Invalid type" }); // type 不是这三个
        }

        if (!item) {
            return res.status(404).json({ message: "Item not found" }); // 数据库没有这件东西
        }

        const user = await User.findById(req.userId); // 用 token 里的 id 找买家

        if (user.balance < item.price) {
            return res.status(400).json({ message: "Not enough balance" }); // 钱不够，不能买
        }

        user.balance = user.balance - item.price; // 扣钱
        await user.save(); // 存回数据库

        const asset = await Asset.create({
            owner: user._id, // 谁买的
            itemId: id, // 买的是哪一件
            name: name, // 买了什么
            category: type, // 种类，Information 用来分类
            price: item.price, // 买的价钱(记录当时的价钱)
            image: item.image, // 图片
        });

        res.status(201).json({ asset: asset, balance: user.balance }); // 回传新资产 + 剩下的钱，前端要更新 balance
    } catch (err) {
        res.status(400).json({ message: err.message }); // id 格式错等情况
    }
});

// check 买过的东西 只check self
router.get("/", auth, async (req, res) => {
    try {
        const assets = await Asset.find({ owner: req.userId }); // 只找 owner 是自己的
        res.json(assets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
