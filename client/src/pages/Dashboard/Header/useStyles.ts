import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	activeChatHeader: {
		display: "flex",
		alignItems: "center",
		background: "#FFFFFF",
		padding: "1rem",
		borderRadius: theme.shape.borderRadius,
		boxShadow: "0px 2px 20px rgba(88,133,196,0.1)",
		[theme.breakpoints.up("sm")]: {
			padding: "2rem",
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up("sm")]: {
			display: "none",
		},
	},
	activeChatUser: {
		fontSize: 20,
		fontWeight: 700,
	},
	activeChatOnline: {
		marginLeft: "2rem",
		color: "#bfc9db",
		fontSize: 12,
		[theme.breakpoints.up("md")]: {
			marginLeft: "2rem",
		},
	},
}));

export default useStyles;
