import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	UnreadMessages: {
		color: "white",
		backgroundColor: "#3f92ff",
		borderRadius: "10px",
		padding: "0.1rem 0.4rem",
		textAlign: "center",
		fontWeight: 700,
		minHeight: "20px",
	},
}));

export default useStyles;
