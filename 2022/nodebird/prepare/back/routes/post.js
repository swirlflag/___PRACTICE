const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

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
                // 게시글 유저 (작성자)
                {
                    model: db.User,
                    attributes: ["id" ,"nickname"],
                },
                // 게시글 이미지
                {
                    model: db.Image
                },
                // 게시글 댓글
                {
                    model: db.Comment,
                    // 댓글 유저
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
            ]
        });

        return res.status(201).json(responsePost);
    }catch(err) {
        console.error(err);
		return next(err); // status 500
    }
});



try {
    fs.accessSync("uploads");
}catch(err) {
    console.log("uploads 폴더 생성");
    fs.mkdirSync("uploads");
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done){
            done(null, "uploads");
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname); //확장자 추출 (.png, .jpg)
            const name = path.basename(file.originalname,ext); // // 파일 이름
            const date = new Date().getTime();
            const fullname = name + date + ext;
            done(null, fullname);
        },
    }),
    limits: {
        fileSize: 20 * 1024 * 1024, //20mb
    },
});

// 이미지 업로드
// /api/post/image
router.post("/image" , isLoggedIn, upload.array("image"), async (req, res, next) => {

    const files = req.files.map((v) => v.filename);
    res.status(201).json({files});
    // try {

    // }catch(err) {
    //     console.error(err);
    //     next(err);
    // }
});

// 게시글 삭제
// DELETE /api/post/:postId
router.delete("/:postId", isLoggedIn, async(req, res, next) => {
    const { postId } = req.params;
    const { id: userId } = req.user;
    try {
        const post = await db.Post.findOne({
            where: { id: postId },
            include: [
                {
                    model: db.User,
                    attributes: ["id"],
                }
            ],
        });

        if(!post) {
            return res.status(403).send('server error: 존재하지 않는 게시글에 대한 요청입니다.');
        }
        if(post.User.id !== userId) {
            return res.status(403).send('server error: 게시글 삭제에 대한 권한이 없습니다.');
        }

        await db.Post.destroy({
            where: { id: postId },
        });

        return res.status(201).json(post);
    }catch(err) {
        console.error(err);
        return next(err)
    }
});

// 답글 생성
// POST /api/post/:postId/comment
router.post("/:postId/comment" ,isLoggedIn, async (req, res, next) => {
    const { postId } = req.params;

    try {
        const post = await db.Post.findOne({
            where: { id: postId },
        });

        if(!post) {
            res.status(403).send('server error: 존재하지 않는 게시글에 대한 요청입니다.');
        }

        const comment = await db.Comment.create({
            content: req.body.content,
            PostId: postId,
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

        return res.status(201).json(responseComment);
    }catch(err) {
        console.error(err);
        return next(err);
    }
});

// 게시글 좋아요
// POST /api/post/:postId/like
router.patch("/:postId/like" , isLoggedIn, async (req, res, next) => {
    const likerId = req.user.id
    const postId = parseInt(req.params.postId, 10);
    try {
        const post = await db.Post.findOne({
            where: {id: postId, },
        });

        if(!post) {
            return res.status(403).send('server error: 좋아요 하려는 게시글이 존재하지 않습니다')
        }

        await post.addLikers(likerId);

        return res.status(201).json({ postId, likerId });

    }catch(err) {
        console.error(err);
        return next(err);
    }
});

// 게시글 좋아요 취소
// POST /api/post/:postId/unlike
router.delete("/:postId/like" , isLoggedIn, async (req, res, next) => {
    const likerId = req.user.id;
    const postId = parseInt(req.params.postId, 10);
    try {
        const post = await db.Post.findOne({
            where: {id: postId, },
        });

        if(!post) {
            return res.status(403).send('server error: 좋아요 하려는 게시글이 존재하지 않습니다')
        }

        await post.removeLikers(req.user.id);

        return res.status(201).json({ postId, likerId });

    }catch(err) {
        console.error(err);
        return next(err);
    }
});



module.exports = router;