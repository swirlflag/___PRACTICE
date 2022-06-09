const path = require("path");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();

const app = express();

const postRouter = require("./routes/post.js");
const postsRouter = require("./routes/posts.js");
const userRouter = require("./routes/user.js");

const db = require("./models/index.js");
const passportConfig = require("./passport/index.js");

passportConfig();

db.sequelize.sync({ force: false })
    .then((res) => {
        console.log('데이터 베이스 연결 성공!! 야호!!');
    })
    .catch((err) => {
        console.log(err)
    })
;

app.use(cors({
    // origin: "http://localhost:3000",
    origin: true,
    credentials: true,
}));

// / 로만 접근해도 /uplaods폴더로 접근하는것처럼 ..
app.use("/", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session());
app.use(passport.initialize());
app.use(passport.session({
    saveUninitalized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
}));
app.use(morgan("dev"));

app.get("/", (req, res) => {
	res.send("hello express");
});

app.use('/api/post', postRouter);
app.use('/api/posts', postsRouter);
app.use('/api/user', userRouter);

// error 미들웨어 : next에 변수가 오면 이곳으로이동 (이미 자동으로 있긴함)
// app.use((err, req, res, next) => {});

app.listen(3065, () => {
	console.log("서버 실행 !");
});
