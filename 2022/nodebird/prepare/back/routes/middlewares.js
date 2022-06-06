exports.isLoggedIn = (req, res, next) => {
    next();
    return;
    const isLogin = req.isAuthenticated(); //passport에서 제공
	if (isLogin) {
		next();
	} else {
		res.status(401).send("server error: 로그인이 필요합니다.");
	}
};

exports.isNotLoggedIn = (req, res, next) => {
    next();
    return;
    const isLogin = req.isAuthenticated(); //passport에서 제공
	if (!isLogin) {
		next();
	} else {
		res.status(401).send("server error: 로그인 되어있습니다.");
	}
};
