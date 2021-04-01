import useStyles from "./useStyles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AvatarDisplay from "../AvatarDisplay/AvatarDisplay";
import { UserChat } from "../../interface/UserChats";
import { useChat } from "../../context/useChatContext";

interface Props {
	chat: UserChat;
	handleDrawerToggle?: () => void;
}

const ChatSummary = ({ chat, handleDrawerToggle }: Props) => {
	const classes = useStyles();
	const { selectActiveChat } = useChat();

	const handleClick = () => {
		selectActiveChat(chat);
		if (handleDrawerToggle) {
			handleDrawerToggle();
		}
	};

	const read = chat.readChat === true;

	return (
		<Box className={classes.chatContainer} onClick={handleClick}>
			{/* user needs to add profile image */}
			<AvatarDisplay loggedIn />
			<Box className={classes.chatTextContainer}>
				<Typography className={classes.chatUser} variant="h5">
					{chat.user.username}
				</Typography>
				<Typography
					className={`${classes.lastMessage} ${
						read ? classes.readLastMessage : ""
					}`}
					variant="body1"
				>
					{chat.lastMessage.message}
				</Typography>
			</Box>
		</Box>
	);
};

export default ChatSummary;
