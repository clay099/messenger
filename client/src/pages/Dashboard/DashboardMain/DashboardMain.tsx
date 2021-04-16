import { useChat } from "../../../context/useChatContext";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Header from "./Header/Header";
import ActiveChat from "../../../components/ActiveChat/ActiveChat";
import SendMessageForm from "./SendMessageForm/SendMessageForm";
import { User } from "../../../interface/User";
import useStyles from "./useStyles";

interface Props {
	loggedInUser: User;
	handleDrawerToggle: () => void;
}
const DashboardMain = ({ loggedInUser, handleDrawerToggle }: Props) => {
	const { activeChat } = useChat();
	const classes = useStyles();

	if (!activeChat) {
		return (
			<Box className={classes.noActiveChatData}>
				{activeChat === null ? (
					<>
						<Typography>
							{loggedInUser.username} does not have any chats to
							display
						</Typography>
						<Typography>
							Please use the search box to find other users to
							talk to
						</Typography>
					</>
				) : (
					<CircularProgress />
				)}
			</Box>
		);
	}

	return (
		<Grid item className={classes.activeChat}>
			<Header handleDrawerToggle={handleDrawerToggle} />
			<ActiveChat />
			<SendMessageForm />
		</Grid>
	);
};

export default DashboardMain;
