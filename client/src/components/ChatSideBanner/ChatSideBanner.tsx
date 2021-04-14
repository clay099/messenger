import { ChangeEvent, useState } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import useStyles from "./useStyles";
import { User } from "../../interface/User";
import AvatarDisplay from "../AvatarDisplay/AvatarDisplay";
import Search from "../Search/Search";
import ChatSummary from "../ChatSummary/ChatSummary";
import { useChat } from "../../context/useChatContext";
import AuthMenu from "../AuthMenu/AuthMenu";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Props {
	loggedInUser: User;
	handleDrawerToggle?: () => void;
}

const ChatSideBanner = ({ loggedInUser, handleDrawerToggle }: Props) => {
	const [search, setSearch] = useState<string>("");
	const [newChatUser, setNewChatUser] = useState<User | null>(null);
	const classes = useStyles();

	const handleChange = (event: ChangeEvent<{}>, newInputValue: string) => {
		setSearch(newInputValue);
		if (newChatUser) {
			setNewChatUser(null);
		}
	};

	const { userChats, createNewChat } = useChat();

	// filter the chat for searched users
	const displayChat =
		userChats &&
		userChats.filter((chat) => {
			const searchLowerCase = search.toLowerCase();
			return (
				chat.userEmail.toLowerCase().includes(searchLowerCase) ||
				chat.user.username.toLowerCase().includes(searchLowerCase)
			);
		});

	const handleSearchSubmit = (
		event: ChangeEvent<{}>,
		newInputValue: User | null | string
	) => {
		if (newInputValue && typeof newInputValue !== "string") {
			setNewChatUser(newInputValue);
		}
	};

	const handleNewChat = () => {
		if (newChatUser) {
			createNewChat(newChatUser.email);
			setSearch("");
		}
	};

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
				<Search
					search={search}
					handleChange={handleChange}
					handleSubmit={handleSearchSubmit}
				/>
			</Box>
			<Box className={classes.chatSummaryContainer}>
				{!displayChat ? (
					<CircularProgress />
				) : displayChat.length === 0 ? (
					newChatUser ? (
						<Button
							fullWidth
							variant="contained"
							color="primary"
							onClick={handleNewChat}
							className={classes.newChatBtn}
						>
							{`New Chat with ${newChatUser.username}`}
						</Button>
					) : (
						<Box className={classes.noChatToSelectText}>
							<Typography>No Chats Found</Typography>
							<Typography>Search For Other Users</Typography>
						</Box>
					)
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
		</Grid>
	);
};

export default ChatSideBanner;
