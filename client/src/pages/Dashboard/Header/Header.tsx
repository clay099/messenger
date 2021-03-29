import Typography from "@material-ui/core/Typography";
import useStyles from "../../../styles/useStyles";
import Box from "@material-ui/core/Box";
import { OnlineBadge } from "../../../components/StyledBadge/StyledBadge";
import { useChat } from "../../../context/useChatContext";

const Header = () => {
	const classes = useStyles();
	const { otherUser } = useChat();

	// once set up with socket.IO update this to be dynamic
	const onlineStatus = true;

	return (
		<Box className={classes.activeChatHeader}>
			<Typography
				className={classes.activeChatUser}
				component="h1"
				variant="h5"
			>
				{otherUser?.username}
			</Typography>
			{onlineStatus && (
				<OnlineBadge>
					<Typography className={classes.activeChatOnline}>
						Online
					</Typography>
				</OnlineBadge>
			)}
		</Box>
	);
};

export default Header;
