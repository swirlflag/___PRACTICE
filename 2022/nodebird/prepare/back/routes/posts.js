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
                [db.Comment, 'createdAt', "DESC"],
            ],
			include: [
				{
					model: db.User,
					attributes: ["id", "nickname"],
				},
				{
					model: db.Image,
				},
				{
					model: db.Comment,
					include: {
						model: db.User,
						attributes: ["id", "nickname"],
					},
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
