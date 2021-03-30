import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: "100vh",
		"& .MuiInput-underline:before": {
			borderBottom: "1.2px solid rgba(0, 0, 0, 0.2)",
		},
	},
	dashboard: { backgroundColor: "#FFFFFF" },
	drawerWrapper: {
		width: drawerWidth,
		[theme.breakpoints.up("md")]: {
			width: "300px",
		},
	},
	activeChat: {
		display: "flex",
		flexDirection: "column",
		minHeight: "100vh",
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
}));

export default useStyles;
