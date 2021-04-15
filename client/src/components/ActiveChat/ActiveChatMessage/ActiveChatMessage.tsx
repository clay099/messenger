import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AvatarDisplay from "../../AvatarDisplay/AvatarDisplay";
import { useAuth } from "../../../context/useAuthContext";
import { useSocket } from "../../../context/useSocketContext";
import { dateToTime } from "../../../helpers/dateToTime";
import useStyles from "./useStyles";
import clsx from "clsx";
import { Message } from "../../../interface/Message";

interface Props {
	message: Message;
}

const ActiveChatMessage = ({ message }: Props) => {
	const classes = useStyles();

	const { loggedInUser } = useAuth();
	const { onlineUsers } = useSocket();

	const loggedIn =
		onlineUsers && onlineUsers.has(message.senderEmail) ? true : false;

	return (
		<Box key={message.id} className={classes.message}>
			{message.senderEmail !== loggedInUser?.email && (
				<AvatarDisplay loggedIn={loggedIn} user={message.user} />
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
	);
};

export default ActiveChatMessage;
