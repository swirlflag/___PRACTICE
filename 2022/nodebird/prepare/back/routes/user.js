const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");

const db = require("../models/index.js");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares.js");

// 로그인 체크
// GET /api/user
router.get("/" , async (req, res, next) => {
    try {
        if(req.user) {
            const responseUser = await db.User.findOne({
				where: { id: req.user.id },
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
router.post("/login", isNotLoggedIn, async (req, res, next) => {
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
            { where : {id: userId}, }
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
    const followId = req.params.followId;
    const userId = req.user.id;
    try {
        const followTarget = await db.User.findOne({
            where : {id: followId},
        });
        if(!followTarget) {
            return res.status(403).send("server error: 팔로우 하려는 유저가 존재하지 않습니다");
        }

        await followTarget.addFollowers(userId);

        return res.status(201).send({UserId: followId});

        res.send('servet yet: 팔로우 기능 제작중');
    }catch(err) {
        console.error(err);
        next(err);
    }
});

// 언팔로우 기능
// DELETE /api/user/:id/follow
router.delete("/:unfollowId/follow" , isLoggedIn, async (req, res, next) => {
    const unfollowId = req.params.unfollowId;
    const userId = req.user.id;

    try{
        const followTarget = await db.User.findOne({
            where : {id: unfollowId},
        });
        if(!followTarget) {
            return res.status(403).send("server error: 언팔로우 하려는 유저가 존재하지 않습니다");
        }
        await followTarget.removeFollowers(userId);
        return res.status(201).send({UserId: unfollowId});
        res.send('servet yet: 언팔로우 기능 제작중');
    }catch(err) {
        console.error(err);
        next(err);
    }
});


module.exports = router;
