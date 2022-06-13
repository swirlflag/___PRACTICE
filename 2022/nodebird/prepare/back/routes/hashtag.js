const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

const db = require("../models/index.js");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares.js");

router.get("/:hashtag", async (req, res, next) => {
    const lastId = req.query.lastId;
    const hashtag = decodeURIComponent(req.params.hashtag);

	try {
        const where = {};
        if(lastId !== "undefined") {
            // lastid보다 작은쪽으로 찾아주는 개념? Op = operator
            where.id = { [Op.lt]: parseInt(lastId,10) };
        }

		const posts = await db.Post.findAll({
			where,
			limit: 10,
			order: [
                ["createdAt", "DESC"],
                [db.Comment ,"createdAt", "DESC"],
            ],
			include: [
                {
                    model: db.Hashtag,
                    where: { name: hashtag },
                },
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

		return res.status(200).json({posts});

	} catch (err) {
		console.error(err);
		return next(err);
	}
});

module.exports = router;
