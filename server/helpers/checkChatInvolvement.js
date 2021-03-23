const db = require("../models/index");

async function checkChatInvolvement(id, email) {
	// if the user is involved will return chat otherwise will return null
	let chatData = await db.UserChat.findOne({
		where: {
			chatId: id,
			userEmail: email,
		},
	});

	if (!chatData) throw new Error("User is not involved with requested chat");
}

module.exports = checkChatInvolvement;
