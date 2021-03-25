import { ReactNode } from "react";
import Badge from "@material-ui/core/Badge";
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";

const StyledBadge = withStyles((theme: Theme) =>
	createStyles({
		badge: {
			backgroundColor: "#44b700",
			color: "#44b700",
			boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
			"&::after": {
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				borderRadius: "50%",
				animation: "$ripple 1.2s infinite ease-in-out",
				border: "1px solid currentColor",
				content: '""',
			},
		},
		"@keyframes ripple": {
			"0%": {
				transform: "scale(.2)",
				opacity: 1,
			},
			"100%": {
				transform: "scale(2)",
				opacity: 0,
			},
		},
	})
)(Badge);

interface Props {
	children: ReactNode;
}
const BadgeAvatars = ({ children }: Props) => {
	return (
		<StyledBadge
			overlap="circle"
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "right",
			}}
			variant="dot"
		>
			{children}
		</StyledBadge>
	);
};

export default BadgeAvatars;
