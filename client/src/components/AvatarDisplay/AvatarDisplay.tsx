import Avatar from "@material-ui/core/Avatar";
import testProfileImg1 from "../../Images/6c4faa7d65bc24221c3d369a8889928158daede4.png";
import testProfileImg2 from "../../Images/8bc2e13b8ab74765fd57f0880f318eed1c3fb001.png";
import testProfileImg3 from "../../Images/8e139d5d8b543709f38bfdad03113d663580f08d.png";
import testProfileImg4 from "../../Images/9e2972c07afac45a8b03f5be3d0a796abe2e566e.png";
import testProfileImg5 from "../../Images/68f55f7799df6c8078a874cfe0a61a5e6e9e1687.png";
import testProfileImg6 from "../../Images/775db5e79c5294846949f1f55059b53317f51e30.png";
import testProfileImg7 from "../../Images/b1f0e680702e811aa8ba333cb19c0e0ea95e8e31.png";
import testProfileImg8 from "../../Images/d9fc84a0d1d545d77e78aaad39c20c11d3355074.png";
import { AvatarBadge } from "../StyledBadge/StyledBadge";

interface Props {
	loggedIn: boolean;
}

const imageOptions = [
	testProfileImg1,
	testProfileImg2,
	testProfileImg3,
	testProfileImg4,
	testProfileImg5,
	testProfileImg6,
	testProfileImg7,
	testProfileImg8,
];

function randomImage() {
	return imageOptions[Math.floor(Math.random() * (imageOptions.length - 1))];
}

const AvatarDisplay = ({ loggedIn }: Props) => {
	return (
		<AvatarBadge invisible={!loggedIn}>
			{/* TODO: replace profile image with dynamic files once available from database*/}
			<Avatar alt="Profile Image" src={randomImage()} />
		</AvatarBadge>
	);
};

export default AvatarDisplay;
