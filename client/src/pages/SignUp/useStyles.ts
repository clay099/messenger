import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: "100vh",
		"& .MuiInput-underline:before": {
			borderBottom: "1.2px solid rgba(0, 0, 0, 0.2)",
		},
	},
	authWrapper: {
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "space-between",
		flexDirection: "column",
		minHeight: "100vh",
		paddingTop: 23,
	},
	welcome: {
		fontSize: 26,
		paddingBottom: 20,
		color: "#000000",
		fontWeight: 700,
		fontFamily: "'Open Sans'",
	},
}));

export default useStyles;

// CHECK IF STILL REQUIRED
// box: {
//   padding: 24,
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   minHeight: "100vh",
//   flexDirection: "column",
//   maxWidth: 900,
//   margin: "auto",
// },
// inlineBadge: { bottom: "auto" },
// drawer: {
//   [theme.breakpoints.up("md")]: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
// },
