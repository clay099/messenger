import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	activeChatMessages: {
		marginTop: "2rem",
		display: "flex",
		flexDirection: "column",
		overflowY: "auto",
		overflowX: "hidden",
		flexGrow: 1,
	},
	noActiveChatMessages: { margin: "auto" },
}));

export default useStyles;
