import { useLayoutEffect, useRef, useState, UIEvent } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AvatarDisplay from "../AvatarDisplay/AvatarDisplay";
import { useChat } from "../../context/useChatContext";
import { useAuth } from "../../context/useAuthContext";
import { dateToTime } from "../../helpers/dateToTime";
import useStyles from "./useStyles";

const ActiveChat = () => {
	const classes = useStyles();
	// scroll position key is chatId, value is scrollTop
	const [savedScrollPosition, setSavedScrollPosition] = useState(
		new Map<number, number>()
	);

	const { loggedInUser } = useAuth();
	const { activeChatMessages } = useChat();
	const chatContainerRef = useRef<HTMLDivElement>(null);

	// when you change chats start from bottom otherwise grab where you left off.
	useLayoutEffect(() => {
		if (activeChatMessages && chatContainerRef?.current) {
			chatContainerRef.current.scrollTop =
				savedScrollPosition.get(activeChatMessages[0].chatId) ||
				chatContainerRef.current.scrollHeight;
		}
	}, [activeChatMessages, savedScrollPosition]);

	// when component scrolls saves that scroll position
	function handleScroll(e: UIEvent<HTMLDivElement>) {
		const top = e.currentTarget.scrollTop;
		if (activeChatMessages && top) {
			setSavedScrollPosition((state) => {
				const updatedState = new Map(state);
				updatedState.set(activeChatMessages[0].chatId, top);
				return updatedState;
			});
		}
	}

	return (
		<div
			className={classes.activeChatMessages}
			ref={chatContainerRef}
			onScroll={handleScroll}
		>
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
