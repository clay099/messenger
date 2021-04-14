import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	activeChat: {
		display: "flex",
		flexDirection: "column",
		height: "100vh",
		padding: "0 1rem",
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: `calc(100% - ${drawerWidth}px)`,
		},
		[theme.breakpoints.up("md")]: {
			width: `calc(100% - 300px)`,
			padding: "0 2rem",
		},
	},
	noActiveChatData: { margin: "auto" },
}));

export default useStyles;
