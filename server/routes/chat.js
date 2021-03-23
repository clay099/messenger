const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const db = require("../models/index");
const { authenticateJWT } = require("../middleware/auth");
const { Op } = require("sequelize");

/** GET / {} => {userEmail:<string>, chatId: <integer>, createdAt: <date>, updatedAt:<date>, User: {username: <string>}}[]}
 *
 * gets logged in users associated chats ordered by last created and includes other participant data
 */
router.get("/", authenticateJWT, async function (req, res, next) {
	const email = req.user.email;
	if (!email)
		return next(
			createError(
				400,
				"Email not found in cookies, please login again to update your cookies"
			)
		);

	try {
		// gets an array with the chatId the user is involved with
		const userChat = await db.UserChat.findAll({
			attributes: ["chatId"],
			where: { userEmail: email },
		});

		const chatRooms = userChat.map((chat) => chat.chatId);

		// get other party of chat and order by last created
		let chatData = await db.UserChat.findAll({
			where: {
				chatId: { [Op.or]: chatRooms },
			},
			include: [
				{
					model: db.User,
					attributes: ["username"],
				},
			],
			order: [["createdAt", "DESC"]],
		});

		return res.json(chatData);
	} catch (error) {
		console.error({ error });
		return next(createError(400, error.message));
	}
});

/** POST / {email:string} => {message: "created chat room <integer>"}
 *
 * create new chat between users
 */
router.post("/", authenticateJWT, async function (req, res, next) {
	const userEmail = req.user.email;
	if (!userEmail)
		return next(
			createError(
				400,
				"Email not found in cookies, please login again to update your cookies"
			)
		);
	try {
		// email of other user to connect with
		let { email } = req.body;
		if (!email) {
			throw new Error(`Please include email field`);
		}
		// create chat room
		const chat = await db.Chat.create();
		// log user to chat room
		await db.UserChat.findOrCreate({
			where: { userEmail: userEmail, chatId: chat.id },
		});

		await db.UserChat.findOrCreate({
			where: { userEmail: email, chatId: chat.id },
		});

		return res
			.status(201)
			.json({ message: `created chat room ${chat.id}` });
	} catch (error) {
		console.error({ error });
		return next(createError(400, error.message));
	}
});

module.exports = router;
