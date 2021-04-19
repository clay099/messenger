/**Add token to cookie */
function addToken(res, token) {
	res.cookie("token", token, {
		// lasts for 24 hours
		expires: new Date(Date.now() + 24 * 60 * 60 * 100),
		httpOnly: true,
		sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
		secure: process.env.NODE_ENV === "production" ? true : false,
	});
}

module.exports = addToken;
