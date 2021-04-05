import { ChangeEvent, useState } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useStyles from "./useStyles";
import { User } from "../../interface/User";
import AvatarDisplay from "../AvatarDisplay/AvatarDisplay";
import Search from "../Search/Search";
import ChatSummary from "../ChatSummary/ChatSummary";
import { useChat } from "../../context/useChatContext";
import AuthMenu from "../AuthMenu/AuthMenu";

interface Props {
	loggedInUser: User;
	handleDrawerToggle?: () => void;
}

const ChatSideBanner = ({ loggedInUser, handleDrawerToggle }: Props) => {
	const [search, setSearch] = useState<string>("");
	const classes = useStyles();

	const handleChange = (event: ChangeEvent<{}>, newInputValue: string) => {
		setSearch(newInputValue);
	};

	const { userChats } = useChat();

	// filter the chat for searched users
	const displayChat =
		userChats &&
		userChats.filter((chat) => {
			if (
				chat.userEmail.toLowerCase().includes(search) ||
				chat.User.username.toLowerCase().includes(search)
			)
				return true;
			return false;
		});

	return (
		<Grid className={classes.chatSideBanner}>
			<Box className={classes.userPanel}>
				<AvatarDisplay loggedIn />
				<Typography className={classes.userText} variant="h5">
					{loggedInUser.username}
				</Typography>
				<AuthMenu />
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
							<ChatSummary
								key={chat.chatId}
								chat={chat}
								handleDrawerToggle={handleDrawerToggle}
							/>
						))
					)}
				</Box>
			</Box>
		</Grid>
	);
};

export default ChatSideBanner;
