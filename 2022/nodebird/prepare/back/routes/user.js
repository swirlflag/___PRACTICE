const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");
const { Op } = require("sequelize");

const db = require("../models/index.js");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares.js");

// 내 로그인 정보 확인
// GET /api/user
router.get("/", async (req, res, next) => {
    const userId = req.user?.id;

    try {
        if(userId) {
            const responseUser = await db.User.findOne({
				where: { id: userId },
				attributes: {
					exclude: ["password"],
				},
				include: [
					{
                        model: db.Post,
                        attributes: ["id"],
                    },
					{
						model: db.User,
						as: "Followings",
                        attributes: ["id"],
					},
					{
						model: db.User,
						as: "Followers",
                        attributes: ["id"],
					},
				],
			});
            return res.status(200).json(responseUser);
        }else {
            return res.status(200).json(null);
        }
    }catch(err) {
        console.error(err);
        return next(err);
    }
});

// 회원가입
// POST /api/user
router.post("/", isNotLoggedIn ,async (req, res, next) => {
	const { email, nickname, password } = req.body;
	try {
		// db에서 이메일 중복을 체크함
		const exUser = await db.User.findOne({
			where: {
				email,
			},
		});

		// 이메일이 중복으로 있다면?
		if (exUser) {
			return res.status(403).send("server error: 이미 사용중인 아이디 입니다.");
		}

		// 패스워드 보안
		const hasedPassword = await bcrypt.hash(password, 11);

		// // db에 생성!
		await db.User.create({
			email,
			nickname,
			password: hasedPassword,
		});

		// 생성 완료 응답
		return res.status(201).send("server ok: 회원 가입 완료");
	} catch (err) {
		console.log(err);
		return next(err); // status 500
	}
});

// 로그인
// POST /api/user/login
router.post("/login", async (req, res, next) => {
	// 'local'은 passpord 폴더의 local.js와 동기화됨
	passport.authenticate("local", (err, user, info) => {
		// 서버 에러
		if (err) {
			return next(err);
		}

		// 클라이언트 에러
		if (info) {
			// 401 허가되지 않은
			return res.status(401).send(info.reason);
		}

		// req.login? => app.js의 passport.initialize로부터 생성됨
		// 로그인 ㄹ
		return req.login(user, async (loginErr) => {
			if (loginErr) {
				return next(loginErr);
			}

			const responseUser = await db.User.findOne({
				where: { id: user.id },
				attributes: {
					exclude: ["password"],
				},
				include: [
					{
                        model: db.Post,
                        attributes: ["id"],
                    },
					{
						model: db.User,
						as: "Followings",
                        attributes: ["id"],
					},
					{
						model: db.User,
						as: "Followers",
                        attributes: ["id"],
					},
				],
			});

			return res.status(200).json(responseUser);
		});
	})(req, res, next);
});

// 로그아웃
// POST: /api/user/logout
router.post("/logout", isLoggedIn, async (req, res, next) => {
	return req.logout((err) => {
		req.session.destroy();
		if (err) {
			return res.redirect("/");
		} else {
			return res.status(200).send("server ok: 로그아웃 완료");
		}
	});
});

// 닉네임 변경
// PATCH /api/user/nickname
router.patch("/nickname" ,isLoggedIn, async (req, res, next) => {
    const userId = req.user.id;
    try {
        await db.User.update(
            { nickname: req.body.nickname, },
            { where : {id: userId}, },
        );
        const responseUser = await db.User.findOne({
            where: {id: userId},
            attributes: ["nickname"],
        });
        return res.status(201).json(responseUser);
    }catch(err) {
        console.error(err);
        next(err);
    }
});

// 팔로우 기능
// PATCH /api/user/:id/follow
router.patch("/:followId/follow" , isLoggedIn, async (req, res, next) => {
    const userId = req.user.id;
    const followId = parseInt(req.params.followId, 10);
    try {
        const followTarget = await db.User.findOne({
            where : {id: followId},
        });
        if(!followTarget) {
            return res.status(403).send("server error: 팔로우 하려는 유저가 존재하지 않습니다");
        }

        await followTarget.addFollowers(userId);

        return res.status(201).json({followId});
    }catch(err) {
        console.error(err);
        next(err);
    }
});

// 언팔로우 기능
// DELETE /api/user/:id/follow
router.delete("/:followId/follow" , isLoggedIn, async (req, res, next) => {
    const userId = req.user.id;
    const followId = parseInt(req.params.followId,10);

    try{
        const followTarget = await db.User.findOne({
            where : {id: followId},
        });
        if(!followTarget) {
            return res.status(403).send("server error: 언팔로우 하려는 유저가 존재하지 않습니다");
        }
        await followTarget.removeFollowers(userId);
        return res.status(201).json({followId});
    }catch(err) {
        console.error(err);
        next(err);
    }
});

// 팔로우 차단 기능
// DELETE /api/user/follow/:followId
router.delete("/follower/:followId" , isLoggedIn, async (req, res, next) => {
    const userId = req.user.id;
    const followId = parseInt(req.params.followId,10);

    try{
        const follower = await db.User.findOne({
            where : {id: followId},
        });

        await follower.removeFollowings(userId);
        return res.status(201).json({followId});
    }catch(err) {
        console.error(err);
        next(err);
    }
});

// 내가 팔로잉중인 사람 불러오기
// GET /api/user/followings
router.get("/followings" , isLoggedIn, async (req, res, next) => {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit || 3 , 10);

    try{
        const user = await db.User.findOne({
            where : {id: userId},
        });

        const list = await user.getFollowings({
            attributes: ["id","nickname"],
            limit,
        });

        return res.status(201).json({list});
    }catch(err) {
        console.error(err);
        return next(err);
    }
});

// 나를 팔로우한 사람 불러오기
// GET /api/user/followers
router.get("/followers" , isLoggedIn, async (req, res, next) => {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit || 3 , 10);

    try{
        const user = await db.User.findOne({
            where : {id: userId},
        });

        const list = await user.getFollowers({
            attributes: ["id", "nickname"],
            limit,
        });
        return res.status(201).json({list});
    }catch(err) {
        console.error(err);
        return next(err);
    }
});


// 유저 정보 가져오기
// GET /api/user/:userId
router.get("/:userId", async (req, res, next) => {
    const userId = req.params.userId;

    try {
        if(userId) {
            const user = await db.User.findOne({
				where: { id: userId },
				attributes: {
					exclude: ["password"],
				},
				include: [
					{
                        model: db.Post,
                        attributes: ["id", "content"],
                    },
					{
						model: db.User,
						as: "Followings",
                        attributes: ["id" , "nickname"],
					},
					{
						model: db.User,
						as: "Followers",
                        attributes: ["id" , "nickname"],
					},
				],
			});
            return res.status(200).json({user});
        }else {
            return res.status(404).json(null);
        }
    }catch(err) {
        console.error(err);
        return next(err);
    }
});

// router.get("/:userId/posts", async (req, res, next) => {
//     const userId = req.params.userId;
//     const lastId = req.query.lastId;
//     console.log(userId, lastId)

//     try {
//         if(userId) {
//             const user = await db.User.findOne({
// 				where: { id: userId },
// 				include: [
// 					{
//                         model: db.Post,
//                         attributes: ["id", "content",],
//                         include: [
//                             {
//                                 model: db.Comment,
//                             },
//                             {
//                                 model: db.User,
//                                 as: "Likers",
//                                 attributes: ["id"],
//                             },
//                         ]
//                     },
// 				],
// 			});

//             const posts = user.Posts;

//             return res.status(200).json({posts});
//         }else {
//             return res.status(200).json(null);
//         }
//     }catch(err) {
//         console.error(err);
//         return next(err);
//     }
// });

router.get("/:userId/posts", async (req, res, next) => {
    const lastId = req.query.lastId;
    const userId = req.params.userId;
	try {
        const user = await db.User.findOne({
            where: { id: userId }
        });

        if(!user) {
            res.status(200).send("server error: 존재하지 않는 유저입니다.")
        }

        const where = { UserId : userId };
        if(lastId !== "undefined") {
            // lastid보다 작은쪽으로 찾아주는 개념? Op = operator
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

		return res.status(200).json({posts, user});

	} catch (err) {
		console.error(err);
		return next(err);
	}
});

module.exports = router;
