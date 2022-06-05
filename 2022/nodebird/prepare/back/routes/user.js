const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");

const db = require("../models/index.js");

// 회원가입
// /api/user
router.post("/", async (req, res, next) => {
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
			return res.status(403).send("이미 사용중인 아이디 입니다.");
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
		res.status(201).send("ok");
	} catch (error) {
		console.log(error);
		next(error); // status 500
	}
});

// 로그인
// /api/user/login
router.post("/login" , async (req, res, next) => {
    // 'local'은 passpord 폴더의 local.js와 동기화됨

    passport.authenticate('local' , (err, user, info) => {
        // 서버 에러
        if(err) {
            return next(err);
        }

        // 클라이언트 에러
        if(info) {
            // 401 허가되지 않은
            return res.status(401).send(info.reason);
        }

        // req.login? => app.js의 passport.initialize로부터 생성됨
        return req.login(user, async(loginErr) => {
            if(loginErr) {
                return next(loginErr);
            }
            return res.status(200).json(user);
        });

    })(req, res, next);
});

router.post("/logout" , async (req, res, next) => {
    // req.logout();
    // req.session.destroy();
    res.status(200).send('ok');
});

module.exports = router;
