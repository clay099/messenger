const jwt = require("jsonwebtoken");
const config = require("../helpers/getConfig");
const createError = require("http-errors");

/** Middleware: Authenticate user. */
function authenticateJWT(req, res, next) {
	try {
		// get token from cookies or body
		const token = req.cookies.token;
		const payload = jwt.verify(token, config.JWT_SECRET_KEY); // make sure token wasn't messed with

		// assuming payload is verified you can now grab the user email by "req.user.email" from any route which is authenticated
		req.user = payload;

		if (!req.user.email)
			return next(
				createError(
					400,
					"Email not found in cookies, please login again to update your cookies"
				)
			);

		return next();
	} catch (err) {
		return next(err);
	}
}

/**Middleware: Socket Authentication */
function socketAuth(socket, next) {
	const token = socket.handshake.auth.token;

	if (socket.handshake.auth && token) {
		const payload = jwt.verify(token, config.JWT_SECRET_KEY);

		if (!payload) return next(new Error("Authentication error"));

		socket.user = payload;
		next();
	} else {
		next(new Error("Authentication error"));
	}
}

module.exports = {
	authenticateJWT,
	socketAuth,
};
