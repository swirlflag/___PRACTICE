exports.isLoggedIn = (req, res, next) => {
    const isLogin = req.isAuthenticated(); //passport에서 제공
	if (isLogin) {
		next();
	} else {
		return res.status(401).send("server error: 로그인 상태가 필요합니다.");
	}
};

exports.isNotLoggedIn = (req, res, next) => {
    const isLogin = req.isAuthenticated(); //passport에서 제공
	if (!isLogin) {
		next();
	} else {
		return res.status(401).send("server error: 현재 로그인 되어있습니다.");
	}
};
