import Typography from "@material-ui/core/Typography";
import useStyles from "./useStyles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { OnlineBadge } from "../../../components/StyledBadge/StyledBadge";
import { useChat } from "../../../context/useChatContext";
import { useAuth } from "../../../context/useAuthContext";
import Grid from "@material-ui/core/Grid";

interface Props {
	handleDrawerToggle: () => void;
}

const Header = ({ handleDrawerToggle }: Props) => {
	const classes = useStyles();
	const { activeChat } = useChat();
	const { onlineUsers } = useAuth();

	// once set up with socket.IO update this to be dynamic
	const onlineStatus =
		onlineUsers && activeChat && onlineUsers.has(activeChat.userEmail)
			? true
			: false;

	return (
		<Grid container spacing={1} className={classes.activeChatHeader}>
			<Grid item>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={handleDrawerToggle}
					className={classes.menuButton}
				>
					<MenuIcon />
				</IconButton>
			</Grid>
			<Grid item>
				<Typography
					className={classes.activeChatUser}
					component="h1"
					variant="h5"
				>
					{activeChat?.user.username}
				</Typography>
			</Grid>
			{onlineStatus && (
				<Grid item>
					<OnlineBadge>
						<Typography className={classes.activeChatOnline}>
							Online
						</Typography>
					</OnlineBadge>
				</Grid>
			)}
		</Grid>
	);
};

export default Header;
