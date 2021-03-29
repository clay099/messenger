import { ChangeEvent, useState } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../styles/useStyles";
import { User } from "../../interface/User";
import AvatarDisplay from "../AvatarDisplay/AvatarDisplay";
import Search from "../Search/Search";
import ChatSummary from "../ChatSummary/ChatSummary";
import useGetChats from "../../hooks/useGetChats";

interface Props {
	loggedInUser: User;
}

const ChatSideBanner = ({ loggedInUser }: Props) => {
	const [search, setSearch] = useState<string>("");
	const chats = useGetChats();
	const classes = useStyles();

	const handleChange = (event: ChangeEvent<{}>, newInputValue: string) => {
		setSearch(newInputValue);
	};

	// filter the chat for searched users
	const displayChat =
		chats &&
		chats.filter((chat) => {
			if (
				chat.userEmail.toLowerCase().includes(search) ||
				chat.user.username.toLowerCase().includes(search)
			)
				return true;
			return false;
		});

	return (
		<Grid item xs={12} sm={4} md={3} className={classes.chatSideBanner}>
			<Box className={classes.userPanel}>
				<AvatarDisplay loggedIn />
				<Typography className={classes.userText} variant="h5">
					{loggedInUser.username}
				</Typography>
			</Box>
			<Box>
				<Typography className={classes.chatTitle} variant="h5">
					Chats
				</Typography>
				<Search search={search} handleChange={handleChange} />
				<Box className={classes.chatSummaryContainer}>
					{!displayChat ? (
						<Typography>Loading...</Typography>
					) : (
						displayChat.map((chat) => (
							<ChatSummary key={chat.chatId} chat={chat} />
						))
					)}
				</Box>
			</Box>
		</Grid>
	);
};

export default ChatSideBanner;
