module.exports = (io) => {
	/** Broadcasts the newly created chat message to other users involved with the chatroom
	 * @param  {object} message
	 */
	function newMessage(message) {
		io.in(message.chatId).emit("new message", {
			message,
		});
	}

	return { newMessage };
};
