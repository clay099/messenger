import Box from "@material-ui/core/Box";
import useStyles from "./useStyles";

interface Props {
	count: number;
}

const UnreadMessages = ({ count }: Props) => {
	const classes = useStyles();

	return <Box className={classes.UnreadMessages}>{count}</Box>;
};

export default UnreadMessages;
