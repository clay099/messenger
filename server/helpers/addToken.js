function addToken(res, token) {
	res.cookie("token", token, {
		// lasts for 24 hours
		expires: new Date(Date.now() + 24 * 60 * 60 * 100),
		httpOnly: true,
	});
}

module.exports = addToken;
