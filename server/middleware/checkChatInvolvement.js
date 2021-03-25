const db = require("../models/index");
const createError = require("http-errors");

/**Checks that the user is involved with the requested chat */
async function checkChatInvolvement(req, res, next) {
	// if the user is involved will return chat otherwise will return null
	let chatData = await db.UserChat.findOne({
		where: {
			chatId: req.params.chatId,
			userEmail: req.user.email,
		},
	});

	if (!chatData)
		return next(
			createError(400, "User is not involved with requested chat")
		);
	return next();
}

module.exports = checkChatInvolvement;
