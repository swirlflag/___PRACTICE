const express = require("express");

const router = express.Router();
const db = require("../models/index.js");

const { isLoggedIn } = require("./middlewares.js");


// 게시글 생성
// POST /api/post
router.post("/", isLoggedIn, async (req, res,next) => {
    try {
        const post = await db.Post.create({
			content : req.body.content,
            UserId: req.user.id,
		});

        const responsePost = await db.Post.findOne({
            where: {id: post.id},
            include: [
                { model: db.Image},
                { model: db.Comment},
                { model: db.User},
            ]
        });

        res.status(201).json(responsePost);
    }catch(err) {
        console.log(err);
		next(err); // status 500
    }
});

// 게시글 삭제
// DELETE /api/post/:postId
router.delete("/",isLoggedIn, (req, res) => {
	res.send("DELETE remove post ");
});

// 답글 생성
// POST /api/post/:postId/comment
router.post("/:postId/comment" ,isLoggedIn, async (req, res, next) => {
    try {
        const post = await db.Post.findOne({
            where: { id: req.params.postId },
        });

        if(!post) {
            res.status(403).send('server error: 존재하지 않는 게시글에 대한 요청입니다.');
        }

        const comment = await db.Comment.create({
            content: req.body.content,
            PostId: req.params.postId,
            UserId: req.user.id,
        });

        const responseComment = await db.Comment.findOne({
            where: {id: comment.id},
            include: [
                {
                    model: db.User,
                    attributes: ["id","nickname"],
                }
            ]
        });

        res.status(201).json(responseComment);
    }catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;