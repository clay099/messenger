import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useTheme } from "@material-ui/core/styles";
import useStyles from "./useStyles";
import { useAuth } from "../../context/useAuthContext";
import { useHistory } from "react-router-dom";
import ChatSideBanner from "../../components/ChatSideBanner/ChatSideBanner";
import { ChatProvider } from "../../context/useChatContext";
import DashboardMain from "./DashboardMain/DashboardMain";

export default function Dashboard() {
	const [drawerOpen, setDrawerOpen] = useState(false);

	const handleDrawerToggle = () => {
		setDrawerOpen(!drawerOpen);
	};

	const classes = useStyles();

	const theme = useTheme();
	const drawerSmUp = useMediaQuery(theme.breakpoints.up("sm"));

	const { loggedInUser } = useAuth();

	const history = useHistory();

	if (loggedInUser === undefined) return <CircularProgress />;
	if (!loggedInUser) {
		history.push("/login");
		// loading for a split seconds until history.push works
		return <CircularProgress />;
	}

	return (
		<ChatProvider>
			<Grid
				container
				component="main"
				className={`${classes.root} ${classes.dashboard}`}
			>
				<CssBaseline />
				<Grid item className={classes.drawerWrapper}>
					{drawerSmUp ? (
						<Drawer variant="permanent" open>
							<ChatSideBanner loggedInUser={loggedInUser} />
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
								loggedInUser={loggedInUser}
								handleDrawerToggle={handleDrawerToggle}
							/>
						</Drawer>
					)}
				</Grid>
				<DashboardMain
					loggedInUser={loggedInUser}
					handleDrawerToggle={handleDrawerToggle}
				/>
			</Grid>
		</ChatProvider>
	);
}
