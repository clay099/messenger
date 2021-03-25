const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const db = require("../models/index");
const { authenticateJWT } = require("../middleware/auth");
const getUser = require("../helpers/getUser");

/** GET / {} => {username:<string>, email:<string>}[]}
 *
 * gets other users you can connect with
 *
 * Optional: add a "search" query paramter which will search for a matching username or email
 */
router.get("/", authenticateJWT, async function (req, res, next) {
	try {
		const user = await getUser(req.user.email);
		let otherUsers = await user.getOtherUsers(req.query.search);
		return res.json(otherUsers);
	} catch (error) {
		console.error({ error });
		return next(createError(400, error.message));
	}
});

module.exports = router;
