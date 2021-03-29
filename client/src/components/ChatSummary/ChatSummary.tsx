import { useState } from "react";
import useStyles from "../../styles/useStyles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AvatarDisplay from "../AvatarDisplay/AvatarDisplay";
import { UserChat } from "../../interface/UserChats";
import { useChat } from "../../context/useChatContext";

interface Props {
	chat: UserChat;
}

const ChatSummary = ({ chat }: Props) => {
	const [read, setRead] = useState<boolean>(false);
	const classes = useStyles();
	const { selectChatId, saveOtherUser } = useChat();

	const handleClick = () => {
		setRead(true);
		selectChatId(chat.chatId);
		saveOtherUser(chat.user);
	};

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
