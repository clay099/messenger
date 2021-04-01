import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useStyles from "./useStyles";
import chatBubble from "../../Images/bubble.svg";

const AuthSideBanner = () => {
	const classes = useStyles();

	return (
		<Grid item xs={false} sm={4} md={5} className={classes.image}>
			<Box className={classes.overlay}>
				<Hidden xsDown>
					<img
						width={67}
						src={chatBubble}
						alt="Chat Messenger Bubble"
					/>
					<Hidden smDown>
						<Typography className={classes.heroText} variant="h2">
							Converse with anyone with any language
						</Typography>
					</Hidden>
				</Hidden>
			</Box>
		</Grid>
	);
};

export default AuthSideBanner;
