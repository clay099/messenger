const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

/** Middleware: Authenticate user. */
function authenticateJWT(req, res, next) {
	try {
		// get token from cookies or body
		const token = req.cookies.token || req.body._token;
		const payload = jwt.verify(token, config.JWT_SECRET_KEY); // make sure token wasn't messed with

		// assuming payload is verified you can now grab the user email by "req.user.email" from any route which is authenticated
		req.user = payload;

		return next();
	} catch (err) {
		return next();
	}
}

module.exports = {
	authenticateJWT,
};
