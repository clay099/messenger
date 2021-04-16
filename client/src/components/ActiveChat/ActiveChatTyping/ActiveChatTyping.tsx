import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AvatarDisplay from "../../AvatarDisplay/AvatarDisplay";
import useStyles from "./useStyles";
import { UserChat } from "../../../interface/UserChats";
import clsx from "clsx";
import loadingGif from "../../../Images/loading.gif";

interface Props {
	activeChat: UserChat;
}

const ActiveChatTyping = ({ activeChat }: Props) => {
	const classes = useStyles();

	return (
		<Box className={classes.message}>
			<AvatarDisplay loggedIn user={activeChat.user} />
			<Box className={classes.messagesTextContainer}>
				<Typography className={classes.messageMetaData}>
					{activeChat.user.username} <i>now</i>
				</Typography>
				<img
					className={classes.messageTyping}
					src={loadingGif}
					alt="typing dots"
				/>
			</Box>
		</Box>
	);
};

export default ActiveChatTyping;
