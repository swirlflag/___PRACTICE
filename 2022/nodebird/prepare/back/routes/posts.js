const express = require("express");
const { nextTick } = require("process");
const { Op } = require("sequelize");

const router = express.Router();
const db = require("../models/index.js");

// 게시글들 불러오기
// /api/posts
router.get("/", async (req, res, next) => {
    const lastId = req.query.lastId;
	try {
        const where = {};
        if(lastId !== 'undefined') {
            // lastid보다 작은.. 개념? Op = operator 
            where.id = { [Op.lt]: parseInt(lastId) };
        }
		const posts = await db.Post.findAll({
			where,
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

                // 리트윗
                {
                    model: db.Post,
                    as: "Retweet",
                    include: [
                        {
                            model: db.User,
                            attributes: ["id", "nickname"],
                        },
                        {
                            model: db.Image
                        }
                    ]
                },
			],
		});
		res.status(200).json(posts);

	} catch (err) {
		console.error(err);
		next(err);
	}
});

module.exports = router;
