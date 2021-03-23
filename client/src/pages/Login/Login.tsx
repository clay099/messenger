import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Snackbar, { SnackbarCloseReason } from "@material-ui/core/Snackbar";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { FormikHelpers } from "formik";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../styles/useStyles";
import login from "../../helpers/login";
import SideBanner from "../../components/SideBanner/SideBanner";
import LoginForm from "./LoginForm/LoginForm";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import { useAuth } from "../../context/useContext";

export default function Login() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const { updateLoginContext } = useAuth();

	const handleSubmit = (
		{ email, password }: { email: string; password: string },
		{
			setStatus,
			setSubmitting,
		}: FormikHelpers<{ email: string; password: string }>
	) => {
		setStatus();
		login(email, password).then(
			(res) => {
				// clean this up once connected to backend
				console.log({ res });
				updateLoginContext();
			},
			(error) => {
				setSubmitting(false);
				setStatus(error);
			}
		);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const snackbarHandleClose = (
		event: React.SyntheticEvent,
		reason: SnackbarCloseReason
	) => {
		if (reason === "clickaway") return;
		setOpen(false);
	};

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<SideBanner />
			<Grid
				item
				xs={12}
				sm={8}
				md={7}
				elevation={6}
				component={Paper}
				square
			>
				<Box className={classes.authWrapper}>
					<AuthHeader
						linkTo="/signup"
						asideText="Don't have an account?"
						btnText="Create account"
					/>
					<Box width="100%" maxWidth={450} p={3} alignSelf="center">
						<Grid container>
							<Grid item xs>
								<Typography
									className={classes.welcome}
									component="h1"
									variant="h5"
								>
									Welcome back!
								</Typography>
							</Grid>
						</Grid>
						<LoginForm handleSubmit={handleSubmit} />
					</Box>
					<Box p={1} alignSelf="center" />
				</Box>
				<Snackbar
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "center",
					}}
					open={open}
					autoHideDuration={6000}
					onClose={snackbarHandleClose}
					message="Login failed"
					action={
						<React.Fragment>
							<IconButton
								size="small"
								aria-label="close"
								color="inherit"
								onClick={handleClose}
							>
								<CloseIcon fontSize="small" />
							</IconButton>
						</React.Fragment>
					}
				/>
			</Grid>
		</Grid>
	);
}
