import Avatar from "@material-ui/core/Avatar";
import testProfileImg from "../../Images/6c4faa7d65bc24221c3d369a8889928158daede4.png";
import { AvatarBadge } from "../StyledBadge/StyledBadge";

interface Props {
	loggedIn: boolean;
}

const AvatarDisplay = ({ loggedIn }: Props) => {
	return (
		<AvatarBadge invisible={!loggedIn}>
			{/* TODO: replace profile image with dynamic files once connected to DB*/}
			<Avatar alt="Profile Image" src={testProfileImg} />
		</AvatarBadge>
	);
};

export default AvatarDisplay;
