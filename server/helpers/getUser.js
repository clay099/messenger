const db = require("../models/index");

/** returns the User and their details less password */
async function getUser(email) {
	return await db.User.getDetails(email);
}

module.exports = getUser;
