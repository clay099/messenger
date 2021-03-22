function addToken(res, token) {
	res.cookie("token", token, {
		// lasts for 1 hour
		expires: new Date(Date.now() + 60 * 60 * 100),
		httpOnly: true,
	});
}

module.exports = addToken;
