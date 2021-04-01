import { makeStyles } from "@material-ui/core/styles";

import bgImg from "../../Images/bg-img.png";

const useStyles = makeStyles((theme) => ({
	image: {
		backgroundImage: `url(${bgImg})`,
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		backgroundPosition: "center",
	},
	overlay: {
		backgroundImage:
			"linear-gradient(180deg, rgb(58,141,255, 0.75) 0%, rgb(134,185,255, 0.75) 100%)",
		backgroundSize: "cover",
		backgroundPosition: "center",
		flexDirection: "column",
		minHeight: "100vh",
		paddingBottom: 145,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	heroText: {
		fontSize: 26,
		fontFamily: "'Open Sans'",
		textAlign: "center",
		color: "white",
		marginTop: 30,
		maxWidth: 300,
	},
}));

export default useStyles;
