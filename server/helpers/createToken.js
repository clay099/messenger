const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

/** return signed JWT from user data. */
function createToken(email) {
	let payload = {
		email,
	};

	return jwt.sign(payload, config.JWT_SECRET_KEY);
}

module.exports = createToken;
