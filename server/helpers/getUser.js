const db = require("../models/index");

// expected to be passed user from req.user
async function getUser(email) {
	// should not get here due to middleware but this is catch incase the user was not included on token
	if (!email) throw new Error("User could not be found");
	return await db.User.getDetails(email);
}

module.exports = getUser;
