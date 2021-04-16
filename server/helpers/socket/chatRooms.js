/**Chatroom event handlers*/
module.exports = (io, socket) => {
	socket.on("join chatRooms", (chatRoomIds) => {
		chatRoomIds.forEach((id) => {
			socket.join(id);
		});
	});
};
