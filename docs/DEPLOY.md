# 部署步骤 (MERN → 云端)

## 1. 数据库 — MongoDB Atlas
1. 到 mongodb.com/atlas 建立免费 cluster
2. Database Access → 建一个用户(记住账号密码)
3. Network Access → Add IP → `0.0.0.0/0`
4. Connect → Drivers → 复制连接字串，格式 `mongodb+srv://用户:密码@xxx.mongodb.net/phone`

## 2. 后端 — Render
1. render.com → New → Web Service → 选这个 GitHub repo
2. Root Directory: `backend`
3. Build Command: `npm install`　Start Command: `npm start`
4. Environment 填：
   - `MONGO_URI` = 上面 Atlas 的连接字串
   - `JWT_SECRET` = 随便一串长的随机字
5. 部署完得到网址，例如 `https://phone-api.onrender.com`
6. 本机跑一次 seed 把资料放进 Atlas：`MONGO_URI` 写进 backend/.env 后执行 `npm run seed`

## 3. 前端 — Vercel
1. vercel.com → Add New Project → 选这个 repo
2. Root Directory: `phone-react`，Framework: Vite
3. Environment Variables：`VITE_API_URL` = 后端网址(不要结尾的 `/`)
4. Deploy

## 测试账号 (seed 之后)
- admin: `admin01` / `123456`
- user: `user01` / `123456`
