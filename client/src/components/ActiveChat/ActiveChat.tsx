import { useLayoutEffect, useRef, useState, UIEvent } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AvatarDisplay from "../AvatarDisplay/AvatarDisplay";
import { useChat } from "../../context/useChatContext";
import { useAuth } from "../../context/useAuthContext";
import { dateToTime } from "../../helpers/dateToTime";
import useStyles from "./useStyles";
import { useDebouncedCallback } from "use-debounce";
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from "clsx";

const ActiveChat = () => {
	const classes = useStyles();
	// scroll position key is chatId, value is scrollTop
	const [savedScrollPosition, setSavedScrollPosition] = useState(
		new Map<number, number>()
	);

	const { loggedInUser } = useAuth();
	const { activeChatMessages, updateChatUnreadCount } = useChat();
	const chatContainerRef = useRef<HTMLDivElement>(null);

	// when you change chats start from bottom otherwise grab where you left off.
	useLayoutEffect(() => {
		if (activeChatMessages && chatContainerRef?.current) {
			chatContainerRef.current.scrollTop =
				savedScrollPosition.get(activeChatMessages[0].chatId) ||
				chatContainerRef.current.scrollHeight;
			if (
				chatContainerRef.current.scrollHeight ===
				chatContainerRef.current.clientHeight
			) {
				// for small chats where the messages fit within the container and don't scroll. When we view the chat we have viewed all messages
				updateChatUnreadCount({
					chatId: activeChatMessages[0].chatId,
					resetRead: true,
				});
			}
		}
	}, [activeChatMessages, savedScrollPosition, updateChatUnreadCount]);

	//  save current scroll position if not near the bottom. If at bottom reset chat read count to 0
	const debounceScroll = useDebouncedCallback(
		(top: number, chatId: number) => {
			if (chatContainerRef.current) {
				// <=3 to allow for 3px rounding
				const bottom =
					Math.abs(
						chatContainerRef.current.scrollHeight -
							top -
							chatContainerRef.current.clientHeight
					) <= 3;

				if (bottom) {
					savedScrollPosition.get(chatId) &&
						setSavedScrollPosition((state) => {
							const updatedState = new Map(state);
							updatedState.delete(chatId);
							return updatedState;
						});
					updateChatUnreadCount({ chatId, resetRead: true });
				} else {
					setSavedScrollPosition((state) => {
						const updatedState = new Map(state);
						updatedState.set(chatId, top);
						return updatedState;
					});
				}
			}
		},
		500
	);

	// when component scrolls saves that scroll position
	const handleScroll = (e: UIEvent<HTMLDivElement>) => {
		const top = e.currentTarget.scrollTop;
		if (activeChatMessages && top) {
			debounceScroll(top, activeChatMessages[0].chatId);
		}
	};

	return (
		<div
			className={classes.activeChatMessages}
			ref={chatContainerRef}
			onScroll={handleScroll}
		>
			{!activeChatMessages ? (
				activeChatMessages === undefined ? (
					<CircularProgress />
				) : (
					<Box className={classes.noActiveChatMessages}>
						<Typography>
							Chat does not contain any messages.
						</Typography>
						<Typography>Please send a message to begin</Typography>
					</Box>
				)
			) : (
				activeChatMessages.map((message) => (
					<Box key={message.id} className={classes.message}>
						{message.senderEmail !== loggedInUser?.email && (
							// once socket.io is connected update loggedIn to be dynamic also need a image to be dynamic
							<AvatarDisplay loggedIn />
						)}
						<Box
							className={clsx(classes.messagesTextContainer, {
								[classes.messageContainerRight]:
									message.senderEmail === loggedInUser?.email,
							})}
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
