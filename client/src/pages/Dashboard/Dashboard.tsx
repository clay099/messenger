import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import useStyles from "./useStyles";
import { useAuth } from "../../context/useAuthContext";
// import { useHistory } from "react-router-dom";
import ChatSideBanner from "../../components/ChatSideBanner/ChatSideBanner";
import { User } from "../../interface/User";
import Header from "./Header/Header";
import ActiveChat from "../../components/ActiveChat/ActiveChat";
import { ChatProvider } from "../../context/useChatContext";
import SendMessageForm from "./SendMessageForm/SendMessageForm";

export default function Dashboard() {
	const [drawerOpen, setDrawerOpen] = useState(false);

	const handleDrawerToggle = () => {
		setDrawerOpen(!drawerOpen);
	};

	const classes = useStyles();

	const theme = useTheme();
	const drawerSmUp = useMediaQuery(theme.breakpoints.up("sm"));

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
			<CssBaseline />
			<Grid
				container
				component="main"
				className={`${classes.root} ${classes.dashboard}`}
			>
				<Grid item className={classes.drawerWrapper}>
					{drawerSmUp ? (
						<Drawer variant="permanent" open>
							<ChatSideBanner
								loggedInUser={loggedInUser as User}
							/>
						</Drawer>
					) : (
						<Drawer
							variant="temporary"
							anchor="left"
							open={drawerOpen}
							onClose={handleDrawerToggle}
							ModalProps={{
								keepMounted: true, // Better open performance on mobile.
							}}
						>
							<ChatSideBanner
								loggedInUser={loggedInUser as User}
								handleDrawerToggle={handleDrawerToggle}
							/>
						</Drawer>
					)}
				</Grid>
				<Grid item className={classes.activeChat}>
					<Header handleDrawerToggle={handleDrawerToggle} />
					<ActiveChat />
					<SendMessageForm />
				</Grid>
			</Grid>
		</ChatProvider>
	);
}
