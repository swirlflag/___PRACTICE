const express = require("express");
const { nextTick } = require("process");

const router = express.Router();
const db = require("../models/index.js");

// 게시글들 불러오기
// /api/posts/:id
router.get("/", async (req, res, next) => {
	try {
		const posts = await db.Post.findAll({
			// where: {id: lastId},
			limit: 10,
			order: [
                ["createdAt", "DESC"],
                [db.Comment ,"createdAt", "DESC"],
            ],
			include: [
                // 게시글 작성자
				{
					model: db.User,
					attributes: ["id", "nickname"],
				},
                // 게시글 이미지
				{
					model: db.Image,
				},
                // 게시글 댓글
				{
					model: db.Comment,
                    // 댓글 작성자
					include: {
						model: db.User,
						attributes: ["id", "nickname"],
					},
				},
                // 좋아요 누른 유저
                {
                    model: db.User,
                    as: "Likers",
                    attributes: ["id"],
                },
			],
		});
		// console.log(posts)
		res.status(200).json(posts);
		// res.send('server yet: 게시글들 불러오기 기능 제작중');
	} catch (err) {
		console.error(err);
		next(err);
	}
});

module.exports = router;
