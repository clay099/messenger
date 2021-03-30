import { useEffect, useRef } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AvatarDisplay from "../AvatarDisplay/AvatarDisplay";
import { useChat } from "../../context/useChatContext";
import { useAuth } from "../../context/useAuthContext";
import { dateToTime } from "../../helpers/dateToTime";
import useStyles from "./useStyles";

const ActiveChat = () => {
	const classes = useStyles();

	const { loggedInUser } = useAuth();
	const { activeChatMessages } = useChat();
	const chatContainerRef = useRef<HTMLDivElement>(null);

	// when you change chats always start from bottom
	useEffect(() => {
		if (chatContainerRef?.current && activeChatMessages) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		}
	}, [activeChatMessages]);

	return (
		<div className={classes.activeChatMessages} ref={chatContainerRef}>
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
								{message.user.username}{" "}
								<i>{dateToTime(message.createdAt)}</i>
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
		</div>
	);
};

export default ActiveChat;
