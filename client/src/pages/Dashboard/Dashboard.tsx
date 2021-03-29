import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import useStyles from "../../styles/useStyles";
import { useAuth } from "../../context/useAuthContext";
// import { useHistory } from "react-router-dom";
import ChatSideBanner from "../../components/ChatSideBanner/ChatSideBanner";
import { User } from "../../interface/User";
import Header from "./Header/Header";
import ActiveChat from "../../components/ActiveChat/ActiveChat";
import { ChatProvider } from "../../context/useChatContext";
import SendMessageForm from "./SendMessageForm/SendMessageForm";

export default function Dashboard() {
	const classes = useStyles();

	const { loggedInUser } = useAuth();

	// const history = useHistory();

	if (loggedInUser === undefined) return <p>Loading...</p>;
	// once connected uncomment below.
	// if (!loggedInUser) {
	// 	history.push("/login");
	// }

	// anything below this loggedInUser will be a User
	return (
		<ChatProvider>
			<Grid
				container
				component="main"
				className={`${classes.root} ${classes.dashboard}`}
			>
				<CssBaseline />
				<ChatSideBanner loggedInUser={loggedInUser as User} />
				<Grid item xs={12} sm={8} md={9} className={classes.activeChat}>
					<Header />
					<ActiveChat />
					<SendMessageForm />
				</Grid>
			</Grid>
		</ChatProvider>
	);
}
