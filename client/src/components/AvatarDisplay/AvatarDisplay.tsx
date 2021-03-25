import Avatar from "@material-ui/core/Avatar";
import useStyles from "../../styles/useStyles";
import testProfileImg from "../../Images/6c4faa7d65bc24221c3d369a8889928158daede4.png";
import StyledBadge from "../StyledBadge/StyledBadge";

interface Props {
	loggedIn: boolean;
}

const AvatarDisplay = ({ loggedIn }: Props) => {
	const classes = useStyles();

	return (
		<div className={classes.avatar}>
			<StyledBadge>
				<Avatar alt="Profile Image" src={testProfileImg} />
			</StyledBadge>
		</div>
	);
};

export default AvatarDisplay;
