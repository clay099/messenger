/**remove token from cookie */
function removeToken(res) {
	res.clearCookie("token");
}

module.exports = removeToken;
