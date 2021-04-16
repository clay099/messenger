import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
	messageMetaData: {
		color: "#BECCE2",
		fontSize: 11,
		padding: "0.5rem",
		fontWeight: 700,
	},
	messageTyping: {
		padding: "0.3rem 0.7rem",
		fontSize: "14px",
		boxShadow: "0px 2px 20px rgba(88,133,196,0.1)",
		width: "60px",
		maxWidth: "65%",
		fontWeight: 700,
		background: "linear-gradient(225deg, #6CC1FF, #3A8DFF)",
		borderRadius: "0 8px 8px 8px",
		color: "#FFFFFF",
	},
}));

export default useStyles;
