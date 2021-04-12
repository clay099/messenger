const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const db = require("../models/index");
const addToken = require("../helpers/addToken");
const removeToken = require("../helpers/removeToken");
const createToken = require("../helpers/createToken");
const { authenticateJWT } = require("../middleware/auth");
const onlineUsers = require("../onlineUsers");

/** POST / {email:<string>, password: <string>} => {success: {message: <string>, user: {username: <string>, email: <string>}}} */
router.post("/login", async function (req, res, next) {
	try {
		let { email, password } = req.body;
		if (!email || !password) {
			throw new Error(`Please include all fields: email, password`);
		}

		let { token, user } = await db.User.login({ email, password });
		// adds token as cookie
		addToken(res, token);

		return res.json({
			success: {
				message: "logged in",
				user: { username: user.username, email: user.email },
			},
		});
	} catch (error) {
		return next(createError(400, error.message));
	}
});

/** GET / {} => {success: {message: <string>, user: {username: <string>, email: <string>}}}
 * checks token to see if user can be logged in
 */
router.get(
	"/loginwithcookies",
	authenticateJWT,
	async function (req, res, next) {
		try {
			// if user is authenticated with token from HTTP only cookies we can provide them their details
			const user = await db.User.getDetails(req.user.email);

			return res.json({
				success: {
					message: "logged in",
					user: { username: user.username, email: user.email },
				},
			});
		} catch (error) {
			console.error({ error });
			return next(createError(400, error.message));
		}
	}
);

/** POST / {email:<string>, password: <string>, username: <string>} => {success: {message: <string>, user: {username: <string>, email: <string>}}} */
router.post("/register", async function (req, res, next) {
	try {
		let { email, password, username } = req.body;
		// short circuit with error if not all details are provided
		if (!email || !password || !username) {
			throw new Error(
				`Please include all fields: username, email, password`
			);
		}
		// cheap way to check for length. For production app should run some deeper check via the Sequelize validation method. Currently having issues getting validation to work for password length
		if (password.length < 6) {
			throw new Error(`Password is required to be 6 characters long`);
		}

		let user = await db.User.register({
			email,
			password,
			username,
		});
		const token = createToken(user.email);
		// adds token as cookie
		addToken(res, token);

		return res.status(201).json({
			success: {
				message: "New user created",
				user: { username: user.username, email: user.email },
			},
		});
	} catch (error) {
		let errorText;
		if (error.errors) {
			// catches validation errors. As there could be multiple turns the array into a string of all errors
			errorText = error.errors.map((error) => error.message).join(", ");
		} else if (error.parent?.detail) {
			// catches errors from the DB such as duplicate id's
			errorText =
				"Could not create new used due to: " + error.parent.detail;
		} else {
			// gives general message if about does not catch
			errorText = error.message;
		}
		return next(createError(400, errorText));
	}
});

/** POST /  => {message: "logged out"}
 * used to remove HttpOnly cookies
 */
router.get("/logout", async function (req, res, next) {
	try {
		removeToken(res);

		return res.json({
			success: {
				message: "User logged out",
			},
		});
	} catch (error) {
		console.error({ error });
		return next(createError(400, error.message));
	}
});

module.exports = router;
