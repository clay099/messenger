import Avatar from "@material-ui/core/Avatar";
import { AvatarBadge } from "../StyledBadge/StyledBadge";
import { User } from "../../interface/User";

interface Props {
	loggedIn: boolean;
	user: User;
}

const AvatarDisplay = ({ loggedIn, user }: Props) => {
	return (
		<AvatarBadge invisible={!loggedIn}>
			{/* TODO: replace profile image with dynamic files once available from database*/}
			<Avatar
				alt="Profile Image"
				src={`https://robohash.org/${user.email}.png`}
			/>
		</AvatarBadge>
	);
};

export default AvatarDisplay;
