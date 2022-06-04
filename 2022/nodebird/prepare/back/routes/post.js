const express = require("express");

const router = express.Router();

// 게시글 생성
router.post("/", (req, res) => {
	res.send("POST add post");
});

// 게시글 삭제
router.delete("/", (req, res) => {
	res.send("DELETE remove post ");
});

module.exports = router;