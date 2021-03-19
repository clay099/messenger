const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const db = require("../models/index");

router.post("/login", async function (req, res, next) {
	try {
		let { email, password } = req.body;
		// let user = await db.user
		return null;
	} catch (error) {
		return next(createError(400, error));
	}
});

router.post("/register", async function (req, res, next) {
	try {
		let { email, password, username } = req.body;
		// short circuit with error if not all details are provided
		if (!email || !password || !username) {
			return next(
				createError(
					400,
					`Please include all fields: username, email, password`
				)
			);
		}

		let user = await db.User.register({ email, password, username });
		return res.json({ user });
	} catch (error) {
		console.error(error);
		let errorText;
		if (error.errors) {
			// catches validation errors. As there could be multiple turns the array into a string of all errors
			errorText = error.errors.map((error) => error.message).join(", ");
		} else if (error.parent.detail) {
      // catches errors from the DB such as duplicate id's
			errorText =
				"Could not create new used due to: " + error.parent.detail;
		} else {
			// gives general message if about does not catch
			errorText = "An error occurred creating a new user";
		}
		return next(createError(400, errorText));
	}
});

module.exports = router;
