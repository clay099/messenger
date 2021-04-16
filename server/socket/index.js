const corsOptions = require("../helpers/corsOptions");
const cookieParser = require("cookie-parser");

const io = require("socket.io")({ cors: corsOptions });

const registerSocketAuth = require("../helpers/socket/auth");
const registerSocketChatRooms = require("../helpers/socket/chatRooms");
const registerMessages = require("../helpers/socket/messages");

//functions with registered event handlers
const onConnection = (socket) => {
	registerSocketAuth(io, socket);
	registerSocketChatRooms(io, socket);
	registerMessages(io, socket);
};

const wrap = (middleware) => (socket, next) =>
	middleware(socket.request, {}, next);

const { authenticateJWT } = require("../middleware/auth");

io.use(wrap(cookieParser()));
io.use(wrap(authenticateJWT));
io.on("connection", onConnection);

module.exports = io;
