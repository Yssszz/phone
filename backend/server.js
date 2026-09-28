const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Larper backend is running!");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

// 暂时的用户名单（第 4 课会换成数据库）
const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "player", password: "player123", role: "user" },
];

// 登录
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    // 1. 检查有没有填
    if (!username || !password) {
        return res.status(400).json({ message: "Please enter username and password" });
    }

    // 2. 在名单里找这个人
    const user = users.find((u) => u.username === username && u.password === password);

    // 3. 找不到 → 回答错误
    if (!user) {
        return res.status(401).json({ message: "Wrong username or password" });
    }

    // 4. 找到了 → 回答他的资料（不包括密码）
    res.json({ username: user.username, role: user.role });
});
