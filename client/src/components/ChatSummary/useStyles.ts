import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	chatContainer: {
		display: "flex",
		alignItems: "center",
		margin: "1rem 0",
		height: "80px",
		padding: "0.5rem",
		background: "#ffffff",
		boxShadow: "0px 2px 10px rgba(88,133,196,0.05)",
		borderRadius: theme.shape.borderRadius,
		"&:hover": { cursor: "pointer" },
	},
	chatTextContainer: { padding: "0 1rem", width: "calc(100% - 4rem)" },
	chatUser: { fontSize: "14px", fontWeight: 600 },
	lastMessage: {
		fontSize: "12px",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
		overflow: "hidden",
		fontWeight: 600,
	},
	readLastMessage: {
		fontWeight: 400,
	},
	noLastMessage: {
		fontStyle: "italic",
	},
	typing: {
		fontStyle: "italic",
	},
}));

export default useStyles;
