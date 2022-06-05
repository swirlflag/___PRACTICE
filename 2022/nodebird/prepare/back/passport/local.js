const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const db = require("../models/index.js");

module.exports = () => {
	passport.use(
		new LocalStrategy(
			{
				usernameField: "email",
				passwordField: "password",
			},
			async (email, password, done) => {
                try {
                    const user = await db.User.findOne({
                        where: { email }
                    });

                    if(!user) {
                        return done(null, false, { reason: "존재하지 않는 사용자 입니다." });
                    }

                    const isMatchPassword = await bcrypt.compare(password, user.password);

                    if(!isMatchPassword) {
                        return done(null, false, { reason: "비밀번호가 틀렸습니다" });
                    }

                    return done(null,user);
                }catch(error) {
                    console.error(error);
                    return done(error);
                }
            }
		)
	);
};
