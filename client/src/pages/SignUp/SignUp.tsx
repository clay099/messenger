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
import useStyles from "./useStyles";
import register from "../../helpers/APICalls/register";
import AuthSideBanner from "../../components/AuthSideBanner/AuthSideBanner";
import SignUpForm from "./SignUpForm/SignUpForm";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import { useAuth } from "../../context/useAuthContext";
import { mockLoggedInUser } from "../../mocks/mockUser";

export interface handleSubmit {}

export default function Register() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const { updateLoginContext } = useAuth();

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

	const handleSubmit = (
		{
			username,
			email,
			password,
		}: { email: string; password: string; username: string },
		{
			setStatus,
			setSubmitting,
		}: FormikHelpers<{ email: string; password: string; username: string }>
	) => {
		setStatus();
		register(username, email, password).then(
			(res) => {
				// clean this up once connected to backend
				console.log({ res });
				// upon connection, get this from backend
				updateLoginContext(mockLoggedInUser);
			},
			(error) => {
				setSubmitting(false);
				setStatus(error);
			}
		);
	};

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<AuthSideBanner />
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
						linkTo="/login"
						asideText="Already have an account?"
						btnText="Login"
					/>
					<Box width="100%" maxWidth={450} p={3} alignSelf="center">
						<Grid container>
							<Grid item xs>
								<Typography
									className={classes.welcome}
									component="h1"
									variant="h5"
								>
									Create an account
								</Typography>
							</Grid>
						</Grid>
						<SignUpForm handleSubmit={handleSubmit} />
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
					message="Email already exists"
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
