const express = require("express");
const app = express();

const postRouter = require("./routes/post.js");
// console.log(postRouter)
// 게시글 조회

const { sequelize } = require("./models/index.js");

app.get("/posts", (req, res) => {
	res.json([
        { id: 1, content: "hello1" },
        { id: 2, content: "hello2" },
        { id: 3, content: "hello3" },
    ]);
});

sequelize.sync({ force: false })
    .then((res) => {
        console.log('데이터 베이스 연결 성공!! 야호!');
    })
    .catch((err) => {
        console.log(err)
    })
;

app.get("/", (req, res) => {
	res.send("hello express");
});

app.use('/post', postRouter);

app.listen(3065, () => {
	console.log("서버 실행 !");
});
