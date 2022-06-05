const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const postRouter = require("./routes/post.js");
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
    origin: true,
    // origin: "http://localhost:3000",
    // credentials: false,
}));

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

app.get("/posts", (req, res) => {
	res.json([
        { id: 1, content: "hello1" },
        { id: 2, content: "hello2" },
        { id: 3, content: "hello3" },
    ]);
});

app.get("/", (req, res) => {
	res.send("hello express");
});

app.use('/api/post', postRouter);
app.use('/api/user', userRouter);

app.listen(3065, () => {
	console.log("서버 실행 !");
});
