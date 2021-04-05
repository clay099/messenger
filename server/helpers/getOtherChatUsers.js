const db = require("../models/index");
const { Op } = require("sequelize");
const getUserChatIds = require("./getUserChatIds");
const Sequelize = require("sequelize");

/**gets the other party of a chat for all chat rooms the user is involved with order by last created
 */
async function getOtherChatUsers(email) {
	// gets an array with the chatId the user is involved with
	const chatRooms = await getUserChatIds(email);

	if (chatRooms.length === 0) return [];

	return await db.UserChat.findAll({
		where: {
			chatId: { [Op.or]: chatRooms },
			userEmail: { [Op.not]: email },
		},
		include: [
			{
				model: db.User,
				attributes: ["username"],
			},
			{
				model: db.Chat,
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
}

module.exports = getOtherChatUsers;
