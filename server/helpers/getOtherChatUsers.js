const db = require("../models/index");
const { Op } = require("sequelize");
const getUserChatIds = require("./getUserChatIds");
const Sequelize = require("sequelize");

/**gets the other party of a chat for all chat rooms the user is involved with order by last created, includes the read status of chat for the logged in user
 */
async function getOtherChatUsers(email) {
	// gets an array with the chatId the user is involved with
	const chatRooms = await getUserChatIds(email);

	const roomIds = Object.keys(chatRooms);
	if (roomIds.length === 0) return [];

	const chatData = await db.UserChat.findAll({
		attributes: ["userEmail", "chatId", "createdAt", "updatedAt"],
		where: {
			chatId: { [Op.or]: roomIds },
			userEmail: { [Op.not]: email },
		},
		include: [
			{
				model: db.User,
				as: "user",
				attributes: ["username"],
			},
			{
				model: db.Chat,
				as: "chat",
				attributes: ["id"],
				include: [
					{
						model: db.Message,
						attributes: ["content"],
						order: [["createdAt", "DESC"]],
						limit: 1,
					},
				],
			},
		],
		order: [["createdAt", "DESC"]],
	});

	return chatData.map((chatDetails) => {
		const copiedData = { ...chatDetails.dataValues };
		const messages = copiedData.chat.Messages;
		if (messages && messages[0]) {
			copiedData.lastMessage = messages[0].content;
		}
		copiedData.unread = chatRooms[chatDetails.chatId];
		delete copiedData.Chat;
		return copiedData;
	});
}

module.exports = getOtherChatUsers;
