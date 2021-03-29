import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AvatarDisplay from "../AvatarDisplay/AvatarDisplay";
import { useChat } from "../../context/useChatContext";
import { useAuth } from "../../context/useAuthContext";
import { dateToTime } from "../../helpers/dateToTime";
import useStyles from "../../styles/useStyles";

const ActiveChat = () => {
	const classes = useStyles();

	const { loggedInUser } = useAuth();
	const { activeChatMessages } = useChat();

	return (
		<Box className={classes.activeChatMessages}>
			{!activeChatMessages ? (
				<Typography>Loading...</Typography>
			) : (
				activeChatMessages.map((message) => (
					<Box key={message.id} className={classes.message}>
						{message.senderEmail !== loggedInUser?.email && (
							// once socket.io is connected update loggedIn to be dynamic also need a image to be dynamic
							<AvatarDisplay loggedIn />
						)}
						<Box
							className={`${classes.messagesTextContainer} ${
								message.senderEmail === loggedInUser?.email
									? classes.messageContainerRight
									: ""
							}`}
						>
							<Typography className={classes.messageMetaData}>
								{`${message.user.username} ${dateToTime(
									message.createdAt
								)}`}
							</Typography>
							<Typography
								className={`${classes.messageText} ${
									message.senderEmail === loggedInUser?.email
										? classes.messageRight
										: classes.messageLeft
								}`}
							>
								{message.content}
							</Typography>
						</Box>
					</Box>
				))
			)}
		</Box>
	);
};

export default ActiveChat;
