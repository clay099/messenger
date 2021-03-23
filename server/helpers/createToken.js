const jwt = require("jsonwebtoken");
const config = require("../helpers/getConfig");

/** return signed JWT from user data. */
function createToken(email) {
	console.log("test", { email });
	let payload = {
		email,
	};

	return jwt.sign(payload, config.JWT_SECRET_KEY);
}

module.exports = createToken;
