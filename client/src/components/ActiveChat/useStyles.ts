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
	message: {
		display: "flex",
		width: "100%",
		margin: "0.5rem 0",
	},
	messagesTextContainer: {
		display: "flex",
		flexDirection: "column",
		margin: "0 1rem",
		width: "100%",
	},
	messageContainerRight: { alignItems: "flex-end" },
	messageMetaData: {
		color: "#BECCE2",
		fontSize: 11,
		padding: "0.5rem",
		fontWeight: 700,
	},
	messageText: {
		padding: "0.7rem",
		fontSize: "14px",
		boxShadow: "0px 2px 20px rgba(88,133,196,0.1)",
		width: "fit-content",
		maxWidth: "65%",
		fontWeight: 700,
	},
	messageLeft: {
		background: "linear-gradient(225deg, #6CC1FF, #3A8DFF)",
		borderRadius: "0 8px 8px 8px",
		color: "#FFFFFF",
	},
	messageRight: {
		backgroundColor: "#F4F6FA",
		borderRadius: "8px 0px 8px 8px",
		color: "#91A3C0",
	},
	noActiveChatMessages: { margin: "auto" },
}));

export default useStyles;
