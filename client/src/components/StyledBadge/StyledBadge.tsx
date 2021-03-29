import { ReactNode } from "react";
import Badge from "@material-ui/core/Badge";
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";

const StyledBadge = withStyles((theme: Theme) =>
	createStyles({
		badge: {
			backgroundColor: "#1CED84",
			color: "#1CED84",
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
		root: { alignSelf: "flex-start" },
	})
)(Badge);

interface AvatarBadgeProps {
	invisible: boolean;
	children: ReactNode;
}
const AvatarBadge = ({ children, invisible = false }: AvatarBadgeProps) => {
	return (
		<StyledBadge
			overlap="circle"
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			variant="dot"
			invisible={invisible}
			data-testid="avatar-badge-element"
		>
			{children}
		</StyledBadge>
	);
};

const InlineStyledBadge = withStyles((theme: Theme) =>
	createStyles({
		badge: {
			bottom: "auto",
			left: "1rem",
			right: "auto",
		},
		root: { alignSelf: "revert" },
	})
)(StyledBadge);

interface OnlineBadgeProps {
	children: ReactNode;
}
const OnlineBadge = ({ children }: OnlineBadgeProps) => {
	return (
		<InlineStyledBadge
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			variant="dot"
			data-testid="inline-badge-element"
		>
			{children}
		</InlineStyledBadge>
	);
};

export { AvatarBadge, OnlineBadge };
