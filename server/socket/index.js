const corsOptions = require("../helpers/corsOptions");

const io = require("socket.io")({ cors: corsOptions });

const registerSocketAuth = require("../helpers/socket/auth");
const registerSocketChatRooms = require("../helpers/socket/chatRooms");

//functions with registered event handlers
const onConnection = (socket) => {
	registerSocketAuth(io, socket);
	registerSocketChatRooms(io, socket);
};

const { socketAuth } = require("../middleware/auth");

io.use(socketAuth);
io.on("connection", onConnection);

module.exports = io;
