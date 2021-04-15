import useStyles from "./useStyles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AvatarDisplay from "../AvatarDisplay/AvatarDisplay";
import { UserChat } from "../../interface/UserChats";
import { useChat } from "../../context/useChatContext";
import { useSocket } from "../../context/useSocketContext";
import clsx from "clsx";
import UnreadMessages from "../UnReadMessages/UnreadMessages";

interface Props {
	chat: UserChat;
	handleDrawerToggle?: () => void;
}

const ChatSummary = ({ chat, handleDrawerToggle }: Props) => {
	const classes = useStyles();
	const { selectActiveChat } = useChat();
	const { onlineUsers } = useSocket();

	const handleClick = () => {
		selectActiveChat(chat);
		if (handleDrawerToggle) {
			handleDrawerToggle();
		}
	};

	const loggedIn =
		onlineUsers && onlineUsers.has(chat.user.email) ? true : false;

	return (
		<Box className={classes.chatContainer} onClick={handleClick}>
			{/* user needs to add profile image */}
			<AvatarDisplay loggedIn={loggedIn} user={chat.user} />
			<Box className={classes.chatTextContainer}>
				<Typography className={classes.chatUser} variant="h5">
					{chat.user.username}
				</Typography>
				{chat.lastMessage ? (
					<Typography
						className={clsx(classes.lastMessage, {
							[classes.readLastMessage]: chat.unread === 0,
						})}
						variant="body1"
					>
						{chat.lastMessage}
					</Typography>
				) : (
					<Typography
						className={clsx(
							classes.lastMessage,
							classes.noLastMessage,
							{ [classes.readLastMessage]: chat.unread === 0 }
						)}
						variant="body1"
					>
						No Messages
					</Typography>
				)}
			</Box>
			{chat.unread > 0 && <UnreadMessages count={chat.unread} />}
		</Box>
	);
};

export default ChatSummary;
