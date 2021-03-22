const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const db = require("../models/index");
const addToken = require("../helpers/addToken");
const createToken = require("../helpers/createToken");

/** POST / {email:<string>, password: <string>} => {token: <string>} */
router.post("/login", async function (req, res, next) {
	try {
		let { email, password } = req.body;
		if (!email || !password) {
			throw new Error(`Please include all fields: email, password`);
		}

		let user = await db.User.login({ email, password });
		const token = createToken(user.email);

		// adds token as cookie
		addToken(res, token);

		return res.json({ message: "logged in" });
	} catch (error) {
		console.error({ error });
		return next(createError(400, error.message));
	}
});

/** POST / {email:<string>, password: <string>, username: <string>} => {user: {email: <string>, password:<hashedString> username:<string> }} */
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

		let { token } = await db.User.register({
			email,
			password,
			username,
		});

		// adds token as cookie
		addToken(res, token);

		return res.status(201).json({ message: `New user created` });
	} catch (error) {
		console.error({ error });
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
		console.log({ errorText });
		return next(createError(400, errorText));
	}
});

module.exports = router;