const passport = require("passport");
const local = require("./local.js");
const db = require("../models/index.js");

module.exports = () => {
	passport.serializeUser((user, done) => {
        console.log('serializeUser');
        done(null,user.id);
    });

    // 로그인 이후엔 이부분이 실행
	passport.deserializeUser( async (id, done) => {
        try {
            const user = await db.User.findOne({where: id,})
            //req.user에 등록해 이후 req에서 user로 꺼내쓸수 있음
            done(null, user);
        } catch(error) {
            console.error(error);
            done(error)
        }
    });

	local();
};
