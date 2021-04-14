const onlineUsers = require("../../onlineUsers");

module.exports = (io) => {
	/**Find all users involved with a chat room who are online and send a private message to them with the chat room details. All online users are then expected to request access to this chat room.
	 *
	 * This is designed to avoid two online users trying to create a room with each other and the second room returning an error
	 * @param  {object} chat
	 * @param  {object} users
	 */
	function newChatRoom(chat, users) {
		users.forEach((user) => {
			// join online users to the chat room. Offline users will join when they login via their API call
			if (onlineUsers[user.email]) {
				io.to(onlineUsers[user.email]).emit("new chat", {
					chat,
					users,
				});
			}
		});
	}

	return { newChatRoom };
};
