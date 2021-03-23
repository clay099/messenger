const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const db = require("../models/index");
const { authenticateJWT } = require("../middleware/auth");
const checkChatInvolvement = require("../helpers/checkChatInvolvement");
const { Op } = require("sequelize");

/** GET / {} => {id: <integer>, content: <string>, senderEmail: <string>, chatId: <integer>, createdAt: <date>, updatedAt:<date>}[]}
 *
 * get all messages from a chat
 */
router.get("/:chatId", authenticateJWT, async function (req, res, next) {
	const chatId = req.params.chatId;
	try {
		await checkChatInvolvement(chatId, req.user.email);

		const chatMessages = await db.Message.findAll({
			where: { chatId },
			order: [["createdAt", "DESC"]],
		});

		return res.json(chatMessages);
	} catch (error) {
		console.error({ error });
		return next(createError(400, error.message));
	}
});

/** POST / {message:string} => {id: <integer>, content: <string>, senderEmail: <string>, chatId: <integer>, createdAt: <date>, updatedAt:<date>}[]}
 *
 * post a message to chat
 */
router.post("/:chatId", authenticateJWT, async function (req, res, next) {
	const chatId = req.params.chatId;
	const { message } = req.body;
	const email = req.user.email;

	try {
		await checkChatInvolvement(chatId, email);

		const createdMessage = await db.Message.create({
			content: message,
			senderEmail: email,
			chatId,
		});

		return res.status(201).json(createdMessage);
	} catch (error) {
		console.error({ error });
		return next(createError(400, error.message));
	}
});

module.exports = router;
